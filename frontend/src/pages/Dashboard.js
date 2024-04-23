import React from "react";

const Dashboard = () => {
    return ( 
        <div classNameName="col-xl-12 col-lg-12 m-b30 browse-job">
            <div id="key_skills_bx" class="job-bx bg-white m-b30">
                <div class="d-flex">
                    <h5 class="m-b15">Key Services</h5>
                </div>
                <div class="job-time mr-auto"><a class="mr-1" href=""><span>Painting</span></a><a
                    class="mr-1" href=""><span>IKEA Assembly</span></a><a class="mr-1"
                        href=""><span>Funiture Repair</span></a></div>
            </div>
            <div id="personal_details_bx" className="job-bx bg-white m-b30">
                
                <div className="d-flex">
                    <h5 className="m-b30">Personal Details</h5><a className="site-button add-btn button-sm"
                        href="/react/demo/jobs-my-resume"><i className="fa fa-pencil m-r5"></i> Edit</a>
                </div>
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-9">
                        <div className="clearfix m-b20"><label className="m-b0">Service</label><span className="clearfix font-13"></span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Gender</label><span className="clearfix font-13">male</span>
                        </div>
                        <div className="clearfix m-b20"><label className="m-b0">Marital Status</label><span
                            className="clearfix font-13">Single / unmarried</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Passport Number</label><span className="clearfix font-13">+
                            123 456 7890</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Differently Abled</label><span
                            className="clearfix font-13">None</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Languages</label><span
                            className="clearfix font-13">English</span></div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="clearfix m-b20"><label className="m-b0">Permanent Address</label><span
                            className="clearfix font-13">Add Permanent Address</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Area Pin Code</label><span
                            className="clearfix font-13">302010</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Hometown</label><span
                            className="clearfix font-13">Delhi</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Work permit of other country</label><span
                            className="clearfix font-13">USA</span></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default Dashboard;