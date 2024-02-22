"use client";

import { useState, useCallback } from 'react';
import { Typography, Switch, Row, Col } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

import "./globals.css";

import CapitalWeather from './components/capitalWeather';
import WeatherDetail from './components/weatherDetail';
import SearchBar from './components/searchbar';

const { Title } = Typography;

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [useImperial, setUseImperial] = useState(false);

  function handleSearch(text: string | undefined){
    console.log(text);
    if(text == undefined || text.length < 3) return;
    setSearchQuery(text);
    setLoading(true);
  }

  const debouncedInput = useCallback(debounce(handleSearch, 300), []);

  function handleInputText(text: string){
    setInputText(text);

    debouncedInput(text);
  }

  return (
    <>
    <Row className='bg-gradient-to-r from-background-1 to-background-4' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}></Col>

        <Col span={12}>
          <Title className='flex justify-center p-3 text-slate-50'>Previsão do tempo</Title>
          <div className='justify-center'>
            <SearchBar 
            text={inputText}
            onChange={handleInputText}
            />
            <div className='w-44 flex justify-center p-3 mt-3 mb-3 bg-background-5 w-30 rounded-full'>
              <Switch 
              value={useImperial}
              onChange={(checked) => setUseImperial(checked)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}/>
              <p className='ml-3 text-white'>Usar imperial</p>
            </div>
          </div>
          <WeatherDetail city={searchQuery} loading={loading} onFinishLoading={setLoading} isImperial={useImperial}/>
          <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          <CapitalWeather isImperial={useImperial}/>
        </Col>

        <Col span={6}></Col>
      </Row>
    </>
  );
}