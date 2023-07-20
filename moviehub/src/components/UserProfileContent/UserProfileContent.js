import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';

import './UserProfileContent.css';

const UserProfileContent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [id, setId] = useState(null);
    const [role, setRole] = useState('');
    const [user, setUser] = useState({});
    const [isEditMode, setIsEditMode] = useState(false); // New state for edit mode

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
        if (id !== null) {
            fetch(`http://localhost:8000/account/${id}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                });
        }
    }, [id]);

    const handleEditClick = () => {
        setIsEditMode(true);

    };

    const handleFormSubmit = event => {
        event.preventDefault();

        // Extract the form data
        const { name, email, gender } = event.target.elements;

        // Create an updated user object
        const updatedUser = {
            ...user,
            name: name.value,
            email: email.value,
            gender: gender.value,
        };

        // Send a request to update the user data on the server
        fetch(`http://localhost:8000/account/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(res => res.json())
            .then(data => {
                // Handle the response from the server if needed
                console.log('User data updated successfully!', data);
                setUser(updatedUser); // Update the local state with the new data
                setIsEditMode(false); // Switch back to view mode
                // Update the stored username in sessionStorage
                sessionStorage.setItem('username', updatedUser.name);

                // Reload the page
                window.location.reload();

            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    return (
        <>
            <div className='home-content-container'>
                <div>
                    <Row>
                        <Col>
                            <center>
                                <h1 className='text-warning' style={{ marginTop: '20px', fontWeight: 'bold' }}>
                                    User Profile
                                </h1>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <div className='row'>
                                    <center>
                                        <div className='card' style={{ backgroundColor: '#00192' }}>
                                            <img
                                                src={`/assets/img/users/${user.id}.png`}
                                                className='img-fluid rounded-circle'
                                                alt='User Avatar'
                                                style={{ width: '300px' }}
                                            />

                                            {isEditMode ? (
                                                // Render the form with editable fields
                                                <Form onSubmit={handleFormSubmit}>
                                                    <Form.Group controlId='formName'>
                                                        <Form.Label className='text-warning'>Name</Form.Label>
                                                        <Form.Control type='text' name='name' style={{backgroundColor: "white"}} defaultValue={user.name} required />
                                                    </Form.Group>

                                                    <Form.Group controlId='formEmail'>
                                                        <Form.Label className='text-warning' >Email</Form.Label>
                                                        <Form.Control type='email' name='email' defaultValue={user.email} required />
                                                    </Form.Group>

                                                    <Form.Group controlId='formGender'>
                                                        <Form.Label className='text-warning'>Gender</Form.Label>
                                                        <div>
                                                            <Form.Check
                                                                type='radio'
                                                                name='gender'
                                                                id='male'
                                                                label='Male'
                                                                value='Male'
                                                                defaultChecked={user.gender === 'Male'}
                                                                required className='text-light'
                                                            />
                                                            <Form.Check
                                                                type='radio'
                                                                name='gender'
                                                                id='female'
                                                                label='Female'
                                                                value='Female'
                                                                defaultChecked={user.gender === 'Female'}
                                                                required className='text-light'
                                                            />
                                                        </div>
                                                    </Form.Group>

                                                    <Button variant='primary' type='submit'>
                                                        Save Changes
                                                    </Button>
                                                </Form>
                                            ) : (
                                                // Render the user info in view mode
                                                <>
                                                    <h4 className='text-warning' style={{ margin: '30px', fontWeight: 'bold' }}>
                                                        {user.name}
                                                    </h4>
                                                    <p style={{ fontWeight: 'bold' }}>
                                                        <strong className='text-light'>Email:</strong>{' '}
                                                        <span className='text-warning'>{user.email}</span>
                                                    </p>
                                                    <p style={{ fontWeight: 'bold' }}>
                                                        <strong className='text-light'>Gender:</strong>{' '}
                                                        <span className='text-warning'>{user.gender}</span>
                                                    </p>
                                                </>
                                            )}

                                            {!isEditMode && (
                                                <center>
                                                    <button className='btn btn-warning' style={{ margin: '30px' }} onClick={handleEditClick}>
                                                        Edit
                                                    </button>
                                                </center>
                                            )}
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default UserProfileContent;