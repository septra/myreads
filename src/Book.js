import React, { Component } from 'react'

class Book extends Component {

    state = {
        book: this.props.book
    }

    handleShelfChange = (e) => {
        e.preventDefault()
        const { value } = e.target;
        this.setState((currentState) => { 
            const book = currentState.book
            book.shelf = value
            return {
                book: book
            }
        })
    }

    render() {

        const { book } = this.state

        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={this.handleShelfChange}>
                    <option value="move" disabled >Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead" >Want to Read</option>
                    <option value="read" >Read </option>
                    <option value="none" >None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors && book.authors.length > 0 ? book.authors.join() : ''}</div>
            </div>
            
        )
    }
}

export default Book
