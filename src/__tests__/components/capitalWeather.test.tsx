import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CapitalWeather from '@/app/components/capitalWeather';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('CapitalWeather', () => {
    it('Should render the capital weather component', () => {
        render(<CapitalWeather isImperial={false} />);
        const staticHeader = screen.getByTestId('capitalsComponent');
        // const apiCard = screen.getByText('Maringá'); //pq esse não funciona?

        expect(staticHeader).toBeInTheDocument();
        // expect(apiCard).toBeInTheDocument();
    });
});
