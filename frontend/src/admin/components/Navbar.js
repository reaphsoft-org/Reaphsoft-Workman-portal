import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
       
        <div className="navbar-right">
            <ul className="navbar-nav">
                <li>
                    {/* <a href="#search" className="main_search" title="Search..."><i className="zmdi zmdi-search"></i></a> */}
                </li>
                <li>
                    <a href="sign-in.html" className="mega-menu" title="Sign Out"><i className="zmdi zmdi-power"></i></a></li>
            </ul>
        </div>
    );
}
 
export default NavBar;
