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
      <div className="section">
        <div className="section-2">
          <div className="section-3">
              <div className="main">
                <div className="main-1">
                <img src={logo} alt="" />
                  <h1>Login</h1>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry.</p>
                  <div className="icons">
                  <FaFacebookF />
                  <FiMail/>
                  <FiLinkedin/>
                  <FiInstagram/>
                  <FiX/>
                  </div>
                </div>

                <div className="main-2">

                  <div className="bg">
                    <p>if you have an account with us, please log in.</p>
                    <label htmlFor="email">
                      Email Address*
                    </label>
                    <input type="email" required placeholder='johndoe123@gmail.com' />
                    <label htmlFor="password">
                      Password*
                    </label>
                    <input type="password" required placeholder='******' />

                    <div className="btn">
                      <button>Login</button>
                      <Link to="/register" className="sign">
                        <IoLockOpen /> Sign up
                      </Link>
                    </div>
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
