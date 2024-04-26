import { Link, Navigate } from 'react-router-dom';
import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Toast, ToastContainer } from "react-bootstrap";
import {IoAnalyticsSharp} from "react-icons/io5";

function Login() {
  const user = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    account: "1"
  });
  const [showToast, setShowToast] = useState({ message: "", show: false });
  const [disableButton, setDisableButton] = useState('');
  const [errorText, setErrorText] = useState("");

  const [accountType, setAccountType] = useState({type: 1});
  const customBtnClass = "site-button float-left";

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (event) => {
    console.log('hit0');
    event.preventDefault();
    data.account = `${accountType.type}`;
    if (disableButton !== "") {
      return;
    }
    setDisableButton(" disabled");
    const formData = JSON.stringify(data);
    try {
      const response = await fetch('http://localhost:3001/auth/login/', {
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
        user.login({token: responseData.access_token, account: data.account});
        window.location.href = "/user/dashboard/";
      } else {
        setErrorText(responseData.resp);
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
        <div className="">
          <div className="">
            <div>
              <div></div>
              <div className="section-full">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="align-self-center">
                        <div className="logo reaphlogo">
                          <Link to="/" className="text-decoration-none">
                              <img
                                  style={{ height: "200px", width: "200px" }}
                                  src="../asset/image/001-removebg-preview.png"
                                  alt="app logo" />
                          </Link>
                        </div>
                        <h3 className="text-black">Reaphsoft Workmen Portal Login</h3>
                        <h6 className="text-black">Welcome to the Reaphsoft Workman Portal Login</h6>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="">
                          <p className="text-body">Please log in if you have an account with us.</p>
                          <div className="my-2">
                              <p className="text-black form-label">Account Type</p>
                              <div className="col-12 p-a0">
                                  <div className="row">
                                      <div className="col-6 p-0 pe-1 d-grid">
                                          <button
                                              className={accountType.type === 1 ? "btn btn-warning disabled" : "btn btn-outline-secondary"}
                                              onClick={() => setAccountType({type: 1})} type="button">
                                              Individual
                                          </button>
                                      </div>
                                      <div className="col-6 p-0 ps-1 d-grid">
                                          <button
                                              className={accountType.type === 2 ? "btn btn-warning disabled" : "btn btn-outline-secondary"}
                                              onClick={() => setAccountType({type: 2})} type="button">
                                              Estate
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <form onSubmit={handleSubmit}>
                              <div className="form-group "><label>Email Address</label>
                                  <div className="input-group">
                                      <input type="email" required placeholder='johndoe123@gmail.com' className="form-control"
                                             autoComplete="email" name="email" value={data.email} onChange={handleInputChange} />
                                  </div>
                              </div>
                              <div className="form-group"><label>Password</label>
                                  <div className="input-group">
                                      <input type="password" required placeholder='*********' className="form-control"
                                             autoComplete="current-password" name="password" value={data.password}
                                             onChange={handleInputChange} />
                                  </div>
                              </div>
                              <div className="form-text text-danger my-3 px-1">{errorText}</div>
                              <div className="text-center">
                                  <button type="submit" className={customBtnClass + disableButton}>Login</button>
                                  {/*<Link className="site-button-link forget-pass m-t15 float-right" to="/register/"><i className="fa fa-unlock-alt"></i> Sign up</Link>*/}
                              </div>
                          </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="login-footer">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 text-center"><span className="float-left">© <a href="/" className="text-decoration-none"> Reaphsoft</a></span></div>
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