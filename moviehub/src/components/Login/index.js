import { useState, useEffect } from "react";
import "./LoginContent.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function LoginContent() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [listAccount, setListAccount] = useState([]);
    const [isUndifined, setIsUndifined] = useState(null);
    const [isBlock, setIsBlock] = useState(false)
    // const { account, setAccount } = useContext(AccountContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch(`http://localhost:8000/account`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setListAccount(data);
        });
    }, []);
  
    const handleLogin = () => {
      const account = listAccount.find(
        (a) => a.email === mail && a.password === password
      );
      if (account === undefined) {
        setIsUndifined(false);
        toast('Username or Password is Incorrect!!!')
      } else if(account.active !== false){
        // setAccount(account);
        navigate("/");
        toast("Login successfully!!");
      }else{
        setIsBlock(true)
        toast('This account is Blocked!!')
      }
    };
  
    return (
      <div className="boc">
      <div className="container">
        <div className="loginContent">
          <div className="leftContent">
            <h1>Đăng Nhập</h1>
            <img src="https://scontent-xsp1-3.xx.fbcdn.net/v/t1.6435-9/65120132_477890072962556_133111881295462400_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=mGF0BDlL5rkAX9_VSIn&_nc_ht=scontent-xsp1-3.xx&oh=00_AfDAbHIIbBTlWOzstgzZU2JSk_5iLeFaXFAtG255tSOnRQ&oe=64BFCBDD" />
            <h2>Privacy policy {"&"} Term of service</h2>
          </div>
          <div className="rightContent">
            <div className="input">
              <label htmlFor="mail">Email: </label>
              <input
                placeholder="Enter mail address "
                id="mail"
                onChange={(e) => setMail(e.target.value)}
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
            {isUndifined === false ? (
              <p
                style={{ color: "#f9004d", textAlign: "left", fontSize: "12px" }}
              >
                Incorrect Email or Password
              </p>
            ) : (
              ""
            )}
            {isBlock === true?<p
                style={{ color: "#f9004d", textAlign: "left", fontSize: "12px" }}
              >
                Account is Blocked
              </p>:''}
            <div className="handle">
              <button onClick={handleLogin}>Đăng nhập</button>
              <a className="remember">Quên mật khẩu</a>
            </div>
            <div className="register">
              <b>Bạn chưa có tài khoản? </b>
              <Link
                style={{ color: "#f9004d", textDecoration: "none" }}
                className="signup"
                to="/register"
              >
                <p>Đăng ký</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default LoginContent;