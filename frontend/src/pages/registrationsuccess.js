import {Navigate} from "react-router-dom";
import {generateRandomString} from "./Register";
import {Image} from "react-bootstrap";
import logo from "./logo.jpeg";
import React from "react";

export function RegistrationSuccess() {
    const register = localStorage.getItem('register') || generateRandomString()+';;b';
    const codeEmail = register.split(';;');
    const code = codeEmail[0];
    const email = codeEmail[1];
    if (code){
        localStorage.removeItem('register');
    }
    const url = window.location.href;
    return (
        <>
            {url.endsWith(code) ? <SuccessBody email={email} /> : <Navigate to="/register/" />}
        </>
    );
}

const SuccessBody = ({email}) => {
  const logoSize = 80;
  return(
      <div className="row">
          <div className="col-md-6 col-lg-4">
              <div className="bg-white container">
                  <div className="mx-1 my-3">
                      <a href="/">
                  <Image
                  src={logo}
                  width={logoSize}
                  height={logoSize}
                  alt="Logo"
                  className="rounded"
                />
                </a>
                  </div>
              </div>
              <div className="mx-3 my-5">
                  <h3 className="text-secondary text-center">Reaphsoft Workmen Registration</h3>
                  <p className="text-secondary text-center mt-5 mb-3">{email}</p>
                  <h6 className="text-center text-secondary mb-5">Your account has been successfully created with this email. Please click below to login.</h6>
                  <div className="d-grid mx-5">
                      <a className="btn btn-outline-primary" href="/login/">Login</a>
                  </div>
              </div>
          </div>
      <div className="col-md-6 col-lg-8">
        <div className="my-md-5 d-none d-md-block">
          <div style={{height: 20}}></div>
        </div>
        <Image
            className="img-fluid mx-auto d-block"
          src="/assets/images/labour-removebg-preview.png"
        />
      </div>
    </div>
  );
}