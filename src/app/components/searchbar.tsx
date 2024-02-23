
import { Input } from 'antd';

export default function SearchBar({ text, onChange }: { text: string, onChange: (e: string) => void}){
    const placeholderText = "Insira aqui o nome da sua cidade";

    return (
        <>
            <Input
            value={text}
            placeholder={placeholderText}
            allowClear
            onChange={(e) => onChange(e.target.value)}
            className='w-9/12 md:w-full p-3 c-white'
            />
        </>
    );
}