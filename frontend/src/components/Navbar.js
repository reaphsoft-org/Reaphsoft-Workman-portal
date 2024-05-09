import React from "react";
import { Link } from "react-router-dom";
import logo from "./i/logo.png";

const Navbar = () => {
  return (
    <header className="site-header mo-left header border-bottom fullwidth">
      <div className="sticky-header main-bar-wraper navbar-expand-lg">
        <div className="main-bar clearfix">
          <div className="container clearfix">
            <div className="logo-header mostion">
              <Link to="/">
                <img src={logo} style={{ width: 80, height: 80 }} alt="logo" />
              </Link>
            </div>
            <button
                className="navbar-toggler collapsed navicon justify-content-end" type="button"
                data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                aria-expanded="false"
              aria-label="Toggle navigation"><span></span><span></span><span></span>
            </button>
            <div className="header-nav navbar-collapse collapse myNavbar justify-content-end"
              id="navbarNavDropdown">
              <ul className="nav navbar-nav">
                <li className="active text-decoration-none">
                  <Link to="/">Home </Link>
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