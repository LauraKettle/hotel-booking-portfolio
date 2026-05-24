import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Footer from "./components/footer";

function App(){
  return (
    <>
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/" element ={<Home />} />
      <Route path="/rooms" element ={<Rooms />} />
      <Route path="/rooms/:id" element ={<RoomDetails />} />
      <Route path="/search" element ={<Search />} />
      <Route path="/register" element ={<Register />} />
      <Route path="/login" element ={<Login/>} />
      <Route path="/dashboard" element ={<Dashboard />} />
      <Route path="/booking/:id" element ={<Booking />} />
    </Routes>

    <Footer />
      
      </BrowserRouter>
      </>
  );
}

export default App;
