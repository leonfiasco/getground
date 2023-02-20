import { Dispatch, SetStateAction, Component } from 'react';
import BookList from '../BookList/BookList';
import axios from 'axios';

import { Book } from '../../interface';

type Props = {
	setFilteredBooks: Dispatch<SetStateAction<Book[]>>;
};

type State = {
	query: string;
	books: Book[];
};

class Search extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			query: '',
			books: [],
		};
	}

	handleSearch = async () => {
		const { query } = this.state;
		try {
			const response = await axios.post('http://nyx.vima.ekt.gr:3000/api/books', {
				params: {
					filters: [{ type: 'all', values: [query] }],
				},
			});

			const filteredBooks = response.data.books.filter((book: Book) =>
				book.book_title.toLowerCase().includes(query.toLowerCase())
			);

			this.setState({
				books: filteredBooks,
			});
		} catch (error) {
			alert('no match mate');
			console.error(error);
		}
	};

	componentDidUpdate(prevProps: Props, prevState: State) {
		const { setFilteredBooks } = this.props;
		const { books } = this.state;

		if (prevState.books !== books) {
			setFilteredBooks(books);
		}
	}

	render() {
		const { query, books } = this.state;
		return (
			<div>
				<input
					type='text'
					value={query}
					onChange={(event) => this.setState({ query: event.target.value })}
				/>
				<button onClick={this.handleSearch}>Search</button>
				<ul>{books.length > 0 && <BookList filteredBooks={books} />}</ul>
			</div>
		);
	}
}

export default Search;
