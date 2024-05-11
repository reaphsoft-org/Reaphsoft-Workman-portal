import React from 'react';
import { Link } from 'react-router-dom';
import {AnonFooter} from "./anon-footer";
import logo from "./i/logo.png"

const Services = () => {
    return (
        <div className="page-wraper">
            <header className="site-header mo-left header fullwidth">
                <div className="sticky-header main-bar-wraper navbar-expand-lg">
                    <div className="main-bar clearfix">
                        <div className="container clearfix">
                            <div className="logo-header mostion">
                                <a href="/">
                                    <img src={logo} style={{ width: 80, height: 80 }} className="logo" alt="logo" />
                                </a>
                            </div>
                            <div className="extra-nav">
                                <div className="extra-cell">
                                    <Link className="site-button text-decoration-none" to="/login/"> Log In</Link>
                                    <Link className="site-button text-decoration-none" to="/register/"> Register</Link>
                                </div>
                            </div>
                            <div className="header-nav navbar-collapse collapse myNavbar justify-content-end" id="navbarNavDropdown">
                                <ul className="nav navbar-nav">
                                    <li><Link className="text-decoration-none" to="/">Home </Link></li>
                                    <li><Link className="text-decoration-none" to="/service/">Services </Link></li>
                                    <li><Link className="text-decoration-none" to="/about/">About us </Link></li>
                                    <li><Link className="text-decoration-none" to="/contact/">Contact Us </Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="page-content bg-white">
                <div className="dez-bnr-inr overlay-black-light" style={{ backgroundImage: "url(../asset/image/work.jpg)" }}>
                    <div className="container">
                        <div className="dez-bnr-inr-entry">
                            <h1 className="text-white">Services</h1>
                            <div className="breadcrumb-row">
                                <ul className="list-inline">
                                    <li><Link to="/">Home</Link></li>
                                    <li>Services</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="service" className="section-full job-categories content-inner-2 bg-white">
                    <div className="container">
                        <div className="section-head text-center">
                            <h2 className="m-b5">Services</h2>
                            <h5 className="fw4">20+ service work waiting for you</h5>
                        </div>
                        <div className="row sp20">
                            <div className="col-lg-3 col-sm-6 col-md-6 m-b30">
                                <div className="city-bx align-items-end d-flex" style={{ backgroundImage: "url(../asset/image/ikea.jpg)" }}>
                                    <div className="city-info">
                                        <h5>IKEA Assembly</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-md-6 m-b30">
                                <div className="city-bx align-items-end d-flex" style={{ backgroundImage: "url(../asset/image/Mounting.png)" }}>
                                    <div className="city-info">
                                        <h5>TV Mounting</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-md-6 m-b30">
                                <div className="city-bx align-items-end d-flex" style={{ backgroundImage: "url(../asset/image/Assembly.jpg)" }}>
                                    <div className="city-info">
                                        <h5>Furniture Assembly</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-md-6 m-b30">
                                <div className="city-bx align-items-end d-flex" style={{ backgroundImage: "url(../asset/image/cleaning.jpg)" }}>
                                    <div className="city-info">
                                        <h5>General Cleaning</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-md-6 m-b30">
                                <div className="city-bx align-items-end d-flex" style={{ backgroundImage: "url(../asset/image/help.jpg)" }}>
                                    <div className="city-info">
                                        <h5>Electrical Help</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-md-6 m-b30">
                                <div className="city-bx align-items-end d-flex" style={{ backgroundImage: "url(../asset/image/plumbering.jpg)" }}>
                                    <div className="city-info">
                                        <h5>Plumbing Works</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-md-6 m-b30">
                                <div className="city-bx align-items-end d-flex" style={{ backgroundImage: "url(../asset/image/moving.jpg)" }}>
                                    <div className="city-info">
                                        <h5>Help Moving</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 col-md-6 m-b30">
                                <div className="city-bx align-items-end d-flex" style={{ backgroundImage: "url(../asset/image/loading.jpg)" }}>
                                    <div className="city-info">
                                        <h5>Heavy Lifting & Loading</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AnonFooter />
        </div>
    );
}

export default Services;