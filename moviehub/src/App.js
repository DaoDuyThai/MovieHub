import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Container, Row, Col } from 'react-bootstrap';
import Home from "./screens/Home/Home";
import Search from "./screens/Search/Search";
import Details from "./screens/Details/Details";
import Player from "./screens/Player/Player";
import ActiveDeactiveAccount from './screens/ActiveDeactiveAccount';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function App() {
  // const [account, setAccount] = useState();
  // console.log(account);
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/player/:id" element={<Player />} />
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/" element={<ForgotPassword />} /> */}
          {/* <Route path="/" element={<Register />} /> */}
          {/* <Route path="/" element={<UserProfile />} /> */}
          {/* <Route path="/" element={<EditProfile />} /> */}
          {/* <Route path="/" element={<Favourites />} /> */}
          {/* {account?.role === 0 && ( */}
          <Route path="/admin" element={<ActiveDeactiveAccount />} />
          {/* )} */}
        </Routes>
      </BrowserRouter>


    </>

  );
}

export default App;
