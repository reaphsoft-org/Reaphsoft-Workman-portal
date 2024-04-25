import React from "react"; 
import { Link } from "react-router-dom";

const LeftSideBar = () => {
    return ( 
        <aside id="leftsidebar" className="sidebar">
            <div className="navbar-brand">
                <button className="btn-menu ls-toggle-btn" type="button"><i className="zmdi zmdi-menu"></i></button>
                <a href="">
                    <img src="../asset/image/001-removebg-preview.png" width="75" alt="Admin Image" />
                    <span className="m-l-10 text-decoration-none"></span></a>
            </div>
            <div className="menu">
                <ul className="list">
                    <li>
                        <div className="user-info">
                            <a className="image" href="profile.html">
                                <img src="../asset/image/bha.jpg" alt="User" />
                            </a>
                            <div className="detail">
                                <h4>Michael Akorede</h4>
                                <small>Workman Admin</small>
                            </div>
                        </div>
                    </li>
                    <li className="active open">
                        <a href="index.html"><i className="zmdi zmdi-home"></i><span>Dashboard</span></a>
                    </li>
                    <li className="active open">
                        <Link to="skill">
                            <i className="zmdi zmdi-assignment"></i><span>Worker</span>
                        </Link>
                    </li>
                    <li className="active open">
                        <a href=""><i className="zmdi zmdi-folder"></i><span>Clients</span></a>
                    </li>
                    <li className="active open">
                        <a href=""><i className="zmdi zmdi-blogger"></i><span>Request</span></a>
                    </li>
                    <li className="active open">
                        <a href=""><i className="zmdi zmdi-swap-alt"></i><span>Complients</span></a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
 
export default LeftSideBar;