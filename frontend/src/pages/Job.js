import React from "react";
import { Col, Form, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import { useAuth } from "../components/AuthContext";
import Sidebar from "../components/sidebar";

const Job = () => {
    const user = useAuth();
    return ( 
        <div className="page-content bg-white">
            <div className="content-block">
                <div className="section-full bg-white browse-job p-t50 p-b20">
                    <div className="container">
                        <div className="row">
                            <Sidebar />
                            <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                                <div className="job-bx-title  clearfix">
                                    <h5 className="font-weight-700 pull-left text-uppercase">2269 Jobs Found</h5>
                                    <div className="float-right"><span className="select-title">Sort by freshness</span><select
                                        className="custom-btn">
                                        <option>Last 2 Months</option>
                                        <option>Last Months</option>
                                        <option>Last Weeks</option>
                                        <option>Last 3 Days</option>
                                    </select></div>
                                </div>
                                <ul className="post-job-bx browse-job">
                                    <li>
                                        <div className="post-bx">
                                            <div className="job-post-info m-a0">
                                                <h4><a href="/react/demo/job-detail">PHP Web Developer</a></h4>
                                                <ul>
                                                    <li><a href="/react/demo/company-profile">@company-name</a></li>
                                                    <li><i className="fa fa-map-marker"></i> Sacramento, California</li>
                                                    <li><i className="fa fa-money"></i> 25,000</li>
                                                </ul>
                                                <div className="job-time m-t15 m-b10"><a className="mr-1"
                                                    href="/react/demo/"><span>PHP</span></a><a className="mr-1"
                                                        href="/react/demo/"><span>Angular</span></a><a className="mr-1"
                                                            href="/react/demo/"><span>Bootstrap</span></a><a className="mr-1"
                                                                href="/react/demo/"><span>Wordpress</span></a></div>
                                                <div className="posted-info clearfix">
                                                    <p className="m-tb0 text-primary float-left"><span
                                                        className="text-black m-r10">Posted:</span> 2 day ago</p><a
                                                            className="site-button button-sm float-right"
                                                            href="/react/demo/jobs-my-resume">Apply Job</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="post-bx">
                                            <div className="job-post-info m-a0">
                                                <h4><a href="/react/demo/job-detail">Software Developer</a></h4>
                                                <ul>
                                                    <li><a href="/react/demo/company-profile">@company-name</a></li>
                                                    <li><i className="fa fa-map-marker"></i> Sacramento, California</li>
                                                    <li><i className="fa fa-money"></i> 25,000</li>
                                                </ul>
                                                <div className="job-time m-t15 m-b10"><a className="mr-1"
                                                    href="/react/demo/"><span>PHP</span></a><a className="mr-1"
                                                        href="/react/demo/"><span>Angular</span></a><a className="mr-1"
                                                            href="/react/demo/"><span>Bootstrap</span></a><a className="mr-1"
                                                                href="/react/demo/"><span>Wordpress</span></a></div>
                                                <div className="posted-info clearfix">
                                                    <p className="m-tb0 text-primary float-left"><span
                                                        className="text-black m-r10">Posted:</span> 2 day ago</p><a
                                                            className="site-button button-sm float-right"
                                                            href="/react/demo/jobs-my-resume">Apply Job</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="post-bx">
                                            <div className="job-post-info m-a0">
                                                <h4><a href="/react/demo/job-detail">Branch Credit Manager</a></h4>
                                                <ul>
                                                    <li><a href="/react/demo/company-profile">@company-name</a></li>
                                                    <li><i className="fa fa-map-marker"></i> Sacramento, California</li>
                                                    <li><i className="fa fa-money"></i> 25,000</li>
                                                </ul>
                                                <div className="job-time m-t15 m-b10"><a className="mr-1"
                                                    href="/react/demo/"><span>PHP</span></a><a className="mr-1"
                                                        href="/react/demo/"><span>Angular</span></a><a className="mr-1"
                                                            href="/react/demo/"><span>Bootstrap</span></a><a className="mr-1"
                                                                href="/react/demo/"><span>Wordpress</span></a></div>
                                                <div className="posted-info clearfix">
                                                    <p className="m-tb0 text-primary float-left"><span
                                                        className="text-black m-r10">Posted:</span> 2 day ago</p><a
                                                            className="site-button button-sm float-right"
                                                            href="/react/demo/jobs-my-resume">Apply Job</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="pagination-bx m-t30">
                                    <ul className="pagination">
                                        <li className="previous"><a href="/react/demo/jobs-applied-job"><i
                                            className="ti-arrow-left"></i> Prev</a></li>
                                        <li className="active"><a href="/react/demo/jobs-applied-job">1</a></li>
                                        <li><a href="/react/demo/jobs-applied-job">2</a></li>
                                        <li><a href="/react/demo/jobs-applied-job">3</a></li>
                                        <li className="next"><a href="/react/demo/jobs-applied-job">Next <i
                                            className="ti-arrow-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Job;

