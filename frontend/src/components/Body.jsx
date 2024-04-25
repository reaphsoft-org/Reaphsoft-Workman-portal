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
            <div className="page-content">
                <div className="dez-bnr-inr dez-bnr-inr-md overlay-black-light" style={{ backgroundImage: "url(../asset/image/labour.jpg)"}}>
                    <div className="container">
                        <div className="dez-bnr-inr-entry align-m text-dark">
                            <div className=" job-search-form">
                                <h2 className="text-center">Effortless Solutions for Every Home Task</h2>
                                <h3 className="text-center">
                                    Welcome to Reaphsoft Workman Portal, where your home tasks become our mission! 
                                </h3>
                                <h6 className="text-center mt-0">
                                    We understand the everyday challenges of managing household chores, maintenance, and repairs.
                                </h6>
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
                    {/* <div className="section-full bg-white content-inner-2">
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
                    </div> */}
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
                                                        <p> They transformed our space into something truly remarkable, exceeding our expectations. Highly recommended!.</p>
                                                        </div>
                                                        <div className="testimonial-detail clearfix">
                                                        <div className="testimonial-pic radius shadow">
                                                            <img src="../asset/image/bha.jpg" width="100" height="100" alt="" /></div><strong className="testimonial-name text-white">Tunde Owonikoko</strong>
                                                        <span className="testimonial-position">User</span>
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
                                                        <p>The workman team not only delivered excellent results but also made the entire process smooth and stress-free.</p>
                                                        </div>
                                                        <div className="testimonial-detail clearfix">
                                                        <div className="testimonial-pic radius shadow">
                                                            <img src="../asset/image/bha.jpg" width="100" height="100" alt="" /></div><strong className="testimonial-name text-white">Seun Joy</strong>
                                                        <span className="testimonial-position">User</span>
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
                                                        <p>I was impressed by the work ethic and skill demonstrated by the workman assigned to our project. They tackled each task with precision and efficiency.</p>
                                                        </div>
                                                        <div className="testimonial-detail clearfix">
                                                        <div className="testimonial-pic radius shadow">
                                                            <img src="../asset/image/bha.jpg" width="100" height="100" alt="" /></div>
                                                        <strong className="testimonial-name text-white">Williams Chizgoie</strong>
                                                        <span className="testimonial-position">User</span>
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
                                                        <p>Working with this team was an absolute pleasure. Their dedication to quality and craftsmanship is evident in every aspect of their work. </p>
                                                        </div>
                                                        <div className="testimonial-detail clearfix">
                                                        <div className="testimonial-pic radius shadow">
                                                            <img src="../asset/image/bha.jpg" width="100" height="100" alt="" /></div>
                                                        <strong className="testimonial-name text-white">Ibrahim Musa</strong>
                                                        <span className="testimonial-position">User</span>
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