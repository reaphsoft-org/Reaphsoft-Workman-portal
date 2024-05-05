import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {useAuth} from "../../components/AuthContext";
import {showAlert} from "../../utils/alert";

const Users = () => {
    const userAuth = useAuth();
    const [page, setPage] = useState(1);
    const [usersData, setUsersData] = useState({
        pages: 0,
        data: []
    });
    useEffect(() => {
        fetch(`http://localhost:3001/admin/users/${page}/`,{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userAuth.admin.token,
            'Content-Type': 'application/json'
          }
        }).then(res => {
                if (!res.ok){
                    showAlert(3, 'Error while loading users', 'Error');
                    return;
                }
                return res.json();
            }
        ).then(data => {
            setUsersData(data);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        })
    }, [page, userAuth.admin.token]);
    return ( 
        <section className="content">
            <div className="body_scroll">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Clients List</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="">
                                    <i className="zmdi zmdi-home"></i> Reaphsoft Workman Portal</a>
                                </li>
                                <li className="breadcrumb-item">Users</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="table-responsive">
                                    <table className="table c_table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Address</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            usersData.data.map((user, index) =>
                                            <tr>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.address}</td>
                                                <td>
                                                    <Button className="btn-sm btn-default"><i className="zmdi zmdi-edit"></i></Button>
                                                    <Button variant="danger" className="btn-sm btn-default"><i className="zmdi zmdi-delete"></i></Button>
                                                </td>
                                            </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="body">
                                    <ul className="pagination pagination-primary m-b-0">
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="zmdi zmdi-arrow-left"></i></a></li>
                                        <li className="page-item active"><a className="page-link" href="javascript:void(0);">1</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="zmdi zmdi-arrow-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Users;