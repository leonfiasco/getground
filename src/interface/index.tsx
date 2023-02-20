export interface Book {
	book_author: [string];
	book_pages: number;
	book_publication_city: string;
	book_publication_country: string;
	book_publication_year: number;
	book_title: string;
	id: number;
}

export interface BookData {
	bookData: {
		bookData: Book[];
	};
}
