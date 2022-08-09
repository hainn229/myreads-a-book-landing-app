import React from 'react';
import PropTypes from 'prop-types';
import { shelves } from '../constants';

const Book = (props) => {
	const onBookShelfChange = (e) => {
		e.preventDefault()
		if (props.updateBook) {
			props.updateBook(props.book, e.target.value)
		}
	};

	const { book } = props;
	if (!book.shelf) {
		book.shelf = 'none'
	}

	return <li key={book.id}>
		<div className='book'>
			<div className='book-top'>
				{book.imageLinks && (
					<div className='book-cover' style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
				)}
				<div className='book-shelf-changer'>
					{book.shelf && (
						<select onChange={onBookShelfChange} defaultValue={book.shelf}>
							{shelves.map(({ id, value, display }) => id === 1
								? <option key={id} value={value} disabled>{display}</option>
								: <option key={id} value={value}>{display}</option>
							)}
						</select>
					)}
				</div>
			</div>
			{book.title && (
				<div className='book-title'>{book.title}</div>
			)}
			{book.authors && (
				book.authors.map((author) => (
					<div className='book-authors' key={author}>{author}</div>
				)))}
		</div>
	</li>
}

Book.propTypes = {
	book: PropTypes.object,
	updateBook: PropTypes.func,
}

export default Book;
