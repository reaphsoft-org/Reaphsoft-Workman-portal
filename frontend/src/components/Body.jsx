import React from "react";
// import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Body() {
    return (
        <main>
            <div className="hero_area">
                <header className="header_section">
                    <div className="header_bottom">
                        <div className="container-fluid header-p">
                            <nav className="navbar navbar-expand-lg custom_nav-container">
                                <a className="navbar-brand" href="/">
                                    <div className="img-box">
                                        <img src="assets/images/001-removebg-preview.png" alt="" style={{ width: '12%' }} />
                                    </div>
                                </a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className=""></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#services">Services</a>
                                        </li>
                                        <li className="nav-item">
                                            
                                            <Link className="nav-link" to="/login/">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register/">Register</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
                <section className="slider_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="detail-box">
                                    <h1>
                                        Effortless Solutions <br /> for Every Home Task <br /> </h1>
                                    <p>
                                        Welcome to Reaphsoft Workman Portal, where your home tasks become our mission! We understand the everyday challenges of managing household chores, maintenance, and repairs. That's why we're here to offer you a hassle-free solution. Say goodbye to the stress of finding reliable help for your home tasks; our trusted team of professionals is just a click away.
                                    </p>
                                    {/* <a href="">
                                        Contact Us
                                    </a> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="img-box">
                                    <img src="assets/images/labour-removebg-preview.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className="feature_section">
                <div className="container">
                    <div className="feature_container">
                        <div className="col-sm-6 col-md-4 mx-auto">
                            <div className="box ">
                                <div className="img-box">
                                    <img src="assets/images/s1.png" alt="" />
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Maintenance
                                    </h5>
                                    <p>
                                        when looking at its layout. The point of using Lorem Ipsum is
                                        that it has a more-or-less normal
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 mx-auto">
                            <div className="box ">
                                <div className="img-box">
                                    <img src="assets/images/s2.png" alt="" />
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Electrical
                                    </h5>
                                    <p>
                                        when looking at its layout. The point of using Lorem Ipsum is
                                        that it has a more-or-less normal
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 mx-auto">
                            <div className="box ">
                                <div className="img-box">
                                    <img src="assets/images/s3.png" alt="" />
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Plumbing
                                    </h5>
                                    <p>
                                        when looking at its layout. The point of using Lorem Ipsum is
                                        that it has a more-or-less normal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about_section layout_padding-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-6">
                            <div className="img-box">
                                <img src="assets/images/about-img.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6">
                            <div className="detail-box">
                                <h2>
                                    About us
                                </h2>
                                <p>
                                    Our team comprises skilled professionals who excel in various home tasks, including cleaning, repairs, installations, gardening, and more. Each member is vetted, ensuring reliability and proficiency in their respective fields.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>




            <section id="services" className="professional_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 ">
                            <div className="detail-box">
                                <h2>
                                    We Provide Professional <br />
                                    Home Services.
                                </h2>
                                <p>
                                    Whether you need a one-time deep clean, regular maintenance, or emergency repairs, we've got you covered. Our flexible service options cater to your unique needs and schedule, ensuring convenience and peace of mind.
                                </p>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="img-box">
                                <img src="assets/images/imag4-removebg-preview.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- end professional section --> */}


            {/* <!-- client section --> */}

            {/* <section className="client_section ">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            What Our Clients Say
                        </h2>
                    </div>
                    <div className="carousel-wrap layout_padding2-top ">
                        <div className="owl-carousel owl-loaded owl-drag">
                            <div className="owl-stage-outer">
                                <div className="owl-stage">
                                    <div className="owl-item cloned">
                                        <div className="item">
                                            <div className="box">
                                                <div className="client_id">
                                                    <div className="img-box">
                                                        <img src="images/client-1.jpg" alt="" />
                                                    </div>
                                                    <div className="client_detail">
                                                        <div className="client_info">
                                                            <h6>
                                                                Jorch morik
                                                            </h6>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                        </div>
                                                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                                <div className="client_text">
                                                    <p>
                                                        chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="box">
                                            <div class="client_id">
                                                <div className="img-box">
                                                    <img src="images/client-2.jpg" alt="" />
                                                </div>
                                                <div className="client_detail">
                                                    <div className="client_info">
                                                        <h6>
                                                            Jorch morik
                                                        </h6>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </div>
                                                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div className="client_text">
                                                <p>
                                                    chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="box">
                                            <div className="client_id">
                                                <div className="img-box">
                                                    <img src="images/client-1.jpg" alt="" />
                                                </div>
                                                <div className="client_detail">
                                                    <div className="client_info">
                                                        <h6>
                                                            Jorch morik
                                                        </h6>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </div>
                                                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div className="client_text">
                                                <p>
                                                    chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="box">
                                            <div className="client_id">
                                                <div className="img-box">
                                                    <img src="images/client-2.jpg" alt="" />
                                                </div>
                                                <div className="client_detail">
                                                    <div className="client_info">
                                                        <h6>
                                                            Jorch morik
                                                        </h6>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </div>
                                                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div className="client_text">
                                                <p>
                                                    chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section> */}

            {/* <!-- end client section --> */}

            {/* <!-- contact section --> */}

            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                        <h2>
                            Contact Us
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form action="">
                                <div>
                                    <input type="text" placeholder="Name" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Phone Number" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div>
                                    <input type="text" className="message-box" placeholder="Message" />
                                </div>
                                <div className="d-flex ">
                                    <button>
                                        SEND
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="map_container">
                                <div className="map">
                                    <div id="googleMap" style={{ width: "100%", height: "100%" }}></div>
                                </div>
                            </div>
                            
                        </div>
                        {/* <div className="col-md-6">
                            <div className="img-box">
                                <img src="assets/images/imag4-removebg-preview.png" alt="" />
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* <!-- end contact section --> */}


            {/* <!-- info section --> */}
            <section className="info_section ">
                <div className="container">
                    <h4>
                        Get In Touch
                    </h4>
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="info_items">
                                <div className="row">
                                    <div className="col-md-4">
                                        <a href="#">
                                            <div className="item ">
                                                <div className="img-box ">
                                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                </div>
                                                <p>
                                                    N0 4, WEs Street Colombo
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-md-4">
                                        <a href="#call:+021234567890">
                                            <div className="item ">
                                                <div className="img-box ">
                                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                                </div>
                                                <p>
                                                    +02 1234567890
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-md-4">
                                        <a href="mailto:demo@gmail">
                                            <div className="item ">
                                                <div className="img-box">
                                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                                </div>
                                                <p>
                                                    demo@gmail.com
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main >
    )
}