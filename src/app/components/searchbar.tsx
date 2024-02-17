import { useState } from 'react';

import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

export default function SearchBar({ text, loading, onChange, onSearch }: { text: string, loading: boolean, onChange: (e: string) => void, onSearch: (value: string) => void}){
    const placeholderText = "Insira aqui o nome da sua cidade";


    return (
        <>
            <Search
            value={text}
            placeholder={placeholderText}
            allowClear
            loading={loading}
            onSearch={onSearch}
            onChange={(e) => onChange(e.target.value)}
            className='p-3 c-white'
            />
        </>
    );
}