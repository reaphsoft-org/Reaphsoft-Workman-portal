import React from "react";
import {Link} from "react-router-dom";
import { useState } from "react";
import { useAdmin } from "../../components/AdminContext";

const AdminLogin = () => {
    const { adminLogin } = useAdmin();
    const [data, setData] = useState({
      email: "",
      password: "",
    });

    const handleInputChange = (e) => {
        setData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      };
    const handleSubmit = (event) => {
      event.preventDefault();
      adminLogin(data);
    }

    console.log(data);
    return ( 
        <div className="authentication">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <form className="card auth_form" onSubmit={handleSubmit}>
                            <div className="header">
                                <img className="logo" src="../asset/image/001-removebg-preview.png" alt=""/>
                                    <h5>Log in</h5>
                            </div>
                            <div className="body">
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" name="email" value={data.email} onChange={handleInputChange} placeholder="Admin Email"/>
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="zmdi zmdi-account-circle"></i></span>
                                        </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" name="password" value={data.password} onChange={handleInputChange} placeholder="Admin Password"/>
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="zmdi zmdi-lock"></i></span>
                                        </div>
                                </div>
                                
                                
                            </div>
                            <button type="submit" className="btn btn-primary btn-block waves-effect waves-light">SIGN IN</button>
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
 
export default AdminLogin;