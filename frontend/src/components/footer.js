import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
    return ( 
        <footer className="site-footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
                            <div className="widget">
                                <img src="" width="180" className="m-b15" alt=""/>
                                <p className="text-capitalize m-b20">Welcome to Reaphsoft Workman Portal, where your
                                    home tasks become our mission! We understand the everyday challenges of managing
                                    household chores, maintenance, and repairs. That's why we're here to offer you a
                                    hassle-free solution. Say goodbye to the stress of finding reliable help for your
                                    home tasks; our trusted team of professionals is just a click away.</p>
                                <ul className="list-inline m-a0">
                                    <li><a className="site-button white facebook circle text-decoration-none" href="/"><i
                                        className="ti ti-facebook"></i></a></li>
                                    <li><a className="site-button white google-plus circle text-decoration-none" href="/"><i
                                        className="ti ti-google"></i></a></li>
                                    <li><a className="site-button white linkedin circle text-decoration-none" href="/"><i
                                        className="ti ti-linkedin"></i></a></li>
                                    <li><a className="site-button white instagram circle text-decoration-none" href="/"><i
                                        className="ti ti-instagram"></i></a></li>
                                    <li><a className="site-button white twitter circle text-decoration-none" href="/"><i
                                        className="ti ti-twitter"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center"><span>© <a href="/" className="link-offset-2">ReaphSoft Limited</a></span></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;