import { Input } from 'antd';

type SearchBarProps = {
    text: string;
    onChange: (e: string) => void;
}

export default function SearchBar({
    text,
    onChange,
}: SearchBarProps) {
    const placeholderText = 'Insira aqui o nome da sua cidade';

    return (
        <>
            <Input
                data-testid="searchBarComponent"
                value={text}
                placeholder={placeholderText}
                allowClear
                onChange={(e) => onChange(e.target.value)}
                className="w-9/12 md:w-full p-3 c-white"
            />
        </>
    );
}
