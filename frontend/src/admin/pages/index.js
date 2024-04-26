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
                                    <Link to="dashboard" className="text-decoration-none">
                                        <i className="zmdi zmdi-home"></i> Reaphsoft Workman Portal</Link>
                                </li>
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
                                    <h2>300 <small className="info">Request</small></h2>
                                    <small>Total Workman Request</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recent Worker with limit by 5 */}
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="header">
                                    <h2 className="px-3"><strong>Recent Worker Who Just Join the Workman Portal</strong></h2>
                                </div>
                                <div className="body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Full NAME</th>
                                                    <th>WORKER SKILL</th>
                                                    <th>EMAIL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark Ogunlaye</td>
                                                    <td>Painter</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Mark Johnson</td>
                                                    <td>Painter</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Mark Johnson</td>
                                                    <td>Plumber</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>Mark Johnson</td>
                                                    <td>Ikea Assembly Man</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>Mark Ogundiji</td>
                                                    <td>Painter</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
                {/* Recent Worker with limit by 5 */}
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="header">
                                    <h2 className="px-3"><strong>Recent Client Who Just Join the Workman Portal</strong></h2>
                                </div>
                                <div className="body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Full NAME</th>
                                                    <th>APARtMent SKILL</th>
                                                    <th>EMAIL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark Ogunlaye</td>
                                                    <td>Apartment 2</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Mark Johnson</td>
                                                    <td>Apartment 2B</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Mark Johnson</td>
                                                    <td>Plumber</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>Mark Johnson</td>
                                                    <td>Apartment 2A</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>Mark Ogundiji</td>
                                                    <td>Apartment 2B</td>
                                                    <td>markjohn@gmail.com</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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