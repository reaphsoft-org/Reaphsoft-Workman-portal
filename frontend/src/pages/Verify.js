// 18/06/2024 19:40
// reaphsoft-workman
// github.com/kahlflekzy

import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styles from "./login.module.css";
import logo from "../components/i/logo.png";
import {Button, Spinner} from "react-bootstrap";
import {BACKEND_DOMAIN} from "../utils/konstants";
import {showAlert} from "../utils/alert";

export function Verify () {
    const { email } = useParams();
    const { token } = useParams();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('Please reload the page.');
    useEffect(() => {
        fetch(`${BACKEND_DOMAIN}/verify/user/${email}/${token}/`,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
            )
            .then((res) => {
                setLoading(false);
                if (!res.ok){
                    showAlert(3,
                        `Got a bad response from the server. Please contact the administrators. <${res.statusText}>`,
                        "Error");
                    return;
                }
                return res.json();
            })
            .then((result) => {
                setSuccess(result.status);
                setMessage(result.resp);
            })
            .catch((reason) => {
                setLoading(false);
                showAlert(3, reason.message, "Error");
            });
    }, [email, token]);
    return (
        <>
            <div className="vh-100">
              <div className="page-wraper">
                <div className={`login-style2 ${styles.yes}`}>
                  <div className="section-full">
                    <div className="container">
                      <div className="row gy-2 gy-md-0">
                        <div className="col-md-5 col-11 bg-tpw4 px-3 px-md-5 ms-md-0 ms-3 d-none d-md-block">
                          <div className="max-w4001 align-self-center py-5">
                            <div className="logo">
                              <Link to="/" className="text-decoration-none">
                                <img src={logo} alt="logo" />
                              </Link>
                            </div>
                            <div className="text-dark text-center">
                              <h3>Reaphsoft Workmen</h3>
                              <h6>Account Verification</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 ms-auto">
                          <div className="login-2 submit-resume p-a30 seth">
                            <div>
                                { loading ?
                                    <>
                                        <h6 className="text-center">Please wait while we verify your account.</h6>
                                        <div className="my-5 d-flex justify-content-center">
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    </>
                                    :
                                    <>
                                    {
                                        success ?
                                            <>
                                                <h6 className="text-center">We have successfully verified your account.</h6>
                                                <p className="text-center">{message}</p>
                                                <div className="d-grid">
                                                    <Button href="/login/" variant="warning">Login</Button>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <h6 className="text-center">We were unable to verify your account.</h6>
                                                <p className="text-center">{message}</p>
                                            </>
                                    }
                                    </>
                                }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <footer className="login-footer">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 text-center"><span className="float-left">© <a href="/" className="link-offset-2">Reaphsoft Limited</a></span></div>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
        </>
    );
}