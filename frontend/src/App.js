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
import AdminLogin from './admin/pages/adminLogin';
import Index from './admin/pages/index';
import Layout from './admin/components/Layout';
import Workmen from './admin/pages/workmen';
import Estate from './admin/pages/estate';
import Users from './admin/pages/users';
import Houses from './pages/Houses';
import {House} from "./pages/House";
import {Services as AdminServices} from "./admin/pages/services";
import {Admin} from "./admin/components/Admin";
import {WorkRequest} from "./admin/pages/work-request";
import {ViewUser} from "./admin/pages/view-user";
import {ViewEstate} from "./admin/pages/view-estate";
import {ViewHouses} from "./admin/pages/view-houses";
import {ViewWorkRequest} from "./admin/pages/view-work-request";

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
          <Route path="/user/update/" element={<User content={UpdateUser} />} />
          <Route path="/user/change/password/" element={<User content={ChangePassword} />} />
          <Route path="/estate/houses/" element={<User content={Houses} />} />
          <Route path="/estate/house/:id/" element={<User content={House} />} />
          <Route path="/work/request/service/" element={<User content={Request} />} />
          <Route path="/work/requests/" element={<User content={Job} />} />
          <Route path="/admin/login/" element={<AdminLogin />} />
          <Route path="/admin/" element={<Admin content={Layout} />} >
            <Route index element={<Index />} />
            <Route path="workmen/" element={<Workmen />} />
            <Route path="estates/" element={<Estate />} />
            <Route path="estates/estate/:email/" element={<ViewEstate />} />
            <Route path="estates/estate/houses/:email/" element={<ViewHouses />} />
            <Route path="users/" element={<Users />} />
            <Route path="users/user/:email/" element={<ViewUser />} />
            <Route path="services/" element={<AdminServices />} />
            <Route path="users/work/requests/" element={<WorkRequest type={1}/>} />
            <Route path="estates/work/requests/" element={<WorkRequest type={2}/>} />
            <Route path="view/work/request/:type/:id/" element={<ViewWorkRequest />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
}

export default App;
