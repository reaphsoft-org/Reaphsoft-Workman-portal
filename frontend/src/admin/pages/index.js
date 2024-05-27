import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../../components/AuthContext";
import {showAlert} from "../../utils/alert";
import {BACKEND_DOMAIN} from "../../utils/konstants";

const Index = () => {
    const userAuth = useAuth();
    const [data, setData] = useState({
        registeredWorkers: 0,
        users: 0,
        estates: 0,
        requests: 0,
        recentWorkmen: [],
        recentUsers: [],
        recentEstates: []
    });
    useEffect(() => {
        fetch(`${BACKEND_DOMAIN}/admin/dashboard/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userAuth.admin.token,
            'Content-Type': 'application/json'
          }
        }).then(res =>{
            if (res.status !== 200){
                showAlert(3, `Error with status code ${res.status}`, 'Error');
                return;
            }
            return res.json();
        }).then(data => {
            if (!data){
                showAlert(3, 'Unable to get admin dashboard', 'Error');
            }else {
                setData(data);
            }
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        });
    }, [userAuth, userAuth.admin.token]);
    return (
        <section className="content">
            <div className="">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-9 col-md-6 col-sm-12">
                            <h2>Dashboard</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/admin/dashboard/" className="text-decoration-none">
                                        <i className="zmdi zmdi-home"></i>Reaphsoft Workman Portal</Link>
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
                                    <div className="py-1"></div>
                                    <h2>{data.registeredWorkers} <small className="info">Workers</small></h2>
                                    <small>Total Registered Workmen</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card widget_2 big_icon email">
                                <div className="body">
                                    <div className="py-1"></div>
                                    <h2>{data.users} <small className="info">Users</small></h2>
                                    <small>Total Registered Users</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card widget_2 big_icon domains">
                                <div className="body">
                                    <div className="py-1"></div>
                                    <h2>{data.estates} <small className="info">Estates</small></h2>
                                    <small>Total Registered Estates</small>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card widget_2 big_icon domains">
                                <div className="body">
                                    <div className="py-1"></div>
                                    <h2>{data.requests} <small className="info">Requests</small></h2>
                                    <small>Total Workman Requests</small>
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
                                    <h2 className="px-3"><strong>Recent Workers in the Workman Portal</strong></h2>
                                </div>
                                <div className="body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Service</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                data.recentWorkmen.map((workman, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{workman.fullname}</td>
                                                        <td>{workman.service}</td>
                                                        <td>{workman.email}</td>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recent Users with limit by 5 */}
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="header">
                                    <h2 className="px-3"><strong>Recent Users who joined the Workman Portal</strong></h2>
                                </div>
                                <div className="body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>NAME</th>
                                                    <th>APARTMENT</th>
                                                    <th>EMAIL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                data.recentUsers.map((user, index) =>
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.apartment}</td>
                                                    <td>{user.email}</td>
                                                </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recent Estates with limit by 5 */}
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="header">
                                    <h2 className="px-3"><strong>Recent Estates who joined the Workman Portal</strong></h2>
                                </div>
                                <div className="body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>NAME</th>
                                                    <th>ESTATE</th>
                                                    <th>EMAIL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                data.recentEstates.map((user, index) =>
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.estate}</td>
                                                    <td>{user.email}</td>
                                                </tr>
                                                )
                                            }
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