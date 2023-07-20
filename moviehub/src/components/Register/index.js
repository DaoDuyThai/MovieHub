import { useEffect, useState } from "react";
import "./RegisterContent.css";
import { Link, useNavigate } from "react-router-dom";
// import { AccountContext } from "../../App"; 
import { toast } from "react-toastify";

function RegisterContent() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("Male");
  const [accounts, setAccounts] = useState([]);
  // const { setAccount } = useContext(AccountContext);
  const [isExist, setIsExist] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/account`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setAccounts(data));
  }, []);

  const handleRegister = () => {
    if (mail !== "" && password !== "" && fullname !== "") {
      const valid = accounts.findIndex((e) => e.email === mail);
      if (valid !== -1) {
        setIsExist(true);
        toast(`Email ${mail} is Exist!!!`)
      } else {
        const newId = accounts[accounts.length - 1].id + 1;
        const newAccount = {
          id: newId,
          name: fullname,
          email: mail,
          password: password,
          gender: gender,
          role: 2,
          active: true
        };
        fetch(`http://localhost:8000/account`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccount),
        });
        // setAccount(newAccount);
        navigate("/");
        toast('Sign Up Successfully!!!')
      }
    } else {
      toast('One More Information is Blank!!!')
    }
  };

  return (
    <div className="res">
      <div className="container">
        <div className="registerContent">
          <div className="leftRegister">
            <h1>Sign Up</h1>
            <img src="https://hacoled.com/wp-content/uploads/2022/01/anh-nen-one-piece-3.jpg" alt="" />
            <h2>Privacy policy {"&"} Term of service</h2>
          </div>
          <div className="rightContent">
            <div className="input">
              <label
                htmlFor="mail"
                style={{ color: isExist === true ? "#f9004d" : "" }}
              >
                Email:{" "}
              </label>
              <input
                placeholder="Enter mail address "
                id="mail"
                type="email"
                style={{
                  borderBottom: isExist === true ? "1px solid #f9004d " : "",
                }}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            {isExist === true ? (
              <p style={{ color: isExist === true ? "#f9004d" : "" }}>
                Your Email is Exist!!!
              </p>
            ) : (
              ""
            )}
            <div className="input">
              <label htmlFor="fullname">Full Name: </label>
              <input
                placeholder="Enter Your FullName "
                id="fullname"
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="password">Password:</label>
              <input
                placeholder="Password"
                type={"password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input">
              <div className="gender">
                <label>Gender:</label>
              </div>
              <div className="genderdetail">
                <input
                  placeholder="gender"
                  type={"radio"}
                  name="gender"
                  value="Male"
                  checked={gender === "Male" ? true : false}
                  onChange={(e) => setGender(e.target.value)}
                />
                <p>Male</p>{" "}
                <input
                  placeholder="gender"
                  name="gender"
                  type={"radio"}
                  value="Female"
                  checked={gender === "Female" ? true : false}
                  onChange={(e) => setGender(e.target.value)}
                />
                <p>Female</p>
              </div>
            </div>
            <div className="handle">
              <button onClick={handleRegister}>Đăng ký</button>
            </div>
            <div className="login">
              <b>Have an account?</b>
              <Link
                style={{ color: "#f9004d", textDecoration: "none" }}
                className="signup"
                to="/login"
              >
                <p>Đăng nhập</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RegisterContent;
