import React from "react";
import { useState } from "react";
import SweetAlertComponent, {showAlert} from "../../utils/alert";
import {useAuth} from "../../components/AuthContext";

function AdminLogin () {
    const userAuth = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [disableButton, setDisableButton] = useState(false);

    const showSweetAlert = (type, text, title = "") => {
        let initializer = new SweetAlertComponent();
        initializer.showSweetAlert(type, text, title);
    }

    function login(event){
        setDisableButton(true);
        event.preventDefault();
        fetch("http://localhost:3001/auth/admin/login/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => {
            if (!res.ok) {
                    showAlert(3, "Received a bad response from the server.", "Error");
                    setDisableButton(false);
                    return;
                }
                return res.json();
        }).then(data => {
            if (data.status){
                showSweetAlert(1, "Login Successful", "Success");
                userAuth.loginAdmin({ token: data.access_token });
                window.location.href = "/admin/dashboard/";
            }else {
                showAlert(3, data.resp, 'Error');
                setDisableButton(false);
            }
        }).catch(reason => {
            showAlert(3, reason.message, "Error");
            setDisableButton(false);
        });
    }

    return ( 
        <div className="authentication">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <form className="card auth_form" onSubmit={login}>
                            <div className="header">
                                <img className="logo" src="../asset/image/001-removebg-preview.png" alt=""/>
                                <h5>Admin Login</h5>
                            </div>
                            <div className="input-group my-3 col-10 offset-1 col-md-6 offset-md-3 col-lg-10 offset-lg-1">
                                <input name="email" type="email" required={true} autoComplete="email" className="form-control" onChange={handleInputChange} placeholder="Admin Email"/>
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="zmdi zmdi-account-circle"></i></span>
                                </div>
                            </div>
                            <div className="input-group mb-3 col-10 offset-1 col-md-6 offset-md-3 col-lg-10 offset-lg-1">
                                <input type="password" required={true} className="form-control" autoComplete="current-password" name="password" onChange={handleInputChange} placeholder="Admin Password"/>
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="zmdi zmdi-lock"></i></span>
                                </div>
                            </div>
                            <div className="col-10 offset-1 col-md-6 offset-md-3 my-4">
                                <button type="submit" disabled={disableButton}
                                        className="btn btn-primary btn-block">Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-8 col-sm-12">
                        <div className="card">
                            <img src="../adminAssets/images/signin.svg" alt="Techie" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AdminLogin;