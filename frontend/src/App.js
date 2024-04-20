import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Job from './pages/Job';
import Request from './pages/Request';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserProfile from './pages/UserProfile';
import UserDetails from './pages/userDetails';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/user/" element={<PrivateRoute />} />
        <Route path="/job/" element={<Job />} />
        <Route path="/request/" element={<Request />} />
        <Route path="/profile/" element={<UserProfile />} />
        <Route path='/details/' element={<UserDetails />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
