import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import {AuthProvider} from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Job from './pages/Job';

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
        <Route path="/user/" element={<PrivateRoute />} />
        <Route path="/job/" element={<Job />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
