import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const ListBooks = (props) => {
	const { books, updateBook } = props;
	const currentlyReadingBooks = books.filter((book) => book.shelf === 'currentlyReading');
	const wantToReadBooks = books.filter((book) => book.shelf === 'wantToRead');
	const readBooks = books.filter((book) => book.shelf === 'read');

	return <div className='list-books'>
		<div className='list-books-title'>
			<h1>MyReads</h1>
		</div>
		<div className='list-books-content'>
			<div>
				<div className='bookshelf'>
					<h2 className='bookshelf-title'>Currently Reading</h2>
					<BookShelf
						books={currentlyReadingBooks}
						updateBook={updateBook}
					/>
					<h2 className='bookshelf-title'>Want to Read</h2>
					<BookShelf
						books={wantToReadBooks}
						updateBook={updateBook}
					/>
					<h2 className='bookshelf-title'>Read</h2>
					<BookShelf
						books={readBooks}
						updateBook={updateBook}
					/>
				</div>
			</div>
		</div>
		<div className='open-search'>
			<Link
				to='/search'
			>Add a book</Link>
		</div>
	</div>
}

export default ListBooks;
