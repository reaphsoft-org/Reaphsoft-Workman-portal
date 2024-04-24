import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { AuthProvider } from "./components/AuthContext";
import Job from './pages/Job';
import Request from './pages/Request';
import './App.css';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import User from "./components/User";
import { RegistrationSuccess } from "./pages/registrationsuccess";
import UserProfile from "./pages/UserProfile";
import UpdateUser from "./pages/update_user";
import Services from './components/Service';
import AboutS from './components/about';
import Contact from './components/contact';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service/" element={<Services />} />
        <Route path="/about/" element={<AboutS />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/register/success/" element={<RegistrationSuccess />} />
        <Route path="/user/" element={<User content={Dashboard} />} />
        <Route path="/user/profile/" element={<User content={UserProfile} />} />
        <Route path="/user/job/" element={<User content={Job} />} />
        <Route path="/user/request/" element={<User content={Request} />} />
        <Route path="/user/update/" element={<User content={UpdateUser} />} />
        <Route path="/user/change/password/" element={<User content={ChangePassword} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
