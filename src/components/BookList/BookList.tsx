import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, StoreDataAction } from '../../redux/actions';
import { BookData, Book } from '../../interface';

import styles from './style.module.scss';

type props = {
	booksPerPage?: number;
	currentPage?: number;
	filteredBooks: Book[];
};

const BookList = ({ booksPerPage, currentPage, filteredBooks }: props) => {
	const dispatch =
		useDispatch<ThunkDispatch<BookData, undefined, StoreDataAction>>();

	// Get the list of books from the Redux store
	const books = useSelector((state: BookData) => state.bookData.bookData);

	// Call the fetchData action creator when the component mounts
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	if (!currentPage || !booksPerPage) return null;

	// Get current posts
	const indexOfLastBook = currentPage * booksPerPage;
	const indexOfFirstBook = indexOfLastBook - booksPerPage;
	const currentBooks =
		filteredBooks.length > 0
			? filteredBooks
			: books?.slice(indexOfFirstBook, indexOfLastBook);

	const renderBooks = () => {
		return currentBooks?.map((book) => {
			if (!book) return null;
			const { book_title, book_author, book_publication_year, id } = book;
			return (
				<div
					key={id}
					className={` card ${styles.listItem}`}
					style={{ width: '18rem' }}
				>
					<div className='card-body'>
						{book_title && <h5 className='card-title mb-3'>{book_title}</h5>}
						{book_author && (
							<h6 className='card-subtitle mb-2 text-muted'>{book_author}</h6>
						)}
						{book_publication_year && (
							<p className='card-text'>{book_publication_year}</p>
						)}
					</div>
				</div>
			);
		});
	};

	return (
		<section>
			<div className={styles.listContainer}>
				<ul>{renderBooks()}</ul>
			</div>
		</section>
	);
};

export default BookList;
