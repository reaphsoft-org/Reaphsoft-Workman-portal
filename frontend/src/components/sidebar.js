import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useAuth } from './AuthContext';
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
                            <div className="">
                                <h5 className="m-b5"><a className="link-offset-2 link-underline-primary text-decoration-none text-black">{user.fullname}</a>
                                </h5>
                                <p className="m-b0"><a className="link-offset-2 link-underline-secondary text-black">{user.address}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <ul>
                    {user.accountType === 1 &&
                        <div >
                            <li >
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
                                <Link to="/user/request/" className='text-decoration-none'>
                                    
                                    <span>Workman Request</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/job/" className='text-decoration-none'>
                                    <span>Request History</span>
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
                                <Link variant="link" className="link-offset-3 text-decoration-none" onClick={() => logout(userAuth)}>
                                    <span>Log Out</span>
                                </Link>
                            </li>
                        </div>
                    }
                    {user.accountType === 2  &&
                        <>
                            <li >
                                <Link to="/user/" className='text-decoration-none'>
                                    <span> Estate Dashboard</span>
                                </Link>
                            </li>
                                <li>
                                <Link to="/user/profile/" className='text-decoration-none'>
                                    <span>Estate Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/estate/houses/" className='text-decoration-none'>
                                    <span>Estate Houses</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/request/" className='text-decoration-none'>
                                    <span>Estate Workman Request</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/estate/work/requests/" className='text-decoration-none'>
                                    <span>Estate Request History</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/update/" className='text-decoration-none'>
                                    <span>Update Estate Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/change/password/" className='text-decoration-none'>
                                    <span>Change Estate Password</span>
                                </Link>
                            </li>
                            <li>
                                <Link variant="link" className="link-offset-3 text-decoration-none" onClick={() => logout(userAuth)}>
                                    <span>Log Out</span>
                                </Link>
                            </li>
                        </>
                    }
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Sidebar;