import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useAuth } from './AuthContext';
import {Button} from "react-bootstrap";

const Sidebar = ({user}) => {
    const userAuth = useAuth();
    return (
        <div className="col-xl-3 col-lg-4 m-b30">
            <div className="sticky-top">
                <div className="candidate-info">
                    <div className="candidate-detail text-center">
                        <div className="canditate-des">
                            <img alt={user.fullname} className="img-fluid" src={ user.photoURL !== '' ? "http://localhost:3001/" + user.photoURL : null} style={{width: '150px', height: '150px'}}/>
                        </div>
                        <div className="candidate-title">
                            <h5 className="mb-2 text-dark">{user.fullname}</h5>
                            <p className="mb-0 text-dark">{user.address}</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                                <Link to="/user/" className='text-decoration-none'>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                        <li>
                            <Link to="/user/profile/" className='text-decoration-none'>
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/update/" className='text-decoration-none'>
                                <span>Update Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/change/password/" className='text-decoration-none'>
                                <span>Change Password</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/work/request/service/" className='text-decoration-none'>
                                <span>Request Workman</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/work/requests/" className='text-decoration-none'>
                                    <span>Work Request History</span>
                                </Link>
                        </li>
                    {user.accountType === 2  &&
                        <>
                            <li>
                                <Link to="/estate/houses/" className='text-decoration-none'>
                                    <span>Estate Houses</span>
                                </Link>
                            </li>
                        </>
                    }
                        <li>
                            <hr className= "border border-secondary my-0 border-1 opacity-25" />
                            <Button variant='link' className='text-decoration-none' onClick={() => logout(userAuth)}><i className="ti ti-power-off px-2 "></i>Log Out</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Sidebar;