import React from "react";
import {Link} from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../admin/components/AdminAuthContext";
import SweetAlertComponent from "../../utils/alert";

function Login () {
    const user = useAuth();
    const [data, setData] = useState({
    email: "",
    password: "",
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
    if (disableButton !== "") {
      return;
    }
    setDisableButton(" disabled");
    const formData = JSON.stringify(data);
    try {
      const response = await fetch('http://localhost:3001/admin/login/', {
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
        window.location.href = "http://localhost:3000/dashboard/";
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

    return ( 
        <div className="authentication">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <form className="card auth_form" >
                            <div className="header">
                                <img className="logo" src="../asset/image/001-removebg-preview.png" alt=""/>
                                    <h5>Log in</h5>
                            </div>
                            <div className="body">
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" name="email" value={data.email} onChange={handleInputChange}  placeholder="Admin Email"/>
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="zmdi zmdi-account-circle"></i></span>
                                        </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="" className="form-control" name="password" value={data.password}
                                  onChange={handleInputChange} placeholder="Admin Password"/>
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="zmdi zmdi-lock"></i></span>
                                        </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block waves-effect waves-light"  disableButton>Login</button>
                                {/* <Link to="" className="btn btn-primary btn-block waves-effect waves-light">SIGN IN</Link> */}
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-8 col-sm-12">
                        <div className="card">
                            <img src="../adminAssets/images/signin.svg" alt="Sign In" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;