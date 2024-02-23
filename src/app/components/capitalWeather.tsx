import { useEffect, useState } from 'react';

import { Card, Row, Col, Typography, Skeleton, Descriptions } from 'antd';

const { Title } = Typography;

import WeatherApi from "../services/weatherApi";
import { WheatherModel } from '../models/weatherModel';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const weatherApi = new WeatherApi();

export default function CapitalWeather({ isImperial }: { isImperial: boolean}) {
    const [weatherData, setWeatherData] = useState<WheatherModel[]>(Array(0));

    const capitals: string[] = [
        "Maringá",
        "São Paulo",
        "Rio de Janeiro",
        "Nagasaki",
        "Florianópolis",
        "Tokio",
        "Londres",
        "Los Angeles"
    ];

    async function fetchData(){
        const promises = capitals.map((capital) => {
            return weatherApi.getWeather(capital);
        });
    
        Promise.all(promises).then((values) => {
            setWeatherData(values);
        });
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    if (weatherData.length === 0){
        return (
            <>
                <Title level={3} className='p-3 text-slate-50'>Capitais</Title>
                <Col sm={6} md={12}>
                    <Card className='m-3 bg-transparent border-amber-700'>
                        <Skeleton active />
                    </Card>
                </Col>
            </>
        );
    }
    const capitalsJsx = weatherData.map((weather: WheatherModel) => {
        if (!weather) return <></>;
        return (
            <Col key={weather.lat} xs={24} sm={12} md={8} lg={8} xxl={6}>
                <Card hoverable className={`m-1 bg-transparent border-amber-700 hover:${weather?.is_day ? "bg-day-200" : "bg-night-100"}`}>
                    <div className='flex justify-between'>
                        <Title className='pt-3' level={4}>{weather?.cityName}</Title>
                        {
                            weather?.is_day 
                            ? <SunOutlined className='pl-2'/> 
                            : <MoonOutlined className='pl-2'/>
                        }
                    </div>
                    {isImperial
                        ? <Title level={5}>{weather?.temp_f}ºF</Title>
                        : <Title level={5}>{weather?.temp_c}ºC</Title>
                    }

                    <Descriptions>
                        {isImperial
                            ? <Descriptions.Item label="Sensação">{weather?.feelslike_f}ºF</Descriptions.Item>
                            : <Descriptions.Item label="Sensação">{weather?.feelslike_c}ºC</Descriptions.Item>
                        }
                    </Descriptions>
                    <Descriptions>
                        <Descriptions.Item label="Umidade">{weather?.humidity}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Col>
        );
    });

    return (
        <>
            <Title level={2} className='p-3 text-slate-50'>Capitais</Title>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {capitalsJsx}
            </Row>
        </>
    );
}