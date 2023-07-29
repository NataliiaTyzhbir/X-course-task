import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/index';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { setState } = useContext(Context);

  const handleSignIn = () => {
    if (username.length >= 4 && username.length <= 16) {
      localStorage.setItem('username', username);
      setState((prevState) => ({ ...prevState, isAuthenticated: true }));
      navigate('/book-list');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div className="login-container">
      <img src={`${process.env.PUBLIC_URL}/images/avatar.png`} alt="User Face" />
      <label>
        <p>Username</p>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress} // Add the event listener here
        />
      </label>
      <button
        type="submit"
        onClick={handleSignIn}
        className={(username.length < 4 || username.length > 16) ? 'error-button' : 'normal-button'}
        disabled={username.length < 4 || username.length > 16}
      >
        Sign-In
      </button>
    </div>
  );
};

export default SignIn;
