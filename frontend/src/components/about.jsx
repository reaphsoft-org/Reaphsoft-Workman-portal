import React from "react";
import Register from '../pages/Register';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { Link } from 'react-router-dom';


const AboutS = () => {
    return (
        <div className="page-wraper">
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
                                        <Link className="site-button text-decoration-none" to="/login/"><i className="fa fa-user"></i>Log In</Link>
                                        <Link className="site-button text-decoration-none" to="/register/"><i className="fa fa-lock"></i>Register</Link>
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
                    <div className="dez-bnr-inr overlay-black-light" style={{
                        backgroundImage: "url(../asset/image/labour.jpg)" }}>
                        <div className="container">
                            <div className="dez-bnr-inr-entry">
                                <h1 className="text-white">About Us</h1>
                                <div className="breadcrumb-row">
                                    <ul className="list-inline">
                                        <li><Link to="/">Home</Link></li>
                                        <li>About Us</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-block">
                        <div className="section-full content-inner overlay-white-middle">
                            <div className="container">
                                <div className="row align-items-center m-b50">
                                    <div className="col-md-12 col-lg-6 m-b20 text-black">
                                        <h2 className="m-b5">About Us</h2>
                                        <h3 className="fw4">We create unique experiences</h3>
                                        <p className="m-b15">At Workman, we understand the importance of connecting skilled workers with the right opportunities. Our platform serves as a central hub where employers can find reliable professionals, and workers can discover fulfilling jobs that match their expertise.</p>
                                        <p className="m-b15">Our mission is to foster a thriving community where collaboration and innovation thrive. Join us in building a brighter future for workers and businesses worldwide. Together, we can unlock endless possibilities in the world of work.</p>
                                        
                                    </div>
                                    <div className="col-md-12 col-lg-6"><img src="../asset/image/ikea.jpg" alt=""/></div>
                                </div>
                                <div className="row text-black">
                                    <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                                        <div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
                                            <div className="icon-md text-primary m-b20"> <a className="icon-cell text-primary" href=""><i className="ti-desktop"></i></a> </div>
                                            <div className="icon-content">
                                                <h5 className="dlab-tilte text-uppercase">Maintenance</h5>
                                                <p>Keeping things running smoothly. Workman handles maintenance tasks promptly and effectively, ensuring equipment and systems operate at their best.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                                        <div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
                                            <div className="icon-md text-primary m-b20"> <a className="icon-cell text-primary" href=""><i className="ti-image"></i></a> </div>
                                            <div className="icon-content">
                                                <h5 className="dlab-tilte text-uppercase">Repairs</h5>
                                                <p>Restoring functionality with expertise. Workman's skilled technicians swiftly diagnose and repair issues, getting things back on track in no time.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                                        <div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
                                            <div className="icon-md text-primary m-b20"> <a className="icon-cell text-primary" href=""><i className="ti-cup"></i></a> </div>
                                            <div className="icon-content">
                                                <h5 className="dlab-tilte text-uppercase">Assembly</h5>
                                                <p>Joining parts together seamlessly. Workman ensures every assembly is done with precision and efficiency, ensuring products come together flawlessly.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-full content-inner-2 call-to-action overlay-black-dark text-white text-center bg-img-fix" style={{ backgroundImage: "url(../asset/image/Blackman.png)" }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h2 className="m-b10">Make a Difference</h2>
                                        <p className="m-b0">Our team comprises skilled professionals who excel in various home tasks, including cleaning, repairs, installations, gardening, and more. Each member is vetted, ensuring reliability and proficiency in their respective fields.</p>
                                        <Link className="site-button m-t20 outline outline-2 radius-xl text-decoration-none" to="/register/">Create an Account </Link>
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
        </div>
    );
}

export default AboutS;