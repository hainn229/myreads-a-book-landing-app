// GET_PASSES_THIS_REPO_UDACITY_PLEASE
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import { getAll, update } from './api/BooksAPI';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';

export default class App extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    getAll().then((books) => {
      this.setState({ books })
    })
  }
  updateBook = (book, shelf) => {
    book.shelf = shelf
    if (this.state.books.indexOf(book) < 0) {
      this.state.books.push(book)
    }
    update(book, shelf).then(
      this.setState((prevState, _props) => {
        return {
          books: prevState.books.map((b) => b.id === book.id ? book : b)
        }
      })
    )
  }
  render() {
    return (
      <div className='app'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <ListBooks
                books={this.state.books}
                updateBook={this.updateBook}
              />
            }
          />
          <Route
            exact
            path='/search'
            element={
              <SearchBooks
                books={this.state.books}
                updateBook={this.updateBook}
              />
            }
          />
        </Routes>
      </div>
    )
  }
}
