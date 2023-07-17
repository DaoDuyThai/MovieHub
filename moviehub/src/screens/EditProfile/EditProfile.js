import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EditProfileContent from '../../components/EditProfileContent/EditProfileContent';
import UserProfileContent from '../../components/UserProfileContent/UserProfileContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';


const UserProfile = () => {
    
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [username, setUsername] = useState('');
        const [isProfileOpen, setProfileOpen] = useState(false);
        const [id, setId] = useState('');
        const [role, setRole] = useState('');
    
    
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

    return (
        <>
            
            <Header />
            {isLoggedIn == true ? (
                <div >
                                <EditProfileContent />
                </div>
            ) : (
                <>
                    <div style={{ height: "455px", padding: "100px" }} className="con">
                        <center>
                            <h1 style={{ fontWeight: "bold" }} className="text-warning">
                                You don't have permission to visit this site!
                            </h1>
                            <br></br>
                            <Link to="/login">
                                <button className="btn btn-outline-warning">Login again</button>

                            </Link>
                        </center>


                    </div>
                </>
            )}
            <Footer />
        </>

    );
}
export default UserProfile;