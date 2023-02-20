import { useState } from 'react';
import { Provider } from 'react-redux';
import { Book } from './interface';
import List from './components/BookList/BookList';
import PagePagination from './components/Pagination/Pagination';
import Search from './components/Search/Search';

import Store from './redux/store';

import styles from './style.module.scss';

function App() {
	const [booksPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

	const paginate = (pageNum: number) => setCurrentPage(pageNum);

	return (
		<div className={styles.wrapper}>
			<Provider store={Store}>
				<Search setFilteredBooks={setFilteredBooks} />
				<List
					booksPerPage={booksPerPage}
					currentPage={currentPage}
					filteredBooks={filteredBooks}
				/>
				<PagePagination booksPerPage={booksPerPage} paginate={paginate} />
			</Provider>
		</div>
	);
}

export default App;
