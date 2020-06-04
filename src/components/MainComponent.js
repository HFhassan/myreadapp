import React,{ Component } from 'react';
import * as BooksAPI from '../data/BooksAPI';
import { Switch, Route, Link } from 'react-router-dom';
import Search from './SearchComponent';
import BookList from './BookListComponent';
import NotFound from './NotFoundComponent';

class Main extends Component{
	constructor(props){
		super(props);
		this.state={
			books:[],
		}
	}
	changeShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then(response => {
      // set shelf for new or updated book
      changedBook.shelf = shelf;
      // update state with changed book
      this.setState(prevState => ({
        books: prevState.books
          // remove updated book from array
          .filter(book => book.id !== changedBook.id)
          // add updated book to array
          .concat(changedBook)
      }));
    });
  };
	componentDidMount(){
		BooksAPI.getAll().then(books=>this.setState({books}));
	}
	render(){
		const { books } = this.state;
		return(
			<div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <Search books={books} changeShelf={this.changeShelf} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <BookList books={books} changeShelf={this.changeShelf} />
                <div>
                  <Link to="/search" className="open-search">Search</Link>
                </div>
              </div>
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
			);
	}
}
export default Main;