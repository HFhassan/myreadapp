import React from 'react';
import noCover from '../images/no-cover-image.png';
import ShelfChanger from './ShelfChangerComponent';

function Book(props){
	const { book, books, changeShelf }= props;
	const coverImg = book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : noCover;
	const title = book.title ? book.title : 'No Title Available';
return(
	<li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ backgroundImage: `url(${coverImg})` }}
          />
          <img src={coverImg}  className="book-cover-image"/>
          {console.log(book)}
          <ShelfChanger book={book} books={books} changeShelf={changeShelf} />
        </div>
        <div className="book-title">{title}</div>
        {
        book.authors &&
          book.authors.map((author, index) => (
            <div className="book-authors" key={index}>
              {author}
            </div>
          ))}
      </div>
    </li>

	);
}
export default Book;