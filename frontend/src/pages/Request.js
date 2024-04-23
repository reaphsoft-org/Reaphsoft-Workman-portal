import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Request = ({user}) => {
    return (
        <div className="col-xl-9 col-lg-8 m-b30 browse-job">
            <div className="col-xl-9 col-lg-8 m-b30">
                <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">Post A Job</h5>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group"><label>Work Title</label><input type="text"
                                    className="form-control" placeholder="Enter Job Title" spellCheck="false" data-ms-editor="true" /></div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group"><label>Your email</label><input type="email"
                                    className="form-control" placeholder="info@gmail.com" /></div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group"><label>Services</label><select
                                    className="custom-select custom-select" >
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
                                <div className="form-group"><label>Minimum Salary (&#8358;):</label><input
                                    type="email" className="form-control" placeholder="e.g. 10000" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group"><label>Maximum Salary (&#8358;):</label><input
                                    type="text" className="form-control" placeholder="e.g. 20000"
                                    spellCheck="false" data-ms-editor="true" /></div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group"><label>Date Needed:</label><input
                                    type="text" className="form-control" placeholder=" 2020-01-01"
                                    spellCheck="false" data-ms-editor="true" /></div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group"><label>Location</label><input type="text"
                                    className="form-control" placeholder="London" spellCheck="false"
                                    data-ms-editor="true" /></div>
                            </div>
                        </div><button type="button" className="site-button m-b30 mt-4">Request Worker</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Request;