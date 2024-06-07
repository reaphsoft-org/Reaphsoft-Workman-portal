import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useAuth } from './AuthContext';
import {Button, Image} from "react-bootstrap";
import default_profile_image from './i/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg'


const Sidebar = ({user}) => {
    const userAuth = useAuth();
    return (
        <div className="col-xl-3 col-lg-4 m-b30">
            <div className="sticky-top">
                <div className="candidate-info">
                    <div className="candidate-detail text-center">
                        <div className="canditate-des">
                            <Image
                                alt={user.fullname}
                                width={200}
                                src={ user.photoURL !== '' ? `http://localhost:3001/${user.photoURL}` : default_profile_image}
                            />
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