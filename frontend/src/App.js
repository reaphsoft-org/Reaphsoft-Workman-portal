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
import UserDetails from './pages/UserDetails'
import ChangePassword from './pages/ChangePassword';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/user/" element={<PrivateRoute />} />
        <Route path="/user/job/" element={<Job />} />
        <Route path="/user/request/" element={<Request />} />
        <Route path="/user/update/" element={<UserProfile />} />
        <Route path="/user/changePassword/" element={<ChangePassword />} />
        <Route path="/user/dashboard" element= {<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
