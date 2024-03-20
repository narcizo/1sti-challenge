import { useState, useEffect, use } from 'react';
import { IWheatherModel } from '../models/weatherModel';
import {
    Skeleton,
    Card,
    Typography,
    Row,
    Col,
    Descriptions,
    message,
    Button,
    Tooltip,
} from 'antd';
import Image from 'next/image';

import WeatherApi from '../services/weatherApi';
import { MailOutlined } from '@ant-design/icons';
import { set } from 'lodash';

type WeatherDetailProps = {
    city: string;
    loading: boolean;
    onFinishLoading: (b: boolean) => void;
    isImperial: boolean;
};

const { Title } = Typography;

export default function WeatherDetail({
    city,
    loading,
    onFinishLoading,
    isImperial,
}: WeatherDetailProps) {
    const [weather, setWeather] = useState<IWheatherModel>();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (city.length < 3) return;

        fetchData();
    }, [city]);

    if (city.length < 3) return <></>;

    async function fetchData() {
        if (city.length <= 3) return;

        const weatherApi = new WeatherApi();
        try {
            const weatherResponse = await weatherApi.getWeather(city);
            setWeather(weatherResponse);
        } catch (err: any) {
            if (err.response?.status === 400) {
                messageApi.open({
                    type: 'error',
                    content: 'Cidade não encontrada',
                }); 
            }
            if (err?.code == 'ERR_NETWORK') {
                messageApi.open({
                    type: 'error',
                    content: 'Sem conexão',
                });
            }
        } finally {
            onFinishLoading(false);
        }
    }


    return (
        <div data-testid='weatherDetailComponent' className="py-4">
            {contextHolder}
            {loading && 
                <Card 
                bordered={false}
                className="bg-day-200">
                    
                    <Skeleton active />
                </Card>
            }
            {loading || (
                <Card
                    hoverable
                    bordered={false}
                    className={`${weather?.is_day ? 'bg-day-50' : 'bg-night-100'}`}
                >
                    <div className="flex justify-between sm:justify-start">
                        <Title className="pt-3" level={2}>
                            {weather?.location.name ?? 'Cidade não encontrada'}
                        </Title>
                        <Image
                            className="justify-end"
                            src={weather?.condition.icon ?? '/public/no_data.png'}
                            alt={weather?.condition.text ?? 'current weather icon'}
                            width={70}
                            height={70}
                        />
                    </div>
                    <Row>
                        <Col span={16}>
                            <Title level={3}>
                                {isImperial ? weather?.temp_f : weather?.temp_c}º{isImperial ? 'F' : 'C'}
                            </Title>
                            <Title level={5}>
                                Sensação: {isImperial ? weather?.feelslike_f : weather?.feelslike_c}º{isImperial ? 'F' : 'C'}
                            </Title>
                        </Col>
                        <Col span={16}>
                            <Descriptions>
                                <Descriptions.Item label="País">
                                    {weather?.location.country}
                                </Descriptions.Item>
                                <Descriptions.Item label="Região">
                                    {weather?.location.region}
                                </Descriptions.Item>
                                <Descriptions.Item label="Umidade">
                                    {weather?.humidity}%
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={8} className="flex justify-end items-end">
                            <Tooltip title="Mandar por Email">
                                <Button
                                    shape="circle"
                                    size="large"
                                    icon={<MailOutlined />}
                                    className={`${weather?.is_day ? 'bg-day-100' : 'bg-night-200'} border-none hover:shadow-xl`}
                                ></Button>
                            </Tooltip>
                        </Col>
                    </Row>
                </Card>
            )}
        </div>
    );
}
