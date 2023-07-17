import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';

import './EditProfileContent.css';

const EditProfileContent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [id, setId] = useState('');
    const [role, setRole] = useState('');
    const [user, setUser] = useState([]);


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

    useEffect(() => {
        fetch('http://localhost:8000/account/' + id)
            .then(res => res.json())
            .then(json => setUser(json));
    }, []);

    console.log(user);
    return (
        <>
            <div className="home-content-container">

            </div>
        </>

    );
}
export default EditProfileContent;
