'use client';

import { useState } from 'react';
import { Typography, Switch, Col, Flex } from 'antd';
import { CodeFilled, GithubOutlined, HeartFilled, LinkedinFilled } from '@ant-design/icons';
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
                wrap='wrap'
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

                <Col xs={22} md={18}>
                    <hr className="mt-4 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                    <div className="flex justify-center sm:justify-between flex-wrap items-center p-6">
                        <div className="text-base text-neutral-100 font-sans">
                            Desenvolvido com <HeartFilled className="text-[#dc2626]"/> por Narcizo Palioto
                        </div>

                        <div className="flex gap-3">
                            <a href="https://www.github.com/narcizo" target="_blank" rel="noreferrer">
                                <GithubOutlined className='text-2xl py-4'/>
                            </a>
                            <a href="https://www.linkedin.com/in/narcizog" target="_blank" rel="noreferrer">
                                <LinkedinFilled className='text-2xl py-4'/>
                            </a>
                            {/* <a href="https://narcizo.dev" target="_blank" rel="noreferrer">
                                <CodeFilled className='text-2xl'/>
                            </a> */}
                        </div>
                    </div>
                </Col>
            </Flex>
        </>
    );
}
