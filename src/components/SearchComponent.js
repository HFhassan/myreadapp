import React, { Component } from 'react';
import * as BooksAPI from '../data/BooksAPI';
import { Link } from 'react-router-dom';
import Book from './BookComponent';

class Search extends Component{
	constructor(props){
		super(props);
		this.state={
			query: '',
			newBooks: [],
			err: false,
		}
	}
	getBooks= event=>  {
		const query = event.target.value;
		this.setState({ query });

		if(query){
			BooksAPI.search(query).then(books=>{ books.length >0 ? 
				this.setState({ newBooks: books, err: false }) 
				: this.setState({ newBooks: [], err: true});
			});
		}
		else{
			this.setState({newBooks: [], err: false});
		}
	}

	render(){
		const { query, newBooks, err }= this.state;
		const { books, changeShelf }= this.props;
		return(
			<div>
				<div className="search-books">
            		<div className="search-books-bar">
              			<Link className="close-search" to="./" >Close</Link>
              			<div className="search-books-input-wrapper">
                			{console.log(books)}
                			<input type="text" onChange={this.getBooks} placeholder="Search by title or author"/>

              			</div>
            		</div>
            		<div className="search-books-results">
            			{ newBooks.length>0 && (
            			<div>
            				<h3> Search Returned {newBooks.length} </h3>
            				<ol className="books-grid">
            					{newBooks.map(book=>(<Book book={book} books={books} changeShelf={changeShelf}/>))}
            				</ol>
            			</div>            		
            			)}   {err && (
           				 <h3>Search did not return any books. Please try again!</h3>
          				)}                       	
            		</div>            	
				</div>
			</div>
			);
	}
}
export default Search;