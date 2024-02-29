import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CapitalWeather from '../../app/components/capitalWeather';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

it('renders the capital weather component', () => {
    render(<CapitalWeather isImperial={false} />);
    const linkElement = screen.getByTestId('capitalsComponent');
    expect(linkElement).toBeInTheDocument();
});
