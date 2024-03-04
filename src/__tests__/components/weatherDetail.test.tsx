import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import WeatherDetail from '@/app/components/weatherDetail';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('WeatherDetail', () => {
    it('Should render the weather detail component', async () => {
        const onFinishLoading = jest.fn();
        const { rerender } = render(<WeatherDetail city="Maringá" isImperial={false} loading={false} onFinishLoading={onFinishLoading}/>);
        
        const weatherDetail = screen.getByTestId('weatherDetailComponent');
        expect(weatherDetail).toBeInTheDocument();

        // const weatherCity = screen.getByText('Maringá');
        // expect(weatherCity).toBeInTheDocument();

        rerender(<WeatherDetail city="São Paulo" isImperial={false} loading={false} onFinishLoading={onFinishLoading}/>);

        const weatherDetail2 = screen.getByTestId('weatherDetailComponent');
        expect(weatherDetail2).toBeInTheDocument();

        // const weatherCity2 = screen.getByText('São Paulo');
        // expect(weatherCity2).toBeInTheDocument();
    });
});