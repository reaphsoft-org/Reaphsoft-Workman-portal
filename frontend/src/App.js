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
import './App.css';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import User from "./components/User";
import {RegistrationSuccess} from "./pages/registrationsuccess";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/register/success/" element={<RegistrationSuccess />} />
        <Route path="/user/" element={<PrivateRoute />} />
        <Route path="/user/profile/" element={<PrivateRoute />} />
        <Route path="/user/job/" element={<Job />} />
        <Route path="/user/request/" element={<User content={Request} />} />
        {/*<Route path="/user/update/" element={<UserProfile />} />*/}
        <Route path="/user/change/password/" element={<ChangePassword />} />
        <Route path="/user/dashboard/" element= {<User content={Dashboard} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
