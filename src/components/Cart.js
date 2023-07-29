import React, {useContext} from 'react';
import {Context} from '../context/index';

const Cart = () => {
	const {state, setState, removeFromCart} = useContext(Context);

	const calculateTotalPrice = () => {
		let total = 0;
		state.cart.forEach((book) => {
			total += book.price * book.count;
		});
		return total;
	};

	const handlePurchase = () => {
		// Perform purchase logic here (e.g., sending the cart data to a server)
		state.cart.forEach((book) => {
			console.log(`Purchased ${book.count} copies of ${book.title} by ${book.author}`);
		});
		setState((state) => ({...state, cart: []}));
	};

	return (
		<div className="cart">
			{state.cart.map((book) => (
				<div key={book.id} className="list-item">
					<img className="list-item-image"
					     src={`${process.env.PUBLIC_URL}/${book.image || 'images/default-image.avif'}`}
					     alt={book.title}/>
					<div className="list-item-info">
		                <span>
		                    <h3>{book.title}</h3>
		                    <small>{book.author}</small>
		                </span>
						<span style={{display: "flex"}}>
		                    <span>
		                        <b>Price:</b> $ {book.price} <br/>
		                    </span>
							{book.count > 1 && (
								<>
		                            <span style={{marginLeft: "1rem"}}>
		                                <b>Count: </b>x{book.count}
		                            </span>
									<span style={{marginLeft: "1rem"}}>
		                                <b>Total:</b> $ {(book.price * book.count).toFixed(2)}
		                            </span>
								</>
							)}
		                </span>
						<div>
							<button
								onClick={() => removeFromCart(book)}
								className="remove-btn"
							>
								delete
							</button>
						</div>
					</div>
				</div>
			))}
			{state.cart.length > 0 && (
				<div className="cart-summary">
					<p>Total Price: $ {calculateTotalPrice().toFixed(2)}</p>
					<button onClick={handlePurchase} disabled={state.cart.length === 0}>
						Purchase
					</button>
				</div>
			)}
			{state.cart.length === 0 && (
				<div className="cart-empty">
					<h2>Your cart is empty</h2>
					<button disabled>
						Purchase
					</button>
				</div>
			)}
		</div>
	);
};

export default Cart;
