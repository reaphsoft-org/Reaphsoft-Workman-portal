import React from "react";
import { useUser } from "../components/UserContext";

const Request = ({ user }) => {
    const { gege } = useUser();

    console.log(gege);
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     data.account = `${accountType.type}`;
    //     if (disableButton !== "") {
    //         return;
    //     }
    //     setDisableButton(" disabled");
    //     const formData = JSON.stringify(data);
    //     try {
    //         const response = await fetch('http://localhost:3001/auth/login/', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (!response.ok) {
    //             showSweetAlert(3, "Received a bad response from the server.", "Error");
    //             // setShowToast({ message: "Received a bad response from the server.", show: true });
    //             setDisableButton("");
    //             return;
    //         }
    //         const responseData = await response.json();
    //         if (responseData.status === true) {
    //             user.login({ token: responseData.access_token, account: data.account });
    //             showSweetAlert(1, data.resp, "success");
    //             window.location.href = "/user/";
    //         } else {
    //             setErrorText(responseData.resp);
    //             setDisableButton("");
    //         }
    //     } catch (e) {
    //         showSweetAlert(3, "Encountered server error while posting the form data.", "Error");
    //         // setShowToast({ message: "Encountered server error while posting the form data.", show: true });
    //         setDisableButton("");
    //     }
    // }
    return (
        <div className="col-xl-9 col-lg-8 m-b30">
            <div className="col-xl-10 col-lg-10 m-b30">
                <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">Post A Job</h5>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Work Title</label>   
                                    <input type="text" className="form-control" placeholder="Enter Job Title" spellCheck="false" data-ms-editor="true" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Your email</label>
                                    <input type="email" className="form-control" placeholder="info@gmail.com" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Services</label>
                                    <select className="custom-select custom-select" >
                                    <option>IKEA Assembly</option>
                                    <option>TV Mounting</option>
                                    <option>Furniture Assembly</option>
                                    <option>General Mounting</option>
                                    <option>Help Moving</option>
                                    <option>Cleaning</option>
                                    <option>Door, Carbinet & Furniture</option>
                                    <option>Heavy Lifting & Loading</option>
                                    <option>Electrical Help</option>
                                    <option>Plumbing Help</option>
                                </select></div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Minimum Salary (&#8358;):</label>
                                    <input type="email" className="form-control" placeholder="e.g. 10000" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Maximum Salary (&#8358;):</label>
                                    <input type="text" className="form-control" placeholder="e.g. 20000" spellCheck="false" data-ms-editor="true" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Date Needed:</label>
                                    <input type="date" className="form-control" placeholder=" 2020-01-01" spellCheck="false" data-ms-editor="true" />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" className="form-control" placeholder="London" spellCheck="false" data-ms-editor="true" />
                                </div>
                            </div>
                        </div>
                        <button type="button" className="site-button m-b30 mt-4">Request Worker</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Request;