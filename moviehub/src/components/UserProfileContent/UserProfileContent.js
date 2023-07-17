import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./UserProfileContent.css"; // Import file CSS




const UserProfileContent = () => {




  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState('');
  // const [id, setId] = useState('');
  // const [role, setRole] = useState('');
  const [user, setUsers] = useState([]);
  const idU = sessionStorage.getItem('id');


  // useEffect(() => {
  // const loggedInStatus = sessionStorage.getItem('isLoggedIn');
  // const storedUsername = sessionStorage.getItem('username');


  // const role = sessionStorage.getItem('role');
  // if (loggedInStatus === 'true' && storedUsername) {
  // setIsLoggedIn(true);
  // setUsername(storedUsername);
  //   setId(id);
  // setRole(role);
  // }
  // }, []);


  // const handleActive = () => {
  //   const newUser = user;  
  //   fetch(`http://localhost:8000/account/${user.id}`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newUser),
  //   });
  // };






  useEffect(() => {
    fetch(`http://localhost:8000/account/${idU}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
    console.log(idU);
  }, []);






  return (
    <div>
      <div className="user-profile-content">
        <div className="profile">
          <img
            src={
              "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg"
            }
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
