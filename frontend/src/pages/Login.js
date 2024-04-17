import { IoLockOpen } from "react-icons/io5";
import {Link, Navigate} from 'react-router-dom';
import React, {useState} from "react";
import {useAuth} from "../components/AuthContext";
import {Image} from "react-bootstrap";


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
      { user.user !== null ? <Navigate to="/user/" /> :
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="container">
                <a href="/"><Image
                    src="/assets/images/001-removebg-preview.png" alt=""
                    width={90}
                    className="mt-3"
                /></a>
                <div className="my-3 text-center">
                  <h3>Reaphsoft Workmen Login</h3>
                  <h6>Welcome to the Reaphsoft Workman Portal Login</h6>
                </div>
                <div className="my-5 ms-lg-3">
                  <form onSubmit={handleSubmit}>
                    <p className="mb-3">Please log into your account</p>
                    <div className="mb-3"><label htmlFor="email" className="form-label">Email</label>
                      <input type="email" required placeholder='johndoe123@gmail.com' className="form-control"
                             autoComplete="email" name="email" value={data.email} onChange={handleInputChange}/></div>
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
                        <div className="d-grid">
                          <Link to="/register" className="btn btn-outline-primary">
                            <IoLockOpen className="me-3"/> Sign up
                          </Link></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-8">
        <div className="my-md-5 my-lg-3 d-none d-md-block">
          <div style={{height: 10}}></div>
        </div>
        <Image
            className="img-fluid mx-auto d-block"
          src="/assets/images/labour-removebg-preview.png"
        />
      </div>
          </div>
      }
      </>
  );
}

export default Login;
