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

    // TODO mudar para input com select com as opcoes disponiveis
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
