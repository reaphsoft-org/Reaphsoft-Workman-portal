import '../App.css';
import { IoLockOpen } from "react-icons/io5";
import {Link, Navigate} from 'react-router-dom';
import {useState} from "react";
import {useAuth} from "../components/AuthContext";


function Login() {
  const user = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");
  const handleInputChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = JSON.stringify(data);
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok){
        // show toast
        console.log("error");
        return;
      }

      const responseData = await response.json();
      if (responseData.status === true) {
        user.login(data.email);
        window.location.href = "/user/";
      }else {
        setErrorText("Invalid email/password");
      }
    }catch (e) {
      console.error('Error posting form data:', e);
    }
  }
  return (
      <>
      { user.user !== null ? <Navigate to="/user/" /> : <div className="App">
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
                    <form onSubmit={handleSubmit}>
                      <h5 className="mb-4">Please log in if you have an account with us</h5>
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input type="email" required placeholder='johndoe123@gmail.com' className="form-control"
                             autoComplete="email" name="email" value={data.email} onChange={handleInputChange}/>
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" required placeholder='*********' className="form-control"
                             autoComplete="current-password" name="password" value={data.password}
                             onChange={handleInputChange} />
                      <div className="form-text text-danger">{errorText}</div>
                      <div className="row mt-5">
                        <div className="col-6">
                          <div className="d-grid">
                            <button className="btn btn-primary" type="submit">Login</button>
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
    </div>}
      </>
  );
}

export default Login;
