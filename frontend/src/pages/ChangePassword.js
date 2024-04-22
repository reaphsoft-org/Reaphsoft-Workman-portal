import React from "react";
import { Col, Form, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import { useAuth } from "../components/AuthContext";
import Sidebar from "../components/sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const ChangePassword = () => {
    const user = useAuth();
    return ( 
        <div className="page-wrapper">
            <Navbar />
             <div className="page-content bg-white">
             <div className="content-block">
                 <div className="section-full bg-white browse-job p-t50 p-b20">
                     <div className="container">
                         <div className="row">
                             <Sidebar />
                             <Col xl={9} lg={8} className="m-b30">
                                 <div className="col-xl-9 col-lg-8 m-b30">
                                     <div className="job-bx job-profile">
                                         <div className="job-bx-title clearfix">
                                             <h5 className="font-weight-700 pull-left text-uppercase">Change Password</h5>
                                            
                                         </div>
                                         <form>
                                             <div className="row">
                                                 <div className="col-lg-12 ">
                                                     <div className="form-group"><label>Old Password</label><input type="password" className="form-control mt-2"/>
                                                     </div>
                                                 </div>
                                                 <div className="col-lg-6">
                                                     <div className="form-group "><label>New Password </label><input type="password" className="form-control mt-2"/>
                                                     </div>
                                                 </div>
                                                 <div className="col-lg-6">
                                                     <div className="form-group"><label>Confirm New Password</label><input type="password"
                                                         className="form-control mt-2"/></div>
                                                 </div>
                                                 <div className="col-lg-12 m-b10"><button className="site-button mt-4">Update Password</button></div>
                                             </div>
                                         </form>
                                     </div>
                                 </div>
                             </Col>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
            <Footer />
        </div>
        
     );
}
 
export default ChangePassword;