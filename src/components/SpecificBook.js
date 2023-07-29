import React, {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Context} from '../context/index';

const SpecificBook = () => {
	const {bookId} = useParams();
	const {state, addToCart} = useContext(Context);

	const book = state.books.find((book) => book.id === parseInt(bookId));

	const [quantity, setQuantity] = useState(1);
	const [totalPrice, setTotalPrice] = useState(book.price);

	if (!book) {
		return <h2>Book not found</h2>;
	}

	const handleAddToCart = () => {
		if (isNaN(quantity)) {
			return;
		}
		addToCart({...book, count: quantity});
	};

	const handleQuantityChange = (event) => {
		let value = parseInt(event.target.value);
		value = Math.min(Math.max(1, value), 42);
		setQuantity(value);
		setTotalPrice(book.price * value);
	};

	const increaseQuantity = () => {
		const newValue = Math.min(quantity + 1, 42);
		setQuantity(newValue);
		setTotalPrice(book.price * newValue);
	};

	const decreaseQuantity = () => {
		const newValue = Math.max(quantity - 1, 1);
		setQuantity(newValue);
		setTotalPrice(book.price * newValue);
	};

	return (
		<div className="specific-book">
			<div className="specific-row">
				<img
					src={`${process.env.PUBLIC_URL}/${book.image || 'images/default-image.avif'}`}
					alt={book.title}
				/>
				<div>
					<h2>{book.title}</h2>
					<p>{book.author}</p>
				</div>
				<div className="specific-price">
					<p>Price: $ {book.price.toFixed(2)}</p>

					<div className="specific-q">
						<label htmlFor="quantity">Quantity:</label>
						<input
								type="number"
								id="quantity"
								min="1"
								max="42"
								value={quantity}
								onChange={handleQuantityChange}
							/>
						<div className="specific-quantity">
						<button onClick={decreaseQuantity}>-</button>
							<button onClick={increaseQuantity}>+</button>				
						</div>
					</div>
					<p>Total Price: $ {totalPrice.toFixed(2)}</p>
					<button onClick={handleAddToCart}>Add to Cart</button>
				</div>
			</div>
			<p>{book.description}</p>
		</div>
	);
};

export default SpecificBook;
