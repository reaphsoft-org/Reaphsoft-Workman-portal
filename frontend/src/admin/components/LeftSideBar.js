import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../../components/AuthContext";
import {showAlert} from "../../utils/alert";
import logo from "../components/logo.png"
import {BACKEND_DOMAIN} from "../../utils/konstants";

const LeftSideBar = () => {
    const userAuth = useAuth();
    const [user, setUser] = useState({
    email: '',
    fullname: '',
    is_active: false,
    photoURL: '',
    date_joined: 'NA',
    last_visited: 'NA',
  });
    useEffect(() => {
        fetch(`${BACKEND_DOMAIN}/admin/m/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userAuth.admin.token,
            'Content-Type': 'application/json'
          }
        }).then(res =>{
            if (res.status === 401){
                userAuth.logoutAdmin();
                window.location.href = "/admin/";
                return;
            }
            return res.json();
        }).then(data => {
            if (!data){
                showAlert(3, 'Unable to get admin account details', 'Error');
            }else {
                setUser(data);
            }
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        });
    }, [userAuth, userAuth.admin.token]);
    return ( 
        <aside id="leftsidebar" className="sidebar">
            <div className="navbar-brand">
                <button className="btn-menu ls-toggle-btn" type="button"><i className="zmdi zmdi-menu"></i></button>
                <a href="/">
                    <img src={logo} width="75" alt="App Logo" />
                    <span className="m-l-10 text-decoration-none"></span></a>
            </div>
            <div className="menu">
                <ul className="list">
                    <li>
                        <div className="user-info pt-3">
                            <a className="image" href="/admin/dashboard/">
                                {/* <img src="../asset/image/bha.jpg" alt="User" /> */}
                            </a>
                            <div className="detail py-3">
                                <h4>{user.fullname}</h4>
                                <small>{user.email}</small>
                            </div>
                        </div>
                    </li>
                    <li className="active open">
                        <Link to="/admin/" className="link-offset-2">
                            <i className="zmdi zmdi-home"></i><span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/admin/users/" className="link-offset-2"><i className="zmdi zmdi-folder"></i><span>Users</span></Link>
                    </li>
                    <li className="">
                        <Link to="/admin/estates/" className="link-offset-2"><i className="zmdi zmdi-flower"></i><span>Estates</span></Link>
                    </li>
                    <li className="">
                        <a href="/admin/services/" className="link-offset-2"><i className="zmdi zmdi-swap-alt"></i><span>Services</span></a>
                    </li>
                    <li>
                        <Link to="/admin/workmen/" className="link-offset-2">
                            <i className="zmdi zmdi-assignment"></i><span>Workmen</span>
                        </Link>
                    </li>
                    <li>
                        <a href="/admin/users/work/requests/" className="link-offset-2"><i className="zmdi zmdi-blogger"></i><span>User Work Requests</span></a>
                    </li>
                    <li>
                        <a href="/admin/estates/work/requests/" className="link-offset-2"><i className="zmdi zmdi-blogger"></i><span>Estate Work Requests</span></a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
 
export default LeftSideBar;