import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./EditProfileContent.css";
import { useNavigate } from 'react-router-dom';

const EditProfileContent = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const newUser = user;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/account`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setName(data.name);
                setEmail(data.email);
                setGender(data.gender);
            });
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const saveProfile = () => {
        fetch(`http://localhost:8000/account/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });
        navigate("/userprofile");
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-profile-content">
            <div className="edit">
                <img src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg" alt="Avatar" className="ava" />
                <div className="input-paragraph">
                    <p>Name :
                        <input type="text" name="username" value={name} onChange={handleNameChange} /></p>
                    <p>Email :
                        <input type="text" name="useremail" value={email} onChange={handleEmailChange} /></p>
                    <p>Gender :
                        <input type="text" name="usergender" value={gender} onChange={handleGenderChange} /></p>
                </div>
                <div>
                </div>
                <Link className="link" to="/userprofile">
                    <span onClick={saveProfile}>Save</span>
                </Link>
            </div>
        </div>
    );
};

export default EditProfileContent;