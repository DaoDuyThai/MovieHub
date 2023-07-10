import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "../css/UserCard.css";

function UserCard({ user }) {
  const navigate = useNavigate();

  const handleActive = () => {
    const newUser = user;
    newUser.active = !user.active;
    fetch(`http://localhost:8000/account/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    navigate("/admin");

    user.active === true
      ? toast(`Active user ${user.name} successfully!!!`)
      : toast(`Inactive user ${user.name} successfully!!!`);

  };

  return (
    <div className="card">
      <img
        src={
          "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg"
        }
        alt={user.name}
      />
      <div className="cardContent">
        <h4>{user.name}</h4>
        <b>{user.email}</b>
        <p style={{ fontWeight: 'bold', color: 'black' }}>
          Gender: {user.gender === 'Nam' ? 
          <span style={{ fontWeight: 'bold', color: 'red' }}>{user.gender}</span> : <span style={{ fontWeight: 'bold', color: 'green' }}>{user.gender}</span>}
        </p>

        {user.active === true ? (
          <p onClick={handleActive} className="active">
            Active
          </p>
        ) : (
          <p onClick={handleActive} className="inactive">
            Inactive
          </p>
        )}
      </div>
    </div>
  );
}

export default UserCard;
