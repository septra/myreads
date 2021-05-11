import React, { Component } from 'react'
import Book from './Book.js'

class Shelf extends Component {
    render () {

        const { title, books, onBookChange } = this.props

        const sortedBooks = books.sort(function(a, b){
            if(a.id < b.id) { return -1; }
            if(a.id > b.id) { return 1; }
            return 0;
        })

        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {sortedBooks.map((book) => ( 
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
