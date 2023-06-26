import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <Router> {/* Wrap your component tree with the Router component */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Movie App</Link>
                    
                </div>
            </nav>
        </Router>
    );
}
export default Footer;