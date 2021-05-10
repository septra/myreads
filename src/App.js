import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf.js'
import { Link, Route } from 'react-router-dom'
import BookSearch from './BookSearch.js'
import * as BooksAPI from './BooksAPI.js'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books: books
                }))
            })
    }

    render() {
        const { books } = this.state
        return (
          <div className="app">
              <Route exact path='/' render={() => (
                  <div className="list-books">
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                      <div>
                          <Shelf title='Currently Reading' books={books.filter((book) => ( 
                              book.shelf === 'currentlyReading'
                          ))} />
                          <Shelf title='Want to Read' books={books.filter((book) => ( 
                              book.shelf === 'wantToRead'
                          ))} />
                          <Shelf title='Read' books={books.filter((book) => ( 
                              book.shelf === 'read'
                          ))} />
                      </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'> <button> Add a book </button> </Link>
                    </div>
                  </div>
              )} />
              <Route path='/search' component={BookSearch} />
          </div>
        )
    }
}

export default BooksApp
