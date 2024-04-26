import { IoAnalyticsSharp } from "react-icons/io5";
import { Link, Navigate } from 'react-router-dom';
import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Toast, ToastContainer } from "react-bootstrap";

function Login() {
  const user = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showToast, setShowToast] = useState({ message: "", show: false });
  const [disableButton, setDisableButton] = useState('');

  const [errorText, setErrorText] = useState("");
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (disableButton !== "") {
      return;
    }
    setDisableButton(" disabled");
    const formData = JSON.stringify(data);
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setShowToast({ message: "Received a bad response from the server.", show: true });
        setDisableButton("");
        return;
      }
      const responseData = await response.json();
      if (responseData.status === true) {
        console.log(data.email);
        user.login(data.email);
        window.location.href = "/user/dashboard/";
      } else {
        setErrorText("Invalid email/password");
        setDisableButton("");
      }
    } catch (e) {
      setShowToast({ message: "Encountered server error while posting the form data.", show: true });
      setDisableButton("");
    }
  }
  return (
    <>
      {user.user !== null ? <Navigate to="/user/" /> :
        <div className="vh-100">
          <div className="page-wraper">
              
            <div className="page-content bg-white login-style2 yes" style={{ position: "relative" }}>
              <div style={{ backgroundColor: "#fafafa", width: "100vw", minHeight: "114vh", position: "absolute", opacity: "0.5" }}></div>
              <div className="section-full">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="text-white max-w400 align-self-center">
                        <div className="logo reaphlogo">
                          <Link to="/" style={{ height: "20px", width: "20px" }} className="text-decoration-none"><img
                            src="../asset/image/001-removebg-preview.png"
                            alt="" /></Link>
                        </div>
                        <h3 className="text-black">Reaphsoft Workmen Portal Login</h3>
                        <h6 className="text-black">Welcome to the Reaphsoft Workman Portal Login</h6>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="login-2 submit-resume p-a30 seth">
                        <div className="nav">
                          <form className="col-12 p-a0 " onSubmit={handleSubmit}>
                            <p className="font-weight-600 text-black">If you have an account with us, please log in.</p>
                            <div className="form-group "><label>E-Mail Address*</label>
                              <div className="input-group">
                                <input type="email" required placeholder='johndoe123@gmail.com' className="form-control"
                                  autoComplete="email" name="email" value={data.email} onChange={handleInputChange} />
                              </div>
                            </div>
                            <div className="form-group"><label>Password *</label>
                              <div className="input-group">
                                <input type="password" required placeholder='*********' className="form-control"
                                  autoComplete="current-password" name="password" value={data.password}
                                  onChange={handleInputChange} />
                              </div>
                            </div>
                            <div className="form-text text-danger mt-2 px-1">{errorText}</div>
                            <div className="text-center"><button className={"site-button float-left" + disableButton}>login</button><Link
                              className="site-button-link forget-pass m-t15 float-right"
                              to="/register/"><i className="fa fa-unlock-alt"></i> Sign
                              up</Link></div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="login-footer">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 text-center"><span className="float-left">© <a href="#" className="text-decoration-none"> Reaphsoft</a></span></div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
          <ToastContainer className="p-3" position="bottom-center" style={{ zIndex: 1 }}>
            <Toast show={showToast.show} onClose={() => { setShowToast({ message: "", show: false }) }}>
              <Toast.Header>
                <IoAnalyticsSharp />
                <strong className="ms-3 me-auto">Server Response</strong>
              </Toast.Header>
              <Toast.Body>{showToast.message}</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>

      }
    </>
  );
}

export default Login;
