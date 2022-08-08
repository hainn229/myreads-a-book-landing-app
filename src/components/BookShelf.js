import React, { Component } from 'react';
import Book from './Book'

export default class BookShelf extends Component {
	render() {
		const { books, updateBook } = this.props
		return (
			<div className='bookshelf-books'>
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
		)
	}
}
