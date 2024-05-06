// 06/05/2024 11:56
// reaphsoft-workman
// github.com/kahlflekzy

import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../components/AuthContext";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {showAlert} from "../../utils/alert";

export const ViewUser = () => {
    const { email } = useParams();
    const userAuth = useAuth();
    const [user, setUser] = useState({
        apartment: '',
        address: '',
        email: '',
        fullname: '',
        photoURL: '',
        serviceType: '',
        }
    );
    useEffect(() => {
        fetch(`http://localhost:3001/admin/user/${email}/`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userAuth.admin.token,
                    'Content-Type': 'application/json'
                }
            }
        ).then(r => {
            if (!r.ok){
                showAlert(3, `Error while loading user ${email}`, 'Error');
                return;
            }
            return r.json();
        }).then(data => {
            if (!data){
                showAlert(3, `Unable to get user: ${email}`, 'Error');
            }else {
                setUser(data);
            }
        })
     }, [email, userAuth.admin.token]);
    return (
      <section className="content">
          <div className="body_scroll">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2 className="pb-3">User: {user.fullname}</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/admin/">
                                    <i className="zmdi zmdi-home me-2"></i>Reaphsoft Workman</a>
                                </li>
                                <li className="breadcrumb-item"><a href="/admin/users/">Users</a></li>
                                <li className="breadcrumb-item">User</li>
                            </ul>
                        </div>
                    </div>
                </div>
          </div>
          <div className="container-fluid">
              <div className="row">
                  <div className="col-lg-6">
                      <div className="card px-lg-3 py-lg-3">
                          <Form>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Email</Form.Label>
                                  <FormControl value={user.email} readOnly={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Password</Form.Label>
                                  <InputGroup>
                                      <Button variant="outline-primary">Edit</Button>
                                      <Form.Control value="hashedpassword" className="my-1" readOnly={true}></Form.Control>
                                  </InputGroup>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Fullname</Form.Label>
                                  <FormControl value={user.fullname}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Apartment</Form.Label>
                                  <FormControl value={user.apartment}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Address</Form.Label>
                                  <FormControl value={user.address}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Service Type</Form.Label>
                                  <Form.Select value={user.serviceType}>
                                      <option value="0">Select Service</option>
                                      <option value="1">Priority</option>
                                      <option value="2">Priority Plus</option>
                                  </Form.Select>

                              </Form.Group>
                              <div className="col-10 offset-1 row my-3">
                                  <div className="col-lg-6 d-grid">
                                    <Button>Update</Button>
                                  </div>
                                  <div className="col-lg-6 d-grid">
                                    <Button variant="danger">Delete</Button>
                                  </div>
                              </div>
                          </Form>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    );
}