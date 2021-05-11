import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI.js'

class BookSearch extends Component {

    state = {
        query: '',
        results: [],
    }

    updateQuery = (value) => {
        this.setState(() => ({
            query: value.trim()
        }),
            this.searchBooks(value.trim())
        )
    }

    assignShelf = (book) => {
        const { selectedBooks } = this.props
        const bookIndex = selectedBooks.findIndex(x => x.id === book.id)

        const shelf = bookIndex === -1
            ? "none"
            : selectedBooks[bookIndex].shelf

        book.shelf = shelf
        return book
    }

    searchBooks = (query) => {
        query !== ''
            ? BooksAPI.search(query).then((books) => {
                if (books instanceof Array) {
                    const filteredBooks = books.filter((book) => (
                        book.imageLinks && book.imageLinks.thumbnail && true
                    ))

                    this.setState(() => ({
                        results: (filteredBooks && filteredBooks.length > 0) ? filteredBooks : []
                    }))
                } else {
                    this.setState(() => ({
                        results: []
                    }))
                }
              }).catch(err => {
                    this.setState(() => ({
                        results: []
                    }))
              })
            : this.setState(() => ({
                results: []
            }))
    }

    onBookChange = (newShelf, book) => {
        this.setState((currentState) => {
            const { results } = this.state
            const bookIndex = results.findIndex(x => x.id === book.id)
            results[bookIndex].shelf = newShelf
            return {results: results}
        })
        this.props.onBookChange(newShelf, book)
    }

    render() {
        const { results } = this.state
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
                  {results.map(this.assignShelf).map((book) => (
                    <li key={book.id}>
                        <Book book={book} onBookChange={this.onBookChange} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default BookSearch
