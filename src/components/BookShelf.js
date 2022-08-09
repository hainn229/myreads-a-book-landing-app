import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const BookShelf = (props) => {
	const { books, updateBook } = props;

	return <div className='bookshelf-books'>
		<ol className='books-grid'>
			{books.map((book) => (
				<Book
					key={book.id}
					book={book}
					updateBook={updateBook}
				/>
			))}
		</ol>
	</div>
}

BookShelf.propTypes = {
	books: PropTypes.array,
	updateBook: PropTypes.func,
}

export default BookShelf;
