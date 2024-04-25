import React from "react";

const NavBar = () => {
    return ( 
        <aside id="leftsidebar" className="sidebar">
            <div className="navbar-brand">
                <button className="btn-menu ls-toggle-btn" type="button"><i className="zmdi zmdi-menu"></i></button>
                <a href="index.html"><img src="assets/images/logo.svg" width="25" alt="Workman Portal"/><span className="m-l-10">Reaphsoft Workman</span></a>
            </div>
            <div className="menu">
                <ul className="list">
                    <li>
                        <div className="user-info">
                            <a className="image" href="profile.html">
                                <img src="adm/images/profile_av.jpg" alt="User" /></a>
                            <div className="detail">
                                <h4>Micheal Cristine</h4>
                                <small>Workman Portal Admin</small>
                            </div>
                        </div>
                    </li>
                    <li className="active open">
                        <a href="index.html"><i className="zmdi zmdi-home"></i><span>Dashboard</span></a>
                    </li>
                    
                    <li>
                        <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-assignment"></i><span>Projects</span></a>
                    </li>
                    
                </ul>
            </div>
        </aside>    
    );
}
 
export default NavBar;
