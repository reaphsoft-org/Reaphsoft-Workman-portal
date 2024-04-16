import '../App.css';
import { FaFacebookF } from "react-icons/fa6";
import { FiMail } from 'react-icons/fi'; // Import the FiMail component for Gmail
import { FiLinkedin } from 'react-icons/fi';
import { FiInstagram } from 'react-icons/fi'; // Import the FiInstagram component for Instagram
import { FiX } from 'react-icons/fi';
import { IoLockOpen } from "react-icons/io5";
import { Link } from 'react-router-dom';
import logo from './logo.jpeg';


function Login() {
  return (
    <div className="App">
      <div className="hero_area yes" style={{ width: '100%', height: '100vh' }}>
        <div className="section-2">
          <div className="section-3">
              <div className="main align-item-center">
                <div className="main-1">
                <div className="img-box">
                  <img src="assets/images/001-removebg-preview.png" alt="" style={{ width: '20%' }} />
                </div>
                  <h1>Reaphsoft Workman Portal Login</h1>
                  <p>Welcome to the Reaphsoft Workman Portal Login</p>
                  
                </div>

                <div className="main-2">

                  <div className="bg mb-5">
                    <form>
                      <h5 className="mb-4">Please log in if you have an account with us</h5>
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input type="email" required placeholder='johndoe123@gmail.com' className="form-control" autoComplete="email"/>
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" required placeholder='*********' className="form-control" autoComplete="current-password"/>
                      <div className="row">
                        <div className="col-6">
                          <div className="d-grid">
                            <button className="btn btn-primary">Login</button>
                          </div>
                        </div>
                        <div className="col-6">
                          <Link to="/register" className="btn btn-outline-primary">
                          <IoLockOpen/> Sign up
                        </Link></div>
                      </div>
                    </form>
                  </div>

                </div>

              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
