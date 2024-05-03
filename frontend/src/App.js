import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { AuthProvider } from "./components/AuthContext";
import Job from './pages/Job';
import Request from './pages/Request';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import User from "./components/User";
import { RegistrationSuccess } from "./pages/registrationsuccess";
import UserProfile from "./pages/UserProfile";
import UpdateUser from "./pages/update_user";
import Services from './components/Service';
import AboutS from './components/about';
import Contact from './components/contact';
import AdminLogin from './admin/pages/login';
import Index from './admin/pages/index';
import Layout from './admin/components/Layout';
import Skill from './admin/pages/skill';
import Estate from './admin/pages/estate';
import Client from './admin/pages/client';
import UserProvider from './components/UserContext';
import AdminProvider from './components/AdminContext';
import House from './pages/Houses';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AdminProvider>
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
          <Route path="/user/house/" element={<User content={House} />} />
          <Route path="/user/job/" element={<User content={Job} />} />
          <Route path="/user/request/" element={<User content={Request} />} />
          <Route path="/user/update/" element={<User content={UpdateUser} />} />
          <Route path="/user/change/password/" element={<User content={ChangePassword} />} />
          <Route path="/admin/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Layout />} >
            <Route index element={<Index />} />
            <Route path="skill" element={<Skill />} />
            <Route path="estate" element={<Estate />} />
            <Route path="client" element={<Client />} />
          </Route>
        </Routes>
        </AdminProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
