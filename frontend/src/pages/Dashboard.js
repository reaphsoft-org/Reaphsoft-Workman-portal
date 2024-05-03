import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({user}) => {
    return ( 
        <div className="col-xl-9 col-lg-8 m-b30 text-black">
            <div id="personal_details_bx" className="job-bx bg-white m-b30">
                
                <div className="d-flex">
                    <h5 className="m-b30">Personal Details</h5>
                    <Link className="site-button add-btn button-sm text-decoration-none"
                        to="/user/update/"><i className="fa fa-pencil m-r5"></i> 
                        Edit Account</Link>
                </div>
                <div className="row text-black">
                    <div className="col-lg-9 col-md-9 col-sm-9">
                        <div className="clearfix m-b20"><label className="m-b0">Full Name</label><span className="clearfix font-13 text-black">{user.fullname}</span></div>
                        <div className="clearfix m-b20"><label className="m-b0">Email</label><span className="clearfix font-13 text-black">{user.email}</span></div>
                        {user.accountType === 1 ? <div className="clearfix m-b20"><label className="m-b0">Apartment</label><span className="clearfix font-13 text-black">{user.apartment}</span></div> :
                            <div className="clearfix m-b20"><label className="m-b0">Estate</label><span className="clearfix font-13 text-black">{user.estate}</span></div>}
                        <div className="clearfix m-b20"><label className="m-b0">Service Type</label><span className="clearfix font-13 text-black">{user.serviceType === 1 ? 'Priority' : 'Priority Plus'}</span></div>
                    </div>
                    
                </div>
            </div>
            <div className="job-bx table-job-bx browse-job clearfix">
                <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase text-black">Recent Request</h5>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Skills</th>
                            <th>Comment</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="job-name"><a href="">Electrician</a></td>
                            <td className="criterias">Lorem Ipsum is simply dummy text.</td>
                            <td className="date">December 15,2018</td>
                        </tr>
                        
                        <tr>
                            <td className="job-name"><a href="">Cleaner</a></td>
                            <td className="criterias">Lorem Ipsum is simply dummy text.</td>
                            <td className="date">November 10,2018</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}
 
export default Dashboard;