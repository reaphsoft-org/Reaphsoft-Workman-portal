import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import "react-bootstrap/dist/react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
    return ( 
        <footer className="site-footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
                            <div className="widget"><img
                                src=""
                                width="180" className="m-b15" alt=""/>
                                <p className="text-capitalize m-b20">Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry has been the industry's standard dummy text ever since the.</p>
                                <div className="subscribe-form m-b20">
                                    <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                                        <div className="dzSubscribeMsg"></div>
                                        <div className="input-group"><input name="dzEmail" required="" className="form-control"
                                            placeholder="Your Email Address" type="email"/><span
                                                className="input-group-btn"><button name="submit" value="Submit"
                                                    type="submit"
                                                    className="site-button radius-xl">Subscribe</button></span></div>
                                    </form>
                                </div>
                                <ul className="list-inline m-a0">
                                    <li><a className="site-button white facebook circle " href=""><i
                                        className="fa fa-facebook"></i></a></li>
                                    <li><a className="site-button white google-plus circle " href=""><i
                                        className="fa fa-google-plus"></i></a></li>
                                    <li><a className="site-button white linkedin circle " href=""><i
                                        className="fa fa-linkedin"></i></a></li>
                                    <li><a className="site-button white instagram circle " href=""><i
                                        className="fa fa-instagram"></i></a></li>
                                    <li><a className="site-button white twitter circle " href=""><i
                                        className="fa fa-twitter"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center"><span> © Copyright by <a href="">ReaphSoft Limited </a>
                            All rights reserved.</span></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;