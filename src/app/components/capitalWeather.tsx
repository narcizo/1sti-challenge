import { useEffect, useState, useMemo } from 'react';

import {
    Card,
    Row,
    Col,
    Typography,
    Skeleton,
    Descriptions,
    Button,
    message,
} from 'antd';

const { Title } = Typography;

import WeatherApi from '../services/weatherApi';
import { IWheatherModel } from '../models/weatherModel';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

type CapitalWeatherProps = {
    isImperial: boolean;
};

const weatherApi = new WeatherApi();

export default function CapitalWeather({
    isImperial,
}: CapitalWeatherProps) {
    const [weatherData, setWeatherData] = useState<IWheatherModel[]>(Array(0));
    const [reload, setReload] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchData = useMemo(
        () => async () => {
            const capitals: string[] = [
                'Maringá',
                'São Paulo',
                'Rio de Janeiro',
                'Nagasaki',
                'Florianópolis',
                'Tokio',
                'Londres',
                'Los Angeles',
            ];

            try {
                const promises = capitals.map((capital: string) => {
                    return weatherApi.getWeather(capital);
                });

                const data = await Promise.all(promises);
                setWeatherData(data);
            } catch (err: any) {
                console.error('Error fetching Data: ', err);
                if (err?.code == 'ERR_NETWORK') {
                    messageApi.open({
                        type: 'error',
                        content: 'Sem conexão',
                    });
                }
            } finally {
                setReload(false);
            }
        },
        [reload],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    let emptyWeather = null;
    if (weatherData.length === 0 || reload) {
        emptyWeather = (
            <>
                <Col sm={6} md={12}>
                    <Card className="m-3 bg-transparent border-amber-700">
                        <Skeleton active />
                    </Card>
                </Col>
            </>
        );
    }
    const capitalsJsx = weatherData.map((weather: IWheatherModel) => {
        if (!weather) return <></>;
        return (
            <Col className="p-2" key={weather.location.lat} xs={24} sm={12} md={8} lg={8} xxl={6}>
                <Card
                    hoverable
                    className={`m-1 bg-transparent border-amber-700 hover:${weather?.is_day ? 'bg-day-200' : 'bg-night-100'}`}
                >
                    <div className="flex justify-between">
                        <Title className="pt-3" level={4}>
                            {weather?.location.name}
                        </Title>
                        {weather?.is_day ? (
                            <SunOutlined className="pl-2" />
                        ) : (
                            <MoonOutlined className="pl-2" />
                        )}
                    </div>
                    {isImperial ? (
                        <Title level={5}>{weather?.temp_f}ºF</Title>
                    ) : (
                        <Title level={5}>{weather?.temp_c}ºC</Title>
                    )}

                    <Descriptions>
                        {isImperial ? (
                            <Descriptions.Item label="Sensação">
                                {weather?.feelslike_f}ºF
                            </Descriptions.Item>
                        ) : (
                            <Descriptions.Item label="Sensação">
                                {weather?.feelslike_c}ºC
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    <Descriptions>
                        <Descriptions.Item label="Umidade">
                            {weather?.humidity}%
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </Col>
        );
    });

    return (
        <>
            {contextHolder}
            <div data-testid='capitalsComponent' className="group flex justify-between items-center">
                <Title level={2} className="pl-3 m-0 text-slate-50">
                    Capitais
                </Title>
                <Button
                    loading={reload}
                    onClick={() => setReload(true)}
                    className="bg-background-5 border-none rounded-full text-lg	text-white mr-3 mb-3 pb-8 group-3hover:bg-black"
                >
                    Recarregar
                </Button>
            </div>
            <Row>
                {emptyWeather || capitalsJsx}
            </Row>
        </>
    );
}
