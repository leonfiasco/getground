import { useSelector } from 'react-redux';
import { BookData } from '../../interface';
import { useEffect } from 'react';

import styles from './style.module.scss';

type props = {
	booksPerPage: number;
	paginate: (num: number) => void;
};

const PagePagination = ({ booksPerPage, paginate }: props) => {
	const books = useSelector((state: BookData) => state.bookData.bookData);

	const totalPages = Math.ceil(books?.length / booksPerPage);

	// Generate an array of page numbers
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

	// Parse the current page number from the URL and call the paginate function with the correct page number
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const pageParam = urlParams.get('page');
		const currentPage = pageParam ? parseInt(pageParam) : 1;
		paginate(currentPage);
	}, [paginate]);

	const renderPagination = () => {
		return (
			<ul className='pagination'>
				{pageNumbers.map((number) => (
					<li key={number} className='page-item'>
						<button
							onClick={() => {
								// Update the URL with the new page number
								const newUrl = `${window.location.pathname}?page=${number}`;
								window.history.pushState({ path: newUrl }, '', newUrl);

								// Call the paginate function passed as a prop
								paginate(number);
							}}
							className='page-link'
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		);
	};

	return <nav className={styles.paginationNav}>{renderPagination()}</nav>;
};

export default PagePagination;
