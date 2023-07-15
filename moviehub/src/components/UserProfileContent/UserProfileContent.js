import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./UserProfileContent.css"; // Import file CSS

const UserProfileContent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/account`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => setUser(data))
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="user-profile-content">
        <div className="profile">
          <img
            src={
              "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg"
            }
            alt={user.name}
          />

          <p><strong>Name : </strong> {user.name}</p>
          <p><strong>Email : </strong> {user.email}</p>
          <p><strong>Gender : </strong> {user.gender}</p>

          <Link className="link" to="/editprofile">
            <span>Edit</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserProfileContent;