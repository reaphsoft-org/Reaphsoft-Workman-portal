import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../components/AuthContext";
import {showAlert} from "../utils/alert";

const Dashboard = ({user}) => {
    const [workRequests, setWorkRequests] = useState([]);
    const userAuth = useAuth();
    useEffect(() => {
        try {
             fetch('http://localhost:3001/workmen/requested/services/?recent=true', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuth.user.token}`
                },
            }).then((res) => {
                if (!res.ok) {
                    showAlert(3, "Received a bad response from the server when loading recent work requests.", "Error");
                    return;
                }
                return res.json();
             })
                 .then(responseData => {
                    setWorkRequests(responseData);
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                 });
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
        }
    }, [userAuth.user.token]);
    return ( 
        <div className="col-xl-9 col-lg-8 m-b30 text-black">
            <div id="personal_details_bx" className="job-bx bg-white m-b30">
                <div className="d-flex">
                    <h5 className="m-b30">Personal Details</h5>
                    <Link className="site-button add-btn btn-sm text-decoration-none"
                        to="/user/update/"><i className="ti-pencil me-2"></i>Edit Account</Link>
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
                    <h5 className="font-weight-700 pull-left text-uppercase text-black">Recent Requests</h5>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Accepted</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                    {workRequests.map((workRequest, index) => (
                        <tr key={index}>
                            <td className="job-name text-decoration-none">{workRequest.worker}</td>
                            <td className="criterias text-decoration-none">{workRequest.accepted ? 'Accepted' : 'Pending'}</td>
                            <td className="date text-decoration-none">{new Date(workRequest.date_created).toLocaleString()}</td>
                        </tr>
                    ))}
                        {/*Electrician, Cleaner*/}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}
 
export default Dashboard;