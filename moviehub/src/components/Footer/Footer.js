import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; // Import custom CSS file for styling

const Footer = () => {
    return (
        <footer className="footer navbar-background">
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Link className="navbar-brand nav-link-text text-light" to="/">
                            MOVIE<span className="text-warning">HUB</span>
                        </Link>
                        <ul className="footer-links">
                            <li><Link to="/">Popular Movies</Link></li>
                            <li><Link to="/">Top Rated Movies</Link></li>
                            <li><Link to="/">Upcoming Movies</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        
                        <br></br>
                        
                        <p className="quote text-warning">"The cinema is a mirror that makes us face our questions."<br />- Alejandro Gonzalez Inarritu</p>
                    </div>
                    <div className="col-md-3">
                        <h4 className='text-warning'>Contact</h4>
                        <ul className="footer-links">
                            <li>Email: moviehub@gmail.com</li>
                            <li>Phone: 123-456-7890</li>
                            <li className='text-warning'><Link to="/">Visit us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
