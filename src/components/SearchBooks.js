import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import { search } from '../api/BooksAPI';
import { debounce } from 'lodash';

const SearchBooks = (props) => {
	const [type, setType] = useState('');
	const [books, setBooks] = useState([]);
	const onSearchBook = debounce((searchValue) => {
		if (searchValue) {
			setType('searching')
			const maxResults = 20
			search(searchValue, maxResults).then((response) => {
				if (!response) {
					setType('empty');
					return setBooks([]);
				}
				if (response.error) {
					setType('error');
					return setBooks(response.error);
				}
				const result = response.map((book) => {
					const bookInShelf = props.books.find(b => b.id === book.id);
					if (bookInShelf) {
						book.shelf = bookInShelf.shelf;
					}
					return book;
				});
				setType('success');
				setBooks(result);
			})
		} else {
			setType('empty');
			setBooks([]);
		}
	}, 500)
	const { updateBook } = props;

	return <div className='search-books'>
		<div className='search-books-bar'>
			<Link
				className='close-search'
				to='/'
			>
				Close
			</Link>
			<div className='search-books-input-wrapper'>
				<input
					onChange={(event) => onSearchBook(event.target.value)}
					type='text'
					placeholder='Search by Title or Author'
				/>
			</div>
		</div>
		<div className='search-books-results'>
			<ol className='books-grid'>
				{type === 'searching' && (
					<div className='search-book-results-msg'>Searching...</div>
				)}
				{type === 'success' && (
					books.map((book) => (
						<Book
							key={book.id}
							book={book}
							updateBook={updateBook}
						/>
					))
				)}

				{type === 'error' && books === 'empty query' && (
					<div className='search-book-results-msg'>No results</div>
				)}

				{type === 'empty' && (
					<div className='search-book-results-msg'></div>
				)}

			</ol>
		</div>
	</div>
}

export default SearchBooks;
