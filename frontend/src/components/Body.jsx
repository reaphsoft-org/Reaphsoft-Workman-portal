import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Register from "../pages/Register";

export default function Body() {
    return (
        <div className="page-wraper">
            <header className="site-header mo-left header fullwidth">
                <div className="sticky-header main-bar-wraper navbar-expand-lg">
                    <div className="main-bar clearfix">
                        <div className="container clearfix">
                            <div className="logo-header mostion"><a href="">
                                <img src="asset/image/001-removebg-preview.png" style={{ width: 80, height: 80 }} className="logo" alt="img" /></a>
                            </div>
                            
                            <div className="extra-nav">
                                <div className="extra-cell">
                                    <a className="site-button text-decoration-none" href=""><i className="fa fa-user"></i> Sign Up</a>
                                    <a className="site-button text-decoration-none" href=""><i className="fa fa-lock"></i> Log In</a>
                                </div>
                            </div>
                            <div className="header-nav navbar-collapse collapse myNavbar justify-content-end" id="navbarNavDropdown">
                                <ul className="nav navbar-nav">
                                    <li><Link className="text-decoration-none" to="/">Home </Link></li>
                                    <li><Link className="text-decoration-none" to="/service/">Services </Link></li>
                                    <li><Link className="text-decoration-none" to="">About us </Link></li>
                                    <li><Link className="text-decoration-none" to="">Contact Us </Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="page-content">
                <div className="dez-bnr-inr dez-bnr-inr-md overlay-black-dark" style={{ backgroundImage: "url(../asset/image/about-img.jpg)"}}>
                    <div className="container">
                        <div className="dez-bnr-inr-entry align-m text-white">
                            <div className=" job-search-form">
                                <h2 className="text-center">Effortless Solutions for Every Home Task</h2>
                                <p className="text-center">
                                    Welcome to Reaphsoft Workman Portal, where your home tasks become our mission! 
                                </p>
                                <p className="text-center mt-0">We understand the everyday challenges of managing household chores, maintenance, and repairs.
                                </p>
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
                                    <div className="city-bx align-items-end d-flex" style={{ backgroundImage: "url(../asset/image/ikea.jpg)"}}>
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
                <div className="section-full content-inner-2 call-to-action overlay-black-dark text-white text-center bg-img-fix" style={{ backgroundImage: "url(../asset/image/Blackman.png)"}}>
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
                    <div className="section-full bg-white content-inner-2">
                        <div className="container">
                            <div className="d-flex job-title-bx section-head">
                                <div className="mr-auto">
                                    <h2 className="m-b5">Recent Jobs</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <ul className="post-job-bx browse-job">
                                        <li>
                                            <div className="post-bx">
                                                <div className="d-flex m-b30">
                                                    <div className="job-post-company"><span><img alt="" src="data:image/png;base64,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"/></span></div>
                                                    <div className="job-post-info">
                                                        <h4><a href="job-detail">General Mounting</a></h4>
                                                        <ul>
                                                            <li><i className="fa fa-map-marker"></i> Tiger Estate, Delta State</li>
                                                            <li><i className="fa fa-bookmark-o"></i> Full Time</li>
                                                            <li><i className="fa fa-clock-o"></i> 21st April, 2024</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="job-time mr-auto"><a href="index-2"><span>Full Time</span></a></div>
                                                    <div className="salary-bx"><span>&#x20A6;1200 - &#x20A6; 2500</span></div>
                                                </div><label className="like-btn"><input type="checkbox"/><span className="checkmark"></span></label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="post-bx">
                                                <div className="d-flex m-b30">
                                                    <div className="job-post-company"><span><img alt="" src="data:image/png;base64,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"/></span></div>
                                                    <div className="job-post-info">
                                                        <h4><a href="job-detail">General Mounting</a></h4>
                                                        <ul>
                                                            <li><i className="fa fa-map-marker"></i> Tiger Estate, Delta State</li>
                                                            <li><i className="fa fa-clock-o"></i> 21st April, 2024</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="job-time mr-auto"><a href="index-2"><span>Full Time</span></a></div>
                                                    <div className="salary-bx"><span>&#x20A6;1200 - &#x20A6; 2500</span></div>
                                                </div><label className="like-btn"><input type="checkbox"/><span className="checkmark"></span></label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="post-bx">
                                                <div className="d-flex m-b30">
                                                    <div className="job-post-company"><span><img alt="" src="data:image/png;base64,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"/></span></div>
                                                    <div className="job-post-info">
                                                        <h4><a href="job-detail">General Mounting</a></h4>
                                                        <ul>
                                                            <li><i className="fa fa-map-marker"></i> Tiger Estate, Delta State</li>
                                                            <li><i className="fa fa-clock-o"></i> 21st April, 2024</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="job-time mr-auto"><a href="index-2"><span>Full Time</span></a></div>
                                                    <div className="salary-bx"><span>&#x20A6;1200 - &#x20A6; 2500</span></div>
                                                </div><label className="like-btn"><input type="checkbox"/><span className="checkmark"></span></label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                <div className="section-full p-tb70 overlay-black-dark text-white text-center bg-img-fix" style={{ backgroundImage: "url(&quot;static/media/slide1.77cb3acb.jpg&quot;)" }}>
                        <div className="container">
                            <div className="section-head text-center text-white">
                                <h2 className="m-b5">Testimonials</h2>
                                <h5 className="fw4">Few words from Clients</h5>
                            </div>
                            <div className="slick-slider blog-carousel-center owl-carousel owl-none  slick-initialized" dir="ltr">
                                <div className="slick-list">
                                <div className="slick-track" style={{ width: "3410px", opacity: "1", transform: "translate3d(-1550px, 0px, 0px);"}}>
                                    <div data-index="-3" tabindex="-1" className="slick-slide slick-cloned" aria-hidden="true" style={{ width: "310px"}}>
                                            <div>
                                            <div className="item p-3" tabindex="-1" style={{ width: "100%", display: "inline-block"}}>
                                                    <div className="testimonial-5">
                                                        <div className="testimonial-text">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                                                        </div>
                                                        <div className="testimonial-detail clearfix">
                                                            <div className="testimonial-pic radius shadow"><img src="data:image/jpeg;base64,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" width="100" height="100" alt=""/></div><strong className="testimonial-name">David Matin</strong><span className="testimonial-position">Student</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div data-index="-2" tabindex="-1" className="slick-slide slick-cloned" aria-hidden="true" style={{ width: "310px"}}>
                                            <div>
                                            <div className="item p-3" tabindex="-1" style={{ width: "100%", display: "inline-block;"}}>
                                                    <div className="testimonial-5">
                                                        <div className="testimonial-text">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                                                        </div>
                                                        <div className="testimonial-detail clearfix">
                                                            <div className="testimonial-pic radius shadow"><img src="data:image/jpeg;base64,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" width="100" height="100" alt=""/></div><strong className="testimonial-name">David Matin</strong><span className="testimonial-position">Student</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div data-index="-1" tabindex="-1" className="slick-slide slick-cloned" aria-hidden="true" style={{ width: "310px"}}>
                                            <div>
                                                <div className="item p-3" tabindex="-1" style={{ width: "100%", display: "inline-block;"}}>
                                                    <div className="testimonial-5">
                                                        <div className="testimonial-text">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                                                        </div>
                                                        <div className="testimonial-detail clearfix">
                                                            <div className="testimonial-pic radius shadow"><img src="data:image/jpeg;base64,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" width="100" height="100" alt=""/></div><strong className="testimonial-name">David Matin</strong><span className="testimonial-position">Student</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div data-index="0" className="slick-slide" tabindex="-1" aria-hidden="true" style={{outline: "none", width: "310px"}}>
                                            <div>
                                                <div className="item p-3" tabindex="-1" style={{ width: "100%", display: "inline-block;"}}>
                                                    <div className="testimonial-5">
                                                        <div className="testimonial-text">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                                                        </div>
                                                        <div className="testimonial-detail clearfix">
                                                            <div className="testimonial-pic radius shadow"><img src="data:image/jpeg;base64,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" width="100" height="100" alt=""/></div><strong className="testimonial-name">David Matin</strong><span className="testimonial-position">Student</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                                <div className="widget"><img src="asset/image/001-removebg-preview.png" style={{ width: 80, height: 80 }} className="m-b15" alt=""/>
                                    <p className="text-capitalize m-b20">Whether you need a one-time deep clean, regular maintenance, or emergency repairs, we've got you covered. Our flexible service options cater to your unique needs and schedule, ensuring convenience and peace of mind.</p>
                                        <div className="subscribe-form m-b20">
                                            <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                                                <div className="dzSubscribeMsg"></div>
                                                <div className="input-group"><input name="dzEmail" required="" className="form-control" placeholder="Your Email Address" type="email"/><span className="input-group-btn"><button name="submit" value="Submit" type="submit" className="site-button radius-xl">Subscribe</button></span></div>
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
    )
}