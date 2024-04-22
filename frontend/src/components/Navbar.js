import React from "react";
import { Link } from "react-router-dom";
import { logout } from '../utils/auth';
import { useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const user = useAuth();
  return (
    <header className="site-header mo-left header border-bottom fullwidth">
      <div className="sticky-header main-bar-wraper navbar-expand-lg">
        <div className="main-bar clearfix">
          <div className="container clearfix">
            <div className="logo-header mostion"><a href=""><img
              src="%PUBLIC_URL%/assets/images/labour-removebg-preview.png"
              className="logo" alt="" /></a>
            </div>
            <button
                className="navbar-toggler collapsed navicon justify-content-end" type="button"
                data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                aria-expanded="false"
              aria-label="Toggle navigation"><span></span><span></span><span></span>
            </button>
            <div className="header-nav navbar-collapse collapse myNavbar justify-content-start"
              id="navbarNavDropdown">
              <ul className="nav navbar-nav">
                <li className="active"><a href="">Home <i
                  className="fa fa-chevron-down"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;