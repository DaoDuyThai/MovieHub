import { useEffect, useState } from "react";
import UserCard from './UserCard'
import "../Admin/RightDashboard.css";

function RightDashboard() {
  const [users, setUser] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/account`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => setUser(data))
  }, [])

  return (
    <div className='userInfo'>
      <h1 className="text-white" style={{padding:"20px"}}>  There are <span style={{ color: '#ffc107' }}>{users.length}</span> accounts </h1>
      <hr />
      <div className='content'>
        {users.map(user => {
          return (
            <UserCard key={user.id} user={user} />
          )
        })}
      </div>
    </div>
  )
}

export default RightDashboard;
