import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useAuth } from './AuthContext';
const Sidebar = ({user}) => {
    const useAuth1 = useAuth();
    return (
        <div className="col-xl-3 col-lg-4 m-b30">
            <div className="sticky-top">
                <div className="candidate-info">
                    <div className="candidate-detail text-center">
                        <div className="canditate-des">
                            <img alt={user.fullname} className="img-fluid" src={ user.photoURL !== '' ? "http://localhost:3001/" + user.photoURL : null} style={{width: '150px', height: '150px'}}/>
                        </div>
                        <div className="candidate-title">
                            <div className="">
                                <h5 className="m-b5"><a className="link-offset-2 link-underline-primary">{user.fullname}</a>
                                </h5>
                                <p className="m-b0"><a className="link-offset-2 link-underline-secondary">{user.address}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <Link to="/user/dashboard">
                                <i className="fa fa-user-o" aria-hidden="true"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/user/"> 
                                    <i className="fa fa-user-o" aria-hidden="true"></i>
                                <span>Profile</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/user/request/">
                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                                <span>Post a Request</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/job/">
                                <i className="fa fa-briefcase" aria-hidden="true"></i>
                                <span>Request Labour</span>
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
                            <Link variant="link" className="link-offset-3" onClick={() => logout(useAuth1)}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Sidebar;