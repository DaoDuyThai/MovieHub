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
        if(id!= null){
            fetch(`http://localhost:8000/account/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
            })
        }
        

    }, [id]);
    console.log(user);
    


    return (
        <>
            <div className='home-content-container'>
                <div>
                    <Row>
                        <Col>
                            <center><h1 className='text-warning' style={{ marginTop: "20px", fontWeight: "bold" }}>User Profile</h1></center>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <div className="row" >
                                    <center >
                                        <div className='card' style={{backgroundColor:"#00192", }}>
                                            <img
                                                src={`/assets/img/users/${user.id}.png`}
                                                className="img-fluid rounded-circle"
                                                alt="User Avatar"
                                                style={{width:"300px"}} 
                                            />
                                            
                                            <h4 className='text-warning' style={{margin:"30px", fontWeight:"bold"}}>{user.name}</h4>
                                            <p style={{fontWeight:"bold"}}>
                                                <strong className='text-light'>Email:</strong> <span className='text-warning'>{user.email}</span>
                                            </p>
                                            <p style={{fontWeight:"bold"}}>
                                                <strong className='text-light' >Gender:</strong> <span className='text-warning'>{user.gender}</span>
                                            </p>
                                        </div>
                                    </center>

                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <center><Link to={'/editprofile'}><button className='btn btn-warning' style={{margin:"30px"}}>Edit</button></Link></center>
                    </Row>
                </div>
            </div>


        </>

    );
}
export default UserProfileContent;
