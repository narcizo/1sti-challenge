import { useEffect, useState } from 'react';

import { Card, Row, Col, Typography, Skeleton} from 'antd';

const { Title } = Typography;

import WeatherApi from "../services/weatherApi";
import { WheatherModel } from '../models/weatherModel';

const weatherApi = new WeatherApi();

export default function CapitalWeather() {
    const [weatherData, setWeatherData] = useState<WheatherModel[]>(Array(0));

    const capitals: string[] = [
        "Maringá",
        "São Paulo",
        "Rio de Janeiro",
        "Curitiba",
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
                <Col span={12}>
                    <Card className='m-3 bg-transparent'>
                        <Skeleton active />
                    </Card>
                </Col>
            </>
        );
    }
    const capitalsJsx = weatherData.map((value: any) => {
        if (!value) return <></>;
        console.log(value)
        return (
            <Col key={value.location.lat} span={12}>
                <Card className='m-3 bg-transparent' title={value.location.name} bordered={false}>
                    <p>Temp: {value.current.temp_c}ºC</p>
                    <p>Sensação: {value.current.feelsLike_c}ºC</p>
                </Card>
            </Col>
        );
    });

    return (
        <>
            <Title level={3} className='p-3 text-slate-50'>Capitais</Title>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {capitalsJsx}
            </Row>
        </>
    );
}