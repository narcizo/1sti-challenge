import { Input } from 'antd';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import { useState, useMemo } from 'react';
import WeatherApi from '../services/weatherApi';
import { ILocation } from '../models/weatherModel';
import { debounce } from 'lodash';

type SearchBarProps = {
    text: string;
    onChange: (e: string) => void;
}

export default function SearchBar({
    text,
    onChange,
}: SearchBarProps) {
    const placeholderText = 'Insira aqui o nome da sua cidade';
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string }>();

    async function fetchLocations(location: string): Promise<any>{
        const weatherApi = new WeatherApi();

        const locationsRes = await weatherApi.getLocations(location);

        setLocations(locationsRes);
        return locationsRes;
    }

    return (
    <>
        <DebounceSelect
            showSearch
            value={selectedOption}
            placeholder={placeholderText}
            fetchOptions={fetchLocations}
            onChange={(newValue) => {
                if (newValue){
                    setSelectedOption(newValue);
                    onChange(newValue?.label);
                }
            }}
            style={{ width: '90%' }}
        />
        <p>

            {/* {value.map((v) => v.label).join(', ')} */}
        </p>
    </>
    );
    /////////////////////////////////////////////////////////////////////

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
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder={placeholderText}
                optionFilterProp="children"
                // filterOption={(input, option) => (option?.label ?? '').includes(input)}
                // filterSort={(optionA, optionB) =>
                // (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                // }
                onChange={(e) => onChange(e.target.value)}
                options={locations.map((location) => {
                    return { value: location.id, label: `${location.name} - ${location.country}` };
                })
                }
            />
        </>
    );
}


export interface DebounceSelectProps<ILocation>
    extends Omit<SelectProps<ILocation | ILocation[]>, 'options' | 'children'> {
    fetchOptions: (search: string) => Promise<ILocation[]>;
    debounceTimeout?: number;
}

function DebounceSelect<ILocation extends {value: string | number, label: string}>({ fetchOptions, debounceTimeout = 400, ...props }: DebounceSelectProps<ILocation>) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState<ILocation[]>([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options && options.map((location: ILocation) => ({ value: location.id, label: `${location.name} - ${location.country}` }))}
        />
    );
}
