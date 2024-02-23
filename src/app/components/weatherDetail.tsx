import { useState, useEffect } from 'react';
import { WheatherModel } from '../models/weatherModel';
import { Skeleton, Card, Typography, Row, Col, Descriptions } from 'antd';
import Image from 'next/image';

import WeatherApi from '../services/weatherApi';

const { Title }= Typography;

export default function WeatherDetail({ city, loading, onFinishLoading, isImperial } : { city: string, loading: boolean, onFinishLoading: (b: boolean) => void, isImperial: boolean}) {
    const [weather, setWeather] = useState<WheatherModel>();

    useEffect(() => {
        fetchData();
    }, [city]);

    if (city.length < 3) return (<></>);

    async function fetchData(){
        if(city.length <= 3) return;
        
        const weatherApi = new WeatherApi();
        try{
            const weatherResponse = await weatherApi.getWeather(city);
            setWeather(weatherResponse);
        }catch(err: any){
            if (err.response?.status === 400){
                console.log("Cidade não encontrada: ", city);
            }
        }
        finally{
            onFinishLoading(false);
        }
    }

    return (
        <div className='py-4'>
            {loading && <Card className='bg-day-200'><Skeleton active/></Card>}
            {
                loading ||
                <Card 
                hoverable
                bordered={false}
                className={`${weather?.is_day ? "bg-day-50" : "bg-night-100"}`}
                >
                    <div className='flex justify-between sm:justify-start'>
                        <Title className='pt-3' level={2}>{weather?.cityName}</Title>
                        <Image className='justify-end' src={weather?.condition.icon} alt={weather?.condition.text} width={70} height={70}/>
                    </div>
                    <Row>
                        {isImperial 
                        ? (
                            <Col span={16}>
                                <Title level={3}>{weather?.temp_f}ºF</Title>
                                <Title level={5}>Sensação: {weather?.feelslike_f}ºF</Title>
                            </Col>
                        )
                        : (
                            <Col span={16}>
                                <Title level={3}>{weather?.temp_c}ºC</Title>
                                <Title level={5}>Sensação: {weather?.feelslike_c}ºC</Title>
                            </Col>
                        )
                        }
                        <Col span={20}>
                            <Descriptions>
                                <Descriptions.Item label="País">{weather?.country}</Descriptions.Item>
                                <Descriptions.Item label="Região">{weather?.region}</Descriptions.Item>
                                <Descriptions.Item label="Umidade">{weather?.humidity}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
            }
        </div>
    );
}