import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/app/components/searchbar';

describe('SearchBar', () => {
    it('Should render the search bar component', async () => {
        const onChange = jest.fn();
        render(<SearchBar text='teste' onChange={onChange} />);
        const inputField = screen.getByTestId('searchBarComponent');

        expect(inputField).toBeInTheDocument();

        await userEvent.type(inputField, 'Maringá');
        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(7);
    });
});