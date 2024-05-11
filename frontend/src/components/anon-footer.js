// 11/05/2024 15:57
// reaphsoft-workman
// github.com/kahlflekzy

import React from "react";

export function AnonFooter() {
    return (
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
                                    <li><a className="site-button white facebook circle text-decoration-none" href=""><i className="ti ti-facebook"></i></a></li>
                                    <li><a className="site-button white google-plus circle text-decoration-none" href=""><i className="ti ti-google"></i></a></li>
                                    <li><a className="site-button white linkedin circle text-decoration-none" href=""><i className="ti ti-linkedin"></i></a></li>
                                    <li><a className="site-button white instagram circle text-decoration-none" href=""><i className="ti ti-instagram"></i></a></li>
                                    <li><a className="site-button white twitter circle text-decoration-none" href=""><i className="ti ti-twitter"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center"><span>© <a className="link-offset-2" href="/">Reaphsoft Limited</a></span></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}