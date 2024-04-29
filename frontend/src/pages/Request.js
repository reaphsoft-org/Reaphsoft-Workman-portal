import React from "react";
import { useUser } from "../components/UserContext";

const Request = ({ user }) => {
    const { service } = useUser();
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
                                    <label>Services</label>
                                    <select className="custom-select custom-select" >
                                        {service?.map((service, index) => (<option key={index}>{service}</option>))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Select Worker</label>
                                    <select className="custom-select custom-select" >
                                        <option>IKEA Assembly</option>
                                    </select>
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
                                    <input type="text" className="form-control" placeholder="Lagos" spellCheck="false" data-ms-editor="true" />
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-16">
                                <p>Please Note: The Services Selected are concordant with your Worker Skills</p>
                            </div>
                        </div>
                        <button type="button" className="site-button m-b30 mt-4 align-center">Request Worker</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Request;