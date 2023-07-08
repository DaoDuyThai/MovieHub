import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Container, Row, Col } from 'react-bootstrap';
import Home from "./screens/Home/Home";
import SearchMovie from "./screens/SearchMovie";
import Details from "./screens/Details/Details";
import MoviePlayer from "./screens/MoviePlayer";
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
          <Route path="/search" element={<SearchMovie />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/movieplayer" element={<MoviePlayer />} />
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
