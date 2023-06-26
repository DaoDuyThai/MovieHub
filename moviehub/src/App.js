import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import SearchMovie from "./screens/SearchMovie";
import MovieDetails from "./screens/MovieDetails";
import MoviePlayer from "./screens/MoviePlayer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchmovie" element={<SearchMovie />} />
          <Route path="/moviedetails" element={<MovieDetails />} />
          <Route path="/movieplayer" element={<MoviePlayer />} />
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/" element={<ForgotPassword />} /> */}
          {/* <Route path="/" element={<Register />} /> */}
          {/* <Route path="/" element={<UserProfile />} /> */}
          {/* <Route path="/" element={<EditProfile />} /> */}
          {/* <Route path="/" element={<Favourites />} /> */}
          {/* <Route path="/" element={<ActiveDeactiveAccount />} /> */}
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>

  );
}

export default App;
