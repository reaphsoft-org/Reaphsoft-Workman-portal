import React from "react";
import { Link } from "react-router-dom";
import { logout } from '../utils/auth';
import { useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const user = useAuth();
  return (
    <header classNameName="site-header mo-left header border-bottom fullwidth" style={{ backgroundColor: '#d1e3ff' }}>
      <div classNameName="sticky-header main-bar-wraper navbar-expand-lg">
        <div classNameName="main-bar clearfix">
          <div className="container clearfix">
            <div className="logo-header mostion"><a href=""><img src="./assets/images/001-removebg-preview.png" className="logo" alt="" />
            </a></div><button
                className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse"
                data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation"><span></span><span></span><span></span></button>
            <div className="extra-nav">
              <div className="extra-cell"> <a title="READ MORE" className="site-button"
                href=""><i className="fa fa-lock"></i> </a></div>
            </div>
            <div className="header-nav navbar-collapse collapse myNavbar justify-content-start" id="navbarNavDropdown">
              <ul className="nav navbar-nav">
                <li className="active"><a href="/react/demo/jobs-change-password">Home <i
                  className="fa fa-chevron-down"></i></a>
                  <ul className="sub-menu">

                  </ul>
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