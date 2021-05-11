import React, { Component } from 'react'
import Book from './Book.js'

class Shelf extends Component {
    render () {

        const { title, books, onBookChange } = this.props

        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => ( 
                        <li key={book.title}>
                            <Book book={book} onBookChange={onBookChange} />
                        </li>
                    ))}
                </ol>
              </div>
            </div>
        )
    }
}

export default Shelf
