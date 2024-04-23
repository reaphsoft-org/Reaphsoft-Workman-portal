import React from "react";

const Dashboard = ({user}) => {
    return ( 
        <div className="col-xl-12 col-lg-12 m-b30 browse-job">
            <div id="key_skills_bx" className="job-bx bg-white m-b30">
                <div className="d-flex">
                    <h5 className="m-b15">Key Services</h5>
                </div>
                <div className="job-time mr-auto"><a className="mr-1" href=""><span>Painting</span></a><a
                    className="mr-1" href=""><span>IKEA Assembly</span></a><a className="mr-1"
                        href=""><span>Furniture Repair</span></a></div>
            </div>
            <div id="personal_details_bx" className="job-bx bg-white m-b30">
                
                <div className="d-flex">
                    <h5 className="m-b30">Personal Details</h5><a className="site-button add-btn button-sm"
                        href="/react/demo/jobs-my-resume"><i className="fa fa-pencil m-r5"></i> Edit</a>
                </div>
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-9">
                        <div className="clearfix m-b20"><label className="m-b0">Apartment</label><span className="clearfix font-13">{user.apartment}</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Email</label><span className="clearfix font-13">{user.email}</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Full Name</label><span className="clearfix font-13">{user.fullname}</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Phone Number</label><span className="clearfix font-13">undefined</span></div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
}
 
export default Dashboard;