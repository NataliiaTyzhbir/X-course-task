import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Context} from '../context/index';

export default function Header() {
	const name = 'Tyzhbir Nataliia';
	const username = localStorage.getItem('username');
	const navigate = useNavigate();
	const {setState} = useContext(Context);

	const handleSignOut = () => {
		localStorage.removeItem('username');
		setState(prevState => ({...prevState, isAuthenticated: false}));
		navigate('/sign-in');
	};

	return (
		<header>
			<Link to={'/book-list'}>X-course task / {name}</Link>
			{username && (
				<>
					<div className="header-buttons">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a onClick={() => navigate('/cart')}><img src={`${process.env.PUBLIC_URL}/images/cart.svg`}
						                                          alt="User Face"/></a>
						<button type="button" onClick={handleSignOut}>Sign Out</button>
						<div className="header-user">
							<img src={`${process.env.PUBLIC_URL}/images/avatar.png`} alt="User Face"/>
							<h1>{username}</h1>
						</div>
					</div>
				</>

			)}
		</header>
	);
}
