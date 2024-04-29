import React from 'react';
import { Link } from 'react-router-dom';
const Services = () => {
    return (
        <div className="page-wraper">
            <header className="site-header mo-left header fullwidth">
                <div className="sticky-header main-bar-wraper navbar-expand-lg">
                    <div className="main-bar clearfix">
                        <div className="container clearfix">
                            <div className="logo-header mostion"><a href="">
                                <img src="../asset/image/001-removebg-preview.png" style={{ width: 80, height: 80 }} className="logo" alt="img" /></a>
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
                <div className="dez-bnr-inr overlay-black-light" style={{ backgroundImage: "url(../asset/image/labour.jpg)" }}>
                    <div className="container">
                        <div className="dez-bnr-inr-entry">
                            <h1 className="text-white">Servies</h1>
                            <div className="breadcrumb-row">
                                <ul className="list-inline">
                                    <li><Link to="/">Home</Link></li>
                                    <li>Service</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="service" className="section-full job-categories content-inner-2 bg-white">
                    <div className="container">
                        <div className="section-head text-center">
                            <h2 className="m-b5">Services</h2>
                            <h5 className="fw4">20+ service work wating for you</h5>
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
            <footer className="site-footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
                                <div className="widget"><img src="../asset/image/001-removebg-preview.png" style={{ width: 80, height: 80 }} className="m-b15" alt="" />
                                    <p className="text-capitalize m-b20">Whether you need a one-time deep clean, regular maintenance, or emergency repairs, we've got you covered. Our flexible service options cater to your unique needs and schedule, ensuring convenience and peace of mind.</p>
                                    <div className="subscribe-form m-b20">
                                        <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                                            <div className="dzSubscribeMsg"></div>
                                            <div className="input-group"><input name="dzEmail" required="" className="form-control" placeholder="Your Email Address" type="email" /><span className="input-group-btn"><button name="submit" value="Submit" type="submit" className="site-button radius-xl">Subscribe</button></span></div>
                                        </form>
                                    </div>
                                    <ul className="list-inline m-a0">
                                        <li><a className="site-button white facebook circle " href=""><i className="fa fa-facebook"></i></a></li>
                                        <li><a className="site-button white google-plus circle " href=""><i className="fa fa-google-plus"></i></a></li>
                                        <li><a className="site-button white linkedin circle " href=""><i className="fa fa-linkedin"></i></a></li>
                                        <li><a className="site-button white instagram circle " href=""><i className="fa fa-instagram"></i></a></li>
                                        <li><a className="site-button white twitter circle " href=""><i className="fa fa-twitter"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center"><span> © Copyright by <i className="m-lr5 text-decoration-none"></i><a href="">Reaphsoft Limited</a></span></div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Services;