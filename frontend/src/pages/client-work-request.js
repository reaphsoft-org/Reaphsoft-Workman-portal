// 11/05/2024 16:50
// reaphsoft-workman
// github.com/kahlflekzy

import {useParams} from "react-router";
import {useAuth} from "../components/AuthContext";
import React, {useEffect, useState} from "react";
import {showAlert} from "../utils/alert";
import {Form, FormControl, Spinner} from "react-bootstrap";

export function ClientWorkRequest() {
    const { id } = useParams();
    const userAuth = useAuth();
    const [workRequest, setWorkRequest] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/workmen/request/service/${id}/`, {
                 method: 'GET',
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuth.user.token}`
                 },
            }).then((res) => {
                if (!res.ok) {
                    showAlert(3, "Received a bad response from the server.", "Error");
                    return;
                }
                return res.json();
             })
                 .then(data => {
                    if (data.status === true){
                        setWorkRequest(data.data);
                    }else {
                        showAlert(3, data.resp, "Error");
                    }
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                 });
    }, [id, userAuth.user.token]);
    return (
        <div className="col-lg-8 my-2">
            {
                !workRequest ?
                    <div className="text-center">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="my-2 text-dark">Loading</p>
                    </div> :
                    <div className="row">
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Worker</Form.Label>
                            <FormControl name="worker" value={workRequest.worker} type="name" readOnly={true}></FormControl>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Accepted</Form.Label>
                            <FormControl name="accepted" value={workRequest.accepted ? 'Accepted' : 'Pending'} type="name" readOnly={true}></FormControl>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Date Created</Form.Label>
                            <FormControl name="created" value={new Date(workRequest.date_created).toLocaleString()} type="text" readOnly={true}></FormControl>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Date Required</Form.Label>
                            <FormControl name="required" value={new Date(workRequest.date_required).toLocaleString()} type="text" readOnly={true}></FormControl>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Date Accepted</Form.Label>
                            <FormControl name="accepted" value={!workRequest.date_accepted ? 'NA' : new Date(workRequest.date_accepted).toLocaleString()} type="text" readOnly={true}></FormControl>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Date Completed</Form.Label>
                            <FormControl name="completed" value={!workRequest.date_completed ? 'NA' : new Date(workRequest.date_completed).toLocaleString()} type="text" readOnly={true}></FormControl>
                        </Form.Group>
                    </div>
            }
        </div>
    );
}