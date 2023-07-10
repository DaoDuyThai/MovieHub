import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Container, Row, Col } from 'react-bootstrap';
import ActiveDeactiveAccount from './screens/Admin/ActiveDeactiveAccount';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [account, setAccount] = useState();
  // console.log(account);
  return (
    <>

      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchMovie />} />
          <Route path="/moviedetails" element={<MovieDetails />} />
          <Route path="/movieplayer" element={<MoviePlayer />} /> */}
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
        {/* <Footer /> */}
      </BrowserRouter>


    </>

  );
}

export default App;
