import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';

import Search from './Search';

jest.mock('axios');

describe('Search', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render a search input and a search button', () => {
		render(<Search setFilteredBooks={() => {}} />);
		const searchInput = screen.getByRole('textbox', { name: /search input/i });
		const searchButton = screen.getByRole('button', { name: /search/i });

		expect(searchInput).toBeInTheDocument();
		expect(searchButton).toBeInTheDocument();
	});

	it('should make a request to the books API when the search button is clicked', async () => {
		const mockedAxios = axios as jest.Mocked<typeof axios>;
		mockedAxios.post.mockResolvedValueOnce({
			data: {
				books: [
					{ id: 1, book_title: 'Book 1', book_author: 'Author 1' },
					{ id: 2, book_title: 'Book 2', book_author: 'Author 2' },
				],
			},
		});

		render(<Search setFilteredBooks={() => {}} />);
		const searchInput = screen.getByRole('textbox', { name: /search input/i });
		const searchButton = screen.getByRole('button', { name: /search/i });

		fireEvent.change(searchInput, { target: { value: 'book' } });
		fireEvent.click(searchButton);

		expect(mockedAxios.post).toHaveBeenCalledWith(
			'http://nyx.vima.ekt.gr:3000/api/books',
			{
				params: {
					filters: [{ type: 'all', values: ['book'] }],
				},
			}
		);
	});

	it('should filter the books based on the search query and pass them to the BookList component', async () => {
		const mockedAxios = axios as jest.Mocked<typeof axios>;
		mockedAxios.post.mockResolvedValueOnce({
			data: {
				books: [
					{ id: 1, book_title: 'Book 1', book_author: 'Author 1' },
					{ id: 2, book_title: 'Book 2', book_author: 'Author 2' },
				],
			},
		});

		const setFilteredBooksMock = jest.fn();
		render(<Search setFilteredBooks={setFilteredBooksMock} />);
		const searchInput = screen.getByRole('textbox', { name: /search input/i });
		const searchButton = screen.getByRole('button', { name: /search/i });

		fireEvent.change(searchInput, { target: { value: 'book 2' } });
		fireEvent.click(searchButton);

		expect(mockedAxios.post).toHaveBeenCalledWith(
			'http://nyx.vima.ekt.gr:3000/api/books',
			{
				params: {
					filters: [{ type: 'all', values: ['book 2'] }],
				},
			}
		);

		await screen.findByText(/Book 2/i);

		expect(setFilteredBooksMock).toHaveBeenCalledWith([
			{ id: 2, book_title: 'Book 2', book_author: 'Author 2' },
		]);
	});
});
