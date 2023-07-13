import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Header.css'; // Import custom CSS file for styling

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    const storedUsername = sessionStorage.getItem('username');
    if (loggedInStatus === 'true' && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-background">
      <div className="container-fluid">
        <Link style={{ fontWeight: 'bold' }} className="navbar-brand text-light" to="/">
          MOVIE<span className="text-warning">HUB</span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <Link className="nav-link" to="/movies">
              <span className="nav-link-text">Movies</span>
            </Link>
            <Link className="nav-link" to="/tvshow">
              <span className="nav-link-text">TV Shows</span>
            </Link>
            <Link className="nav-link" to="/">
              <span className="nav-link-text">About us</span>
            </Link>
            <Link className="nav-link" to="/admin">
              <span className="nav-link-text">Admin</span>
            </Link>
          </div>
        </div>
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <p className="text-light m-0 mr-2">Hello, {username}</p>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                <button className="btn btn-outline-warning button-left">Sign In</button>
              </Link>
              <Link className="nav-link" to="/register">
                <button className="btn btn-outline-warning button-left">Sign Up</button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <button className="btn btn-outline-warning button-left" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;