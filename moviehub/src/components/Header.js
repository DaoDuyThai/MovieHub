import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Router> {/* Wrap your component tree with the Router component */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Movie App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/searchmovie">Search Movie</Link>
                            <Link className="nav-link" to="/">New Movies</Link>
                            <Link className="nav-link" to="/">New Series</Link>
                            
                        </div>
                    </div>
                </div>
            </nav>
        </Router>
    );
};

export default Header;
