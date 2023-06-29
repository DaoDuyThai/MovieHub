import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/">MOVIE<span className='text-warning'>HUB</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <div className="nav-link " to="/"><button className='btn btn-outline-warning'>Home</button></div>
                            <div className="nav-link " to="/"><button className='btn btn-outline-warning'>New Movies</button></div>
                            <div className="nav-link " to="/"><button className='btn btn-outline-warning'>New Series</button></div>
                            <div className="nav-link " to="/"><button className='btn btn-outline-warning' ><Link to ="/admin" style={{color: "#ffc107", textDecoration: "none"}}>Admin</Link></button></div>
                        </div>
                    </div>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-warning" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        
    );
};

export default Header;
