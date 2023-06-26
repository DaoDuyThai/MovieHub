import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Router> {/* Wrap your component tree with the Router component */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/">Movie<span className='text-warning'>Hub</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link " to="/"><button className='btn btn-outline-warning'>Home</button></Link>
                            <Link className="nav-link " to="/"><button className='btn btn-outline-warning'>New Movies</button></Link>
                            <Link className="nav-link " to="/"><button className='btn btn-outline-warning'>New Series</button></Link>
                        </div>
                    </div>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-warning" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </Router>
    );
};

export default Header;
