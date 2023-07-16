import { Link } from 'react-router-dom';
import "./EditProfileContent.css";
import { useNavigate } from 'react-router-dom';

const EditProfileContent = ({user}) => {
    
    const navigate = useNavigate();

    const saveProfile = () => {
        const newUser = user;
        fetch(`http://localhost:8000/account/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });
        navigate("/userprofile");
    };
    return (
        <div className="edit-profile-content">
            <div className="edit">
                <img src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg" alt="Avatar" className="ava" />
                <div className="input-paragraph">
                    <p>Name :
                        <input type="text" name="username" value={user.name}  /></p>
                    <p>Email :
                        <input type="text" name="useremail" value={user.email}  /></p>
                    <p>Gender :
                        <input type="text" name="usergender" value={user.gender} /></p>
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