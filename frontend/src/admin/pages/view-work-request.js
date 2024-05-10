// 08/05/2024 05:52
// reaphsoft-workman
// github.com/kahlflekzy

import {useParams} from "react-router";
import {useAuth} from "../../components/AuthContext";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button, Form, FormControl, FormSelect} from "react-bootstrap";
import {showAlert} from "../../utils/alert";

export function ViewWorkRequest() {
    const { type } = useParams();
    const { id } = useParams();
    const userAuth = useAuth();
    const fetchWorkers = useRef(true);
    const workerEmail = useRef('');
    const getServices = useCallback(
        (service_id) => {
        fetch(`http://localhost:3001/admin/service/workmen/${service_id}/`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userAuth.admin.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(r => {
                if (!r.ok){
                    showAlert(3, `Error while loading workmen for this service. ${r.statusMessage}`, 'Error');
                    return;
                }
                return r.json();
            })
            .then(value => {
            if (!value){
                showAlert(3, `Unable to get workmen`, 'Error');
            }else {
                setWorkmen(value.data);
                fetchWorkers.current = false;
            }
        }).catch(reason => {
        showAlert(3, reason.message, 'Error');
    });
        }, [userAuth.admin.token]
    );
    useEffect(() => {
        fetch(`http://localhost:3001/admin/work/request/${type}/${id}/`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userAuth.admin.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(r => {
                if (!r.ok){
                    showAlert(3, `Error while loading work request. ${r.statusMessage}`, 'Error');
                    return;
                }
                return r.json();
            })
            .then(value => {
                if (!value){
                    showAlert(3, `Unable to get work request`, 'Error');
                }else {
                    setWorkRequest(value);
                    setFormData({
                        date_required: value.date_required.substring(0, 16),
                        worker: value.worker_email,
                        accepted: value.accepted ? 1 : 0
                    });
                    workerEmail.current = value.worker_email;
                    if (fetchWorkers.current) {
                        getServices(value.service_id);
                    }
                }
                setDisableButton(false);
            }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        });
    }, [getServices, id, type, userAuth.admin.token]);
    const [workRequest, setWorkRequest] = useState({
            accepted: '',
            date_created: '',
            date_required: '',
            date_accepted: '',
            date_completed: '',
            worker_name: '',
            worker_email: '',
            client: '',
            client_email: '',
            service: '',
            service_id: 0,
            service_description: '',
    });
    const [workmen, setWorkmen] = useState([]);
    const [formData, setFormData] = useState({
        date_required: null,
        accepted: 'false',
        worker: '',
    });
    const handleInputChange = (e) => {setFormData({ ...formData, [e.target.name]: e.target.value });}
    function submitForm(event) {
        event.preventDefault();
        setDisableButton(true);
        if (
            formData.accepted === workRequest.accepted.toString() &&
            formData.worker === workerEmail.current &&
            formData.date_required === workRequest.date_required.substring(0, 16)
        ){
            setDisableButton(false);
            return;
        }
        fetch(`http://localhost:3001/admin/work/request/${type}/${id}/`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + userAuth.admin.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            .then(r => {
                if (!r.ok){
                    showAlert(3, `Error while updating work request. ${r.statusMessage}`, 'Error');
                    setDisableButton(false);
                    return;
                }
                return r.json();
            })
            .then(value => {
                if (!value.status){
                    showAlert(3, value.resp, 'Error');
                }else {
                    workerEmail.current = formData.worker;
                    showAlert(1, 'Updated work request successfully', 'Success');
                }
                setDisableButton(false);
            }).catch(reason => {
                showAlert(3, reason.message, 'Error');
                setDisableButton(false);
        });
    }
    const [disableButton, setDisableButton] = useState(false);
    return (
      <section className="content">
          <div className="body_scroll">
              <div className="block-header">
                  <div className="row">
                      <div className="col-lg-7 col-md-6 col-sm-12">
                          <h2 className="pb-3">Work Request</h2>
                          <ul className="breadcrumb">
                              <li className="breadcrumb-item"><a href="/admin/">
                                  <i className="zmdi zmdi-home me-2"></i>Reaphsoft Workman</a>
                              </li>
                              <li className="breadcrumb-item"><a href={`/admin/${ type === '1' ? 'users' : 'estates' }/work/requests/`}>Work Requests</a></li>
                              <li className="breadcrumb-item">Work Request</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
          <div className="container-fluid">
              <div className="row">
                  <div className="col-lg-6">
                      <div className="card px-lg-3 py-lg-3">
                          <Form onSubmit={submitForm}>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Client Name</Form.Label>
                                  <FormControl value={workRequest.client} readOnly={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Client Email</Form.Label>
                                  <FormControl value={workRequest.client_email} readOnly={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Date Created</Form.Label>
                                  <Form.Control value={(new Date(workRequest.date_created)).toLocaleString()} className="my-1"
                                                readOnly={true}></Form.Control>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Date Required</Form.Label>
                                  <FormControl name='date_required' type='datetime-local' value={formData.date_required !== null ? formData.date_required : ''}
                                               className="my-1" onChange={handleInputChange}
                                                ></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Date Accepted</Form.Label>
                                  <Form.Control value={workRequest.date_accepted === null ? 'NA' : (new Date(workRequest.date_accepted)).toLocaleString()} className="my-1"
                                                readOnly={true}></Form.Control>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Date Completed</Form.Label>
                                  <Form.Control value={workRequest.date_completed === null ? 'NA' : (new Date(workRequest.date_completed)).toLocaleString()} className="my-1"
                                                readOnly={true}></Form.Control>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Service</Form.Label>
                                  <Form.Control value={workRequest.service} className="my-1"
                                                readOnly={true}></Form.Control>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Service Description</Form.Label>
                                  <Form.Control value={workRequest.service_description} className="my-1"
                                                readOnly={true}></Form.Control>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Accepted</Form.Label>
                                  <FormSelect name="accepted" value={formData.accepted} onChange={handleInputChange} className="my-1">
                                      <option value={1}>Accepted</option>
                                      <option value={0}>Pending</option>
                                  </FormSelect>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Worker</Form.Label>
                                  <FormSelect name='worker' className="my-1" value={formData.worker} onChange={
                                      (e) => {
                                          handleInputChange(e);
                                          setWorkRequest({...workRequest, worker_email: e.target.value});
                                      }
                                  }>
                                      {
                                        workmen.map((workman, index) => <option key={index} value={workman.email}>{workman.fullname}</option>)
                                      }
                                  </FormSelect>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Worker Email</Form.Label>
                                  <FormControl value={workRequest.worker_email} readOnly={true}></FormControl>
                              </Form.Group>
                              <div className="col-10 offset-1 row my-4">
                                  <div className="col-lg-6 d-grid">
                                      <Button type="submit" disabled={disableButton}>Update</Button>
                                  </div>
                                  <div className="col-lg-6 d-grid">
                                      <Button variant="outline-danger" disabled={disableButton}>Delete</Button>
                                  </div>
                              </div>
                          </Form>
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="card py-lg-3">
                          <div className="col-10 offset-1 row my-4">
                                  <div className="col-lg-6 d-grid">
                                      <Button variant="outline-info">Client Comment</Button>
                                  </div>
                                  <div className="col-lg-6 d-grid">
                                      <Button variant="outline-info">Workman Comment</Button>
                                  </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    );
}