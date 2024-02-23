import { useEffect, useState, useMemo } from 'react';

import { Card, Row, Col, Typography, Skeleton, Descriptions, Button, message} from 'antd';

const { Title } = Typography;

import WeatherApi from "../services/weatherApi";
import { WheatherModel } from '../models/weatherModel';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const weatherApi = new WeatherApi();

export default function CapitalWeather({ isImperial }: { isImperial: boolean}) {
    const [weatherData, setWeatherData] = useState<WheatherModel[]>(Array(0));
    const [reload, setReload] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchData = useMemo(() => async () => {
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

        try{
            const promises = capitals.map((capital: string) => {
                return weatherApi.getWeather(capital);
            });
            
            const data = await Promise.all(promises);
            setWeatherData(data)
        }catch(err: any){
            console.error("Error fetching Data: ", err);
            if(err?.code == "ERR_NETWORK"){
                messageApi.open({
                    type: 'error',
                    content: 'Sem conexão',
                });
            }
        }finally{
            setReload(false);
        }
    }, [reload]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    let emptyWeather = null;
    if (weatherData.length === 0 || reload){
        emptyWeather = (
            <>
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
            {contextHolder}
            <div className='flex items-center justify-between'>
                <Title level={2} className='p-3 m-0 text-slate-50'>Capitais</Title>
                <Button loading={reload} onClick={() => setReload(true)} className='bg-background-5 border-none	text-white mr-1'>Recarregar</Button>
            </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {emptyWeather || capitalsJsx}
            </Row>
        </>
    );
}