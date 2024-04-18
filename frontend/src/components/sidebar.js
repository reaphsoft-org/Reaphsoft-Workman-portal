import React from 'react';
import { Col, Form, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useAuth } from './AuthContext';
const Sidebar = () => {
    const user = useAuth();
    return ( 
        <Col xl={3} lg={4} className="m-b30">
            <div className="sticky-top">
                <div className="candidate-info">
                    <div className="candidate-detail text-center">
                        <div className="canditate-des">
                            <a href="#">
                                <Image src="../../public/asset/image/pic2.jpg" alt="" />
                            </a>
                            <div className="upload-link" title="update">
                                <input type="file" className="update-flie" />
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="update-tooltip">Update</Tooltip>}
                                >
                                    <i className="fa fa-camera"></i>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div className="candidate-title">
                            <div>
                                <h4 className="m-b5">
                                    <a href="#">Peter JOhn</a>
                                </h4>
                                <p className="m-b0">
                                    <a href="#">Mechainan Engineer</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <a className="active" href="#">
                                <i className="fa fa-user-o" aria-hidden="true"></i>
                                <span>Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                <span>My Resume</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                                <span>Saved Jobs</span>
                            </a>
                        </li>
                        <li>

                            <Link to="/job">
                                <i className="fa fa-briefcase" aria-hidden="true"></i>
                                <span>Applied Jobs</span>
                            </Link>

                        </li>

                        <li>
                            <a href="/react/demo/jobs-change-password">
                                <i className="fa fa-key" aria-hidden="true"></i>
                                <span>Change Password</span>
                            </a>
                        </li>
                        <li>
                            <Button className="link-offset-2 link-underline-secondary" variant="link" onClick={() => logout(user)}>Log Out</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </Col>
    );
}
 
export default Sidebar;