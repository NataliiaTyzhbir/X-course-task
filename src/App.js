import {Navigate, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import SignIn from './components/SignIn'
import BookList from './components/BookList'
import SpecificBook from './components/SpecificBook'
import Cart from './components/Cart'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import {useEffect, useState} from 'react'
import books from './books.json'
import {Context} from './context/index'

function App() {
	const [state, setState] = useState({
		books: books,
		cart: JSON.parse(localStorage.getItem('cart')) || [],
		isAuthenticated: !!localStorage.getItem('username'),
	});

	const addToCart = (book) => {
		setState((state) => ({
			...state,
			// cart: [...state.cart, book],
			cart: state.cart.some((item) => item.id === book.id)
				? state.cart.map((item) => item.id === book.id ? {...item, count: item.count + book.count} : item)
				: [...state.cart, book],
		}));
	};

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	const removeFromCart = (bookToRemove) => {
		setState({
			...state,
			cart: state.cart.filter((book) => book.id !== bookToRemove.id),
		});
	};

	return (
		<div className='App'>
		<Context.Provider value={{state, setState, addToCart, removeFromCart}}>
		<Header/>
		<Routes>
			<Route path='/' element={state.isAuthenticated ? <BookList/> : <Navigate to="/sign-in"/>}/>
			<Route path='/sign-in' element={<SignIn/>}/>
			<Route path='/book-list' element={state.isAuthenticated ? <BookList/> : <Navigate to="/sign-in"/>}/>
			<Route path='/specific-book/:bookId'
			       element={state.isAuthenticated ? <SpecificBook/> : <Navigate to="/sign-in"/>}/>
			<Route path='/cart' element={state.isAuthenticated ? <Cart/> : <Navigate to="/sign-in"/>}/>
			<Route path='about' element={<h1>About page</h1>}/>
			<Route path='*' element={<NotFound/>}/>
		</Routes>
		<Footer/>
		</Context.Provider>
		</div>
	);
}

export default App;
