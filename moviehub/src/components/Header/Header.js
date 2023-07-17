import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Header.css'; // Import custom CSS file for styling

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-background">
            <div className="container-fluid">
                <Link style={{fontWeight:"bold"}} className="navbar-brand text-light" to="/">
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
                    <Link className="nav-link" to="/login">
                        <button className='btn btn-outline-warning button-left'>Sign In</button>
                    </Link>
                    <Link className="nav-link" to="/signup">
                        <button className='btn btn-outline-warning button-left'>Sign Up</button>
                    </Link>
                    <Link className="nav-link" to="/userprofile">
                    <button style={{ margin: "10px" }} className="btn btn-outline-warning">Profile Settings</button>
                  </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
