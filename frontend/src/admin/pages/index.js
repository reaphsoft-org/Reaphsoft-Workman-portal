import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
    return (  
        
        <section className="content">
            <div className="">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-9 col-md-6 col-sm-12">
                            <h2>Dashboard</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="index.html" className="text-decoration-none"><i className="zmdi zmdi-home"></i> Reaphsoft Workman Portal</a></li>
                                <li className="breadcrumb-item active">Reaphsoft Workman Portal DashBoard</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card widget_2 big_icon sales">
                                <div className="body">
                                    <h6></h6>
                                    <h2>200 <small className="info">Worker</small></h2>
                                    <small>Total Registered Workman</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card widget_2 big_icon email">
                                <div className="body">
                                    <h6></h6>
                                    <h2>50 <small className="info">User</small></h2>
                                    <small>Total Registered User</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card widget_2 big_icon domains">
                                <div className="body">
                                    <h6></h6>
                                    <h2>74 <small className="info">Estate</small></h2>
                                    <small>Total Registered Estate</small>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card widget_2 big_icon domains">
                                <div className="body">
                                    <h6></h6>
                                    <h2>74 <small className="info">Estate</small></h2>
                                    <small>Total Registered Estate</small>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Index;