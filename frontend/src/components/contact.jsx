import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
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
                                        <Link className="site-button text-decoration-none" to="/login/">Log In</Link>
                                        <Link className="site-button text-decoration-none" to="/register/">Register</Link>
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
                                <h1 className="text-white">Contact Us</h1>
                                <div className="breadcrumb-row">
                                    <ul className="list-inline">
                                        <li><Link to="/">Home</Link></li>
                                        <li>Contact Us</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-full content-inner bg-white contact-style-1">
                        <div className="container">
                            <div className="row text-black">
                                <div className="col-lg-6 col-md-6 d-lg-flex d-md-flex">
                                    <div className="p-a30 border m-b30 contact-area border-1 align-self-stretch radius-sm">
                                        <h4 className="m-b10">Quick Contact</h4>
                                        <p>If you have any questions simply use the following contact details.</p>
                                        <ul className="no-margin">
                                            <li className="icon-bx-wraper left m-b30">
                                                <div className="icon-bx-xs border-1">
                                                    <a className="icon-cell" href=""><i className="ti-location-pin"></i></a> </div>
                                                <div className="icon-content">
                                                    <h6 className="text-uppercase m-tb0 dez-tilte">Address:</h6>
                                                    <p>No 4, Termi Street, Poly Road, Ikeja , Lagos State</p>
                                                </div>
                                            </li>
                                            <li className="icon-bx-wraper left  m-b30">
                                                <div className="icon-bx-xs border-1">
                                                    <a className="icon-cell" href=""><i className="ti-email"></i></a> </div>
                                                <div className="icon-content">
                                                    <h6 className="text-uppercase m-tb0 dez-tilte">Email:</h6>
                                                    <p>Reaphsoftworkman@gmail.com</p>
                                                </div>
                                            </li>
                                            <li className="icon-bx-wraper left">
                                                <div className="icon-bx-xs border-1"> <a className="icon-cell" href=""><i className="ti-mobile"></i></a> </div>
                                                <div className="icon-content">
                                                    <h6 className="text-uppercase m-tb0 dez-tilte">PHONE</h6>
                                                    <p>+234 803 123 4567</p>
                                                </div>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="p-a30 m-b30 radius-sm bg-gray clearfix">
                                        <h4>Send Message Us</h4>
                                        <div className="dzFormMsg"></div>
                                        <form method="post" className="dzForm" action="">
                                            <input type="hidden" name="dzToDo" value="Contact" />
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <input name="dzName" type="text" required="" className="form-control" placeholder="Your Name" spellcheck="false" data-ms-editor="true" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <input name="dzEmail" type="email" className="form-control" required="" placeholder="Your Email Address" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <div className="input-group"><textarea name="dzMessage" rows="4" className="form-control" required="" placeholder="Your Message..." spellcheck="false" data-ms-editor="true"></textarea></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="recaptcha-bx">
                                                        <div className="input-group">
                                                            <div className="g-recaptcha" data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN" data-callback="verifyRecaptchaCallback" data-expired-callback="expiredRecaptchaCallback"></div>
                                                            <input className="form-control d-none" data-recaptcha="true" required="" data-error="Please complete the Captcha" style={{ display: "none" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <button name="submit" type="submit" value="Submit" className="site-button "> <span>Submit</span> </button>
                                                </div>
                                            </div>
                                        </form>
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
 
export default Contact;