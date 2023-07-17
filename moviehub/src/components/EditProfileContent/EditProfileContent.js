import { Link } from 'react-router-dom';
import "./EditProfileContent.css";
import { useEffect, useState } from "react";


const EditProfileContent = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: ""
    });
    const idU = sessionStorage.getItem('id');


    useEffect(() => {
        fetch(`http://localhost:8000/account/${idU}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error(error));
        console.log(idU);
    }, [idU]);


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/account/${idU}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                console.log("User updated successfully!");
                // Do something with the response data if needed
            })
            .catch(error => console.error(error));
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };
 
    return (
        <div className="edit-profile-content">
            <div className="edit">
                <img src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg" alt="Avatar" className="ava" />
                <form onSubmit={handleSubmit}>
                    <div className="input-paragraph">
                        <p>Name :
                            <input type="text" name="name" value={user.name} onChange={handleChange} /></p>
                        <p>Email :
                            <input type="text" name="email" value={user.email} onChange={handleChange} /></p>
                        <p>Gender :
                            <input type="text" name="gender" value={user.gender} onChange={handleChange} /></p>
                    </div>
                    <button style = {{  }} type="submit">Save</button>
                </form>
                <Link className="link" to="/userprofile">
                    <span>Cancel</span>
                </Link>
            </div>
        </div>
    );
};


export default EditProfileContent;

