import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {Context} from "../context";

const BookList = () => {
	const {state} = useContext(Context);
	const [searchText, setSearchText] = useState('');
	const [selectedPriceRange, setSelectedPriceRange] = useState('all');

	const handleSearchChange = (event) => {
		setSearchText(event.target.value);
	};

	const handlePriceRangeChange = (event) => {
		setSelectedPriceRange(event.target.value);
	};

	const filterBooksByTitle = (book) => {
		return book.title.toLowerCase().includes(searchText.toLowerCase());
	};

	const filterBooksByPrice = (book) => {
		switch (selectedPriceRange) {
			case 'lessThan15':
				return book.price < 15;
			case '15to30':
				return book.price >= 15 && book.price < 30;
			case 'greaterThan30':
				return book.price >= 30;
			default:
				return true; // Show all books
		}
	};

	const truncateTitle = (title) => {
		return title.length > 24 ? title.slice(0, 24) + '...' : title;
	};

	return (
		<div className="book-list">
			<h2>Book List</h2>
			<div className="filters">
				<input
					type="text"
					placeholder="Search by title"
					value={searchText}
					onChange={handleSearchChange}
				/>
				<select value={selectedPriceRange} onChange={handlePriceRangeChange}>
					<option value="all">All Prices</option>
					<option value="lessThan15">Price &lt; $15</option>
					<option value="15to30">$15 - $30</option>
					<option value="greaterThan30">Price &gt; $30</option>
				</select>
			</div>
			<div className="books">
			{state.books.filter(filterBooksByTitle).filter(filterBooksByPrice).map((book) => (
				<div key={book.id} className="book-item">
					<img src={`${process.env.PUBLIC_URL}/${book.image || 'images/default-image.avif'}`}
					     alt={book.title}/>
					<div>
						<h3>{truncateTitle(book.title)}</h3>
						<p>{book.author}</p>
						<p>Price: $ {book.price.toFixed(2)}</p>
						<Link to={`/specific-book/${book.id}`}>View Details</Link>
					</div>
				</div>
			))}
			</div>
		</div>
	);
};

export default BookList;
