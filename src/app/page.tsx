"use client";

import { useState } from 'react';
import { Input, Typography, Divider, Row, Col } from 'antd';

import "./globals.css";

import CapitalWeather from './components/capitalWeather';
import WeatherDetail from './components/weatherDetail';
import SearchBar from './components/searchbar';

const { Search } = Input;
const { Title } = Typography;

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch(text: string | undefined){
    console.log(text);
    if(text == undefined || text.length < 3) return;
    setSearchQuery(text);
    setLoading(true);
    setTimeout(() => { //TODO mudar isso aqui 
      setLoading(false);
    }, 1000);
  }

  return (
    <>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}></Col>

        <Col span={12}>
          <Title level={2} className='p-3 text-slate-50'>Previsão do tempo</Title>
          <SearchBar 
          text={inputText}
          loading={loading}
          onChange={setInputText}
          onSearch={handleSearch}
          />
          <WeatherDetail city={searchQuery}/>
          <Divider className='c-white'/>

          <CapitalWeather />
        </Col>

        <Col span={6}></Col>
      </Row>
    </>
  );
}