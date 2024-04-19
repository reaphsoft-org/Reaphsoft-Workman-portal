import React from "react";
import { Col, Form, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import { useAuth } from "../components/AuthContext";
import Sidebar from "../components/sidebar";

const Request = () => {
    return ( 
        <div className="page-content bg-white">
            <div className="content-block">
                <div className="section-full bg-white browse-job p-t50 p-b20">
                    <div className="container">
                        <div className="row">
                            <Sidebar />
                            <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Request;