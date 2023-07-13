import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { Container, Row, Col } from 'react-bootstrap';
import Home from "./screens/Home/Home";
import Search from "./screens/Search/Search";
import Details from "./screens/Details/Details";
import Player from "./screens/Player/Player";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Movies from './screens/Movies/Movies';
import TVShows from "./screens/TVShows/TVShows";
import ActiveDeactiveAccount from './screens/Admin/ActiveDeactiveAccount';
import UserProfile from './screens/UserProfile/UserProfile';
import EditProfile from './screens/EditProfile/EditProfile'
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshow" element={<TVShows />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          {/* <Route path="/" element={<Favourites />} /> */}
          {/* {account?.role === 0 && ( */}
          <Route path="/admin" element={<ActiveDeactiveAccount />} />

        </Routes>
       <ToastContainer/>
      </BrowserRouter>


    </>

  );
}

export default App;
