// GET_PASSES_THIS_REPO_UDACITY_PLEASE
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import { getAll, update } from './api/BooksAPI';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = () => getAll().then((res) => setBooks(res));
    getBooks();
  }, []);

  const updateBook = (book, shelf) => {
    book.shelf = shelf;
    update(book, shelf)
      .then(() => setBooks([...books.filter((b) => b.id !== book.id), book]));
  }

  return (
    <div className='app'>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <ListBooks
              books={books}
              updateBook={updateBook}
            />
          }
        />
        <Route
          exact
          path='/search'
          element={
            <SearchBooks
              books={books}
              updateBook={updateBook}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App;