import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
