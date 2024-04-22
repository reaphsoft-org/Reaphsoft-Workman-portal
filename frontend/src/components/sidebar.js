import React from 'react';
import { Col, Form, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useAuth } from './AuthContext';
const Sidebar = () => {
    const user = useAuth();
    return ( 
        
        <div className="col-xl-3 col-lg-4 m-b30">
            <div className="sticky-top">
                <div className="candidate-info">
                    <div className="candidate-detail text-center">
                        <div className="canditate-des">
                            <img alt="" src=""/>
                        </div>
                        <div className="candidate-title">
                            <div className="">
                                <h4 className="m-b5"><a href="">Name or Estate Name</a>
                                </h4>
                                <p className="m-b0"><a href="">Address</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <Link to="/user/"> {/*todo disable when current route is /user/ */}
                                <i className="fa fa-user-o" aria-hidden="true"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/"> {/*todo disable when current route is /user/ */}
                                    <i className="fa fa-user-o" aria-hidden="true"></i>
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/request/">
                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                                <span>Post a Request</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/job/">
                                <i className="fa fa-briefcase" aria-hidden="true"></i>
                                <span>labour Request</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/update/">
                                <i className="fa fa-briefcase" aria-hidden="true"></i>
                                <span>Edit Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/changePassword/">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                                <span>Change Password</span>
                            </Link>
                        </li>
                        <li>
                            <Link variant="link" onClick={() => logout(user)}>
                                <i className="fa fa-right-from-bracket" aria-hidden="true"></i>Log Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Sidebar;