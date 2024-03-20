'use client';

import { useState } from 'react';
import { Typography, Switch, Col, Flex } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import './globals.css';

import CapitalWeather from './components/capitalWeather';
import WeatherDetail from './components/weatherDetail';
import SearchBar from './components/searchbar';

const { Title } = Typography;

export default function Home() {
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [useImperial, setUseImperial] = useState(false);
    
    function handleInputText(text: string) {
        setInputText(text);
        
        setLoading(true);
    }

    return (
        <>
            <Flex
                justify="center"
                className="min-h-screen overflow-auto bg-gradient-to-r from-background-1 to-background-4"
            >
                <Col xs={22} md={18}>
                    <Title className="flex p-3 justify-center pb-0 fill-white">
                        Previsão do tempo
                    </Title>
                    <div className="flex items-center justify-center">
                        <SearchBar
                            text={inputText}
                            onChange={handleInputText}
                        />
                    </div>
                    <div className="flex items-center justify-center md:items-start md:justify-start">
                        <div className="w-48 flex items-center justify-center p-3 mt-3 mb-3 bg-background-5 w-30 rounded-full">
                            <Switch
                                value={useImperial}
                                onChange={(checked) => setUseImperial(checked)}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                            <p className="ml-3 text-lg text-white">
                                Usar imperial
                            </p>
                        </div>
                    </div>
                    <WeatherDetail
                        city={inputText}
                        loading={loading}
                        onFinishLoading={setLoading}
                        isImperial={useImperial}
                    />
                    <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                    <CapitalWeather isImperial={useImperial} />
                </Col>
            </Flex>
        </>
    );
}
