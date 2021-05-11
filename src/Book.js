import React, { Component } from 'react'

class Book extends Component {

    state = {
        shelf: 'none'
    }

    componentDidMount () {
        this.setState(() => ({
            shelf: this.props.book.shelf
        }))
    }

    render() {

        const { book } = this.props
        const { shelf } = this.state

        const read = 'read' === shelf
        const wantToRead = 'wantToRead' === shelf
        const currenlyReading = 'currentlyReading' === shelf
        const none = !read && !wantToRead && !currenlyReading

        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                }}></div>
                <div className="book-shelf-changer">
                  <select>
                    <option value="move" disabled >Move to...</option>
                    <option value="currentlyReading" selected={currenlyReading}>Currently Reading</option>
                    <option value="wantToRead" selected={wantToRead}>Want to Read</option>
                    <option value="read" selected={read}>Read </option>
                    <option value="none" selected={none}>None</option>
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
