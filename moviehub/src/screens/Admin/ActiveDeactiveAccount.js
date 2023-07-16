import React from "react";
import LeftDashboard from "../../components/Admin/leftDashboard";
import RightDashboard from "../../components/Admin/rightDashboard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ActiveDeactiveAccount.css";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


function ActiveDeactiveAccount() {
    const [username, setUsername] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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



    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem('isLoggedIn');
        const storedUsername = sessionStorage.getItem('username');

        if (loggedInStatus === 'true' && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
    }, []);

    return (
        <>
            <Header />
            <React.Fragment>
                {isLoggedIn == true && role == 1 ? (
                    <div style={{ display: 'flex' }}>
                        <LeftDashboard />
                        <RightDashboard />
                    </div>
                ) : (
                    <>
                        <div style={{ height: "455px", padding: "100px" }} className="con">
                            <center>
                                <h1 style={{fontWeight:"bold"}} className="text-warning">
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

            </React.Fragment>
            <Footer />
        </>
    )
}
export default ActiveDeactiveAccount