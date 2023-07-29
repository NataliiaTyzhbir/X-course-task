import React, {createContext, useContext, useReducer} from 'react';

// Define the initial state for the cart
const initialState = {
	cartItems: [],
};

// Create the CartContext
const CartContext = createContext();

// Create the CartProvider
export const CartProvider = ({children}) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	return (
		<CartContext.Provider value={{state, dispatch}}>
			{children}
		</CartContext.Provider>
	);
};

// Custom hook to access the cart state and dispatch
export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

// Cart reducer function to handle cart actions
const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				cartItems: [...state.cartItems, action.payload],
			};
		case 'CLEAR_CART':
			return {
				...state,
				cartItems: [],
			};
		default:
			return state;
	}
};
