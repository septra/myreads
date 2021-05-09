import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI.js'

class BookSearch extends Component {

    state = {
        query: '',
        results: []
    }

    updateQuery = (value) => {
        this.setState(() => ({
            query: value.trim()
        }),
            this.searchBooks(value.trim())
        )
    }

    searchBooks = (query) => {
        query !== ''
            ? BooksAPI.search(query).then((books) => {
                const filteredBooks = books.filter((book) => (
                    book.imageLinks && book.imageLinks.thumbnail && true
                ))

                console.log(filteredBooks)

                this.setState(() => ({
                    results: (filteredBooks && filteredBooks.length > 0) ? filteredBooks : []
                }))

              })
            : this.setState(() => ({
                results: []
            }))
    }

    render() {
        return (
          <div className="search-books">
            <div className="search-books-bar">
                <Link to='/' className='close-search'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                    type="text" 
                    placeholder="Search by title or author" 
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {this.state.results.map((book) => (
                    <li key={book.id}>
                        <Book book={book} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default BookSearch
