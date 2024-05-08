import { Link, Navigate } from 'react-router-dom';
import React, {useState} from "react";
import { useAuth } from "../components/AuthContext";
import SweetAlertComponent  from "../utils/alert";
import logo from "../components/i/logo.png";
import styles from "./login.module.css";

function Login() {
  const user = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    account: "1"
  });

  const [disableButton, setDisableButton] = useState('');

  const [errorText, setErrorText] = useState("");
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const showSweetAlert = (type, text, title = "") => {
    let initializer = new SweetAlertComponent();
    initializer.showSweetAlert(type, text, title);
  }
  const handleSubmit = async (event) => {
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
        showSweetAlert(3, "Received a bad response from the server.", "Error");
        // setShowToast({ message: "Received a bad response from the server.", show: true });
        setDisableButton("");
        return;
      }
      const responseData = await response.json();
      if (responseData.status === true) {
        user.login({ token: responseData.access_token, account: data.account });
        showSweetAlert(1, data.resp, "success");
        window.location.href = "/user/";
      } else {
        setErrorText(responseData.resp);
        setDisableButton("");
      }
    } catch (e) {
      showSweetAlert(3, "Encountered server error while posting the form data.", "Error");
      // setShowToast({ message: "Encountered server error while posting the form data.", show: true });
      setDisableButton("");
    }
  }

  const [accountType, setAccountType] = useState({type: 1});
  const customBtnClass = `${styles.siteButton} site-button float-left`;
  return (
    <>
      {user.user !== null ? <Navigate to="/user/" /> :
        <div className="vh-100">
          <div className="page-wraper">
            <div className={`login-style2 ${styles.yes}`}>
              <div className="section-full">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 d-flex bg-light opacity-50 px-5">
                      <div className="text-white max-w400 align-self-center">
                        <div className="logo reaphlogo">
                          <Link to="/" className="text-decoration-none">
                            <img src={logo} alt="logo" />
                          </Link>
                        </div>
                        <h3 className="text-black">Reaphsoft Workmen</h3>
                        <h6 className="text-black">Welcome to the Reaphsoft Workman Login Page</h6>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="login-2 submit-resume p-a30 seth">
                        <div className="nav">
                            <p className="text-body">Please log in if you have an account with us.</p>
                            <div className="my-2">
                              <strong className="text-black form-label">Account Type</strong>
                            </div>
                          <form className="col-12 p-a0 " onSubmit={handleSubmit}>
                            <div className="row mb-3">
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
                              <Link
                              className="site-button-link forget-pass m-t15 float-right"
                              to="/register/"> Sign up</Link></div>
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
                    <div className="col-lg-12 text-center"><span className="float-left">© <a href="/" className="text-decoration-none">Reaphsoft</a></span></div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Login;
