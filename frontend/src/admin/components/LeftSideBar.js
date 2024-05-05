import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../../components/AuthContext";
import {showAlert} from "../../utils/alert";

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
    const logout = () => {
      userAuth.logoutAdmin();
      window.location.href = "/admin/";
    }
    useEffect(() => {
        fetch('http://localhost:3001/admin/m/', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userAuth.admin.token,
            'Content-Type': 'application/json'
          }
        }).then(res =>{
            if (res.status === 401){
                logout();
                window.location.href = "/admin/dashboard/";
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
    }, [logout, userAuth.admin.token]);
    return ( 
        <aside id="leftsidebar" className="sidebar">
            <div className="navbar-brand">
                <button className="btn-menu ls-toggle-btn" type="button"><i className="zmdi zmdi-menu"></i></button>
                <a href="">
                    <img src="../../asset/image/001-removebg-preview.png" width="75" alt="Admin Image" />
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
                        <Link to="/admin/dashboard/">
                            <i className="zmdi zmdi-home"></i><span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="active open">
                        <Link to="client"><i className="zmdi zmdi-folder"></i><span>Users</span></Link>
                    </li>
                    <li className="active open">
                        <Link to="estate/"><i className="zmdi zmdi-flower"></i><span>Estates</span></Link>
                    </li>
                    <li className="active open">
                        <a href=""><i className="zmdi zmdi-swap-alt"></i><span>Services</span></a>
                    </li>
                    <li className="active open">
                        <Link to="skill/">
                            <i className="zmdi zmdi-assignment"></i><span>Workmen</span>
                        </Link>
                    </li>
                    <li className="active open">
                        <a href=""><i className="zmdi zmdi-blogger"></i><span>Work Requests</span></a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
 
export default LeftSideBar;