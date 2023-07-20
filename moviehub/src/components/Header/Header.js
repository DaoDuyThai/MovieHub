import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Header.css'; // Import custom CSS file for styling

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [id, setId] = useState('');
  const [role, setRole] = useState('');

  const handleToggle = () => {
    setProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    const storedUsername = sessionStorage.getItem('username');
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (loggedInStatus === 'true' && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setId(id);
      setRole(role);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    window.location.reload();
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
            {role === '1' ? username && (<>
              <Link className="nav-link" to="/admin">
                <span className="nav-link-text">Admin</span>
              </Link>
            </>
            ) :
              (<>
              </>
              )}

          </div>
        </div>
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <>
              <div className="dropdown">
                <p
                  className="text-light m-0 mr-2 dropdown-toggle"
                  onClick={handleToggle}
                  role="button"
                >
                  Hello,<span className='text-warning' style={{ fontWeight: "bold" }}> {username}</span>
                </p>
                <div style={{
                  position: "absolute",
                  top: "100%",
                  backgroundColor: "#125665",
                  minWidth: "159px",
                  left: "50%",
                  transform: "translateX(-70%)",
                  zIndex: 999,
                }} className={`dropdown-menu${isProfileOpen ? ' show' : ''} text-center`}>
                  <img style={{ width: "51px", height: "51px", marginTop: "30px" }} className='rounded-circle' src={`/assets/img/users/${id}.png`}></img>
                  <p style={{ marginTop: "10px" }} className='text-warning'>{username}</p>
                  <Link to={'/userprofile'}>
                    <button style={{ margin: "10px" }} className="btn btn-outline-warning">Profile Settings</button>
                  </Link>
                  <br></br>
                  <button className=" btn btn-danger button-left" onClick={handleLogout}>Logout</button>
                </div>
              </div>

            </>


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

        </div>
      </div>
    </nav>
  );
};

export default Header;