import { useState, useEffect } from 'react';
import { WheatherModel } from '../models/weatherModel';
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

const { Title } = Typography;

export default function WeatherDetail({
    city,
    loading,
    onFinishLoading,
    isImperial,
}: {
    city: string;
    loading: boolean;
    onFinishLoading: (b: boolean) => void;
    isImperial: boolean;
}) {
    const [weather, setWeather] = useState<WheatherModel>();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        fetchData();
    }, [city]);

    if (city.length < 3) return <></>;

    const skeleton = (
        <Card className="bg-day-200">
            <Skeleton active />
        </Card>
    );

    async function fetchData() {
        if (city.length <= 3) return;

        const weatherApi = new WeatherApi();
        try {
            const weatherResponse = await weatherApi.getWeather(city);
            setWeather(weatherResponse);
        } catch (err: any) {
            if (err.response?.status === 400) {
                console.log('Cidade não encontrada: ', city);
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
        <div className="py-4">
            {contextHolder}
            {loading && skeleton}
            {loading || (
                <Card
                    hoverable
                    bordered={false}
                    className={`${weather?.is_day ? 'bg-day-50' : 'bg-night-100'}`}
                >
                    <div className="flex justify-between sm:justify-start">
                        <Title className="pt-3" level={2}>
                            {weather?.cityName}
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
                        {isImperial ? (
                            <Col span={16}>
                                <Title level={3}>{weather?.temp_f}ºF</Title>
                                <Title level={5}>
                                    Sensação: {weather?.feelslike_f}ºF
                                </Title>
                            </Col>
                        ) : (
                            <Col span={16}>
                                <Title level={3}>{weather?.temp_c}ºC</Title>
                                <Title level={5}>
                                    Sensação: {weather?.feelslike_c}ºC
                                </Title>
                            </Col>
                        )}
                        <Col span={16}>
                            <Descriptions>
                                <Descriptions.Item label="País">
                                    {weather?.country}
                                </Descriptions.Item>
                                <Descriptions.Item label="Região">
                                    {weather?.region}
                                </Descriptions.Item>
                                <Descriptions.Item label="Umidade">
                                    {weather?.humidity}
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
