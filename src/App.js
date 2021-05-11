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

    onBookChange = (newShelf, bookId) => {
        console.log(newShelf, bookId)
        this.setState((currentState) => {
            const books = currentState.books
            const bookIndex = books.findIndex(x => x.id === bookId)
            books[bookIndex].shelf = newShelf
            return {
                books: books
            }
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
                          <Shelf 
                            title='Currently Reading' 
                            books={books.filter((book) => (book.shelf === 'currentlyReading'))} 
                            onBookChange={this.onBookChange}
                          />
                          <Shelf 
                            title='Want to Read' 
                            books={books.filter((book) => (book.shelf === 'wantToRead'))} 
                            onBookChange={this.onBookChange}
                          />
                          <Shelf 
                            title='Read' 
                            books={books.filter((book) => (book.shelf === 'read'))} 
                            onBookChange={this.onBookChange}
                          />
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
