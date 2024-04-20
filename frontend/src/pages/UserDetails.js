import React from 'react';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/sidebar';


const UserDetails = () => {
    const user = useAuth();
    return ( 

        <div></div>
    );
}
 
export default UserDetails;