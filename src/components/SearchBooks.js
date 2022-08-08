import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import { search } from '../api/BooksAPI';
import { debounce } from 'lodash';

export default class SearchBooks extends Component {
	state = {
		type: '',
		books: [],
	}
	componentWillMount() {
		this.onSearchBook = debounce(this.onSearchBook, 100);
	}
	onSearchBook = (searchValue) => {
		if (searchValue) {
			this.setState({ type: 'searching' });
			const maxResults = 20
			search(searchValue, maxResults).then((response) => {
				if (response) {
					if (!response.error) {
						response = response.map((book) => {
							const bookInShelf = this.props.books.find(b => b.id === book.id);
							if (bookInShelf) {
								book.shelf = bookInShelf.shelf;
							}
							return book;
						});
						this.setState({ type: 'success', books: response })
					} else {
						this.setState({ type: 'error', books: response.error })
					}
				}
			})
		} else {
			this.setState({ type: 'empty', books: [] })
		}
	}

	render() {
		const { updateBook } = this.props;
		const { type, books } = this.state;

		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					<Link
						className='close-search'
						to='/'
					>
						Close
					</Link>
					<div className='search-books-input-wrapper'>
						<input
							onChange={(event) => this.onSearchBook(event.target.value)}
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
		)
	}
}


