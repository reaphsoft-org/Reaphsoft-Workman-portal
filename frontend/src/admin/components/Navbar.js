import React from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../../components/AuthContext";
import {Button} from "react-bootstrap";
import {logOutAdmin} from "../../utils/auth";

const NavBar = () => {
    const userAuth = useAuth();

    return (
        <div className="navbar-right">
            <ul className="navbar-nav">
                <li>
                    {/* <a href="#search" className="main_search" title="Search..."><i className="zmdi zmdi-search"></i></a> */}
                </li>
                <li>
                    <Button variant="primary" onClick={()=>logOutAdmin(userAuth)} className="mega-menu" title="Sign Out"><i className="zmdi zmdi-power"></i></Button></li>
            </ul>
        </div>
    );
}
 
export default NavBar;
