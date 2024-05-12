// 11/05/2024 16:50
// reaphsoft-workman
// github.com/kahlflekzy

import {useParams} from "react-router";
import {useAuth} from "../components/AuthContext";
import React, {useEffect, useState} from "react";
import {showAlert} from "../utils/alert";
import {Button, Form, FormControl, FormText, Spinner} from "react-bootstrap";

export function ClientWorkRequest() {
    const { id } = useParams();
    const userAuth = useAuth();
    const [workRequest, setWorkRequest] = useState(null);
    const notSelected = 'outline-secondary';
    const selected = 'secondary';
    const [ratings, setRatings] = useState({
        one: notSelected,
        two: notSelected,
        three: notSelected,
        four: notSelected,
        five: notSelected,
    });
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
                        setDisableButton(data.data.completed);
                    }else {
                        showAlert(3, data.resp, "Error");
                    }
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                 });
    }, [id, userAuth.user.token]);
    const completeWorkRequest = (event) => {
        event.preventDefault();
        setDisableButton(true);
        if(!workRequest.accepted){
            showAlert(2, 'This can only be done after work has been accepted and completed', 'Work Acceptance Pending');
            setDisableButton(false);
            return;
        }
        if (completionForm.stars === 0){
            showAlert(2, 'Please rate the service', 'Rate Worker');
            setDisableButton(false);
            return;
        }
        console.log(completionForm)
    }
    const [disableButton, setDisableButton] = useState(true);
    const [completionForm, setCompletionForm] = useState({
        stars: 0,
        comment: ""
    });
    return (
        <div className="col-lg-8 mb-2">
            {
                !workRequest ?
                    <div className="my-3 text-center">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="my-2 text-dark">Loading</p>
                    </div> :
                    <div>
                        <Form className="row">
                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label>Worker</Form.Label>
                                <FormControl name="worker" value={workRequest.worker} type="name"
                                             readOnly={true}></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label>Accepted</Form.Label>
                                <FormControl name="accepted" value={workRequest.accepted ? 'Accepted' : 'Pending'}
                                             type="name" readOnly={true}></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label>Date Created</Form.Label>
                                <FormControl name="created"
                                             value={new Date(workRequest.date_created).toLocaleString()}
                                             type="text" readOnly={true}></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label>Date Accepted</Form.Label>
                                <FormControl name="accepted"
                                             value={!workRequest.date_accepted ? 'NA' : new Date(workRequest.date_accepted).toLocaleString()}
                                             type="text" readOnly={true}></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label>Date Completed</Form.Label>
                                <FormControl name="completed"
                                             value={!workRequest.date_completed ? 'NA' : new Date(workRequest.date_completed).toLocaleString()}
                                             type="text" readOnly={true}></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label>Date Required</Form.Label>
                                <FormControl name="required"
                                             value={new Date(workRequest.date_required).toLocaleString()}
                                             type="text"
                                             readOnly={true}></FormControl>
                            </Form.Group>
                            <div className="my-3 col-md-6 d-grid">
                                <Button disabled={disableButton}>Update</Button>
                            </div>
                        </Form>
                        <div className="row my-4">
                            <hr className="border border-secondary border-1 opacity-75" />
                        </div>
                        <Form className="row" onSubmit={completeWorkRequest}>
                            <h6 className="text-dark mb-4">Rate Worker and mark job as completed</h6>
                            <Form.Group className="mb-3">
                                <Form.Label>Rate Worker</Form.Label>
                                <br/>
                                <Button variant={ratings.one}
                                        onClick={()=>{
                                            setCompletionForm({ ...completionForm, 'stars': 1 });
                                            setRatings({
                                                one: selected, two: notSelected, three: notSelected, four: notSelected, five: notSelected,
                                        })}}
                                        className="btn-sm"><i className="ti-star"></i>
                                </Button>
                                <Button variant={ratings.two}
                                        onClick={()=>{
                                            setCompletionForm({ ...completionForm, 'stars': 2 });
                                            setRatings({
                                            one: selected, two: selected, three: notSelected, four: notSelected, five: notSelected,
                                        })}}
                                        className="btn-sm"><i className="ti-star"></i>
                                </Button>
                                <Button variant={ratings.three}
                                        onClick={()=>{
                                            setCompletionForm({ ...completionForm, 'stars': 3 });
                                            setRatings({
                                            one: selected, two: selected, three: selected, four: notSelected, five: notSelected,
                                        })}}
                                        className="btn-sm"><i className="ti-star"></i>
                                </Button>
                                <Button variant={ratings.four}
                                        onClick={()=>{
                                            setCompletionForm({ ...completionForm, 'stars': 4 });
                                            setRatings({
                                            one: selected, two: selected, three: selected, four: selected, five: notSelected,
                                        })}}
                                        className="btn-sm"><i className="ti-star"></i>
                                </Button>
                                <Button variant={ratings.five}
                                        onClick={()=>{
                                            setCompletionForm({ ...completionForm, 'stars': 5 });
                                            setRatings({
                                            one: selected, two: selected, three: selected, four: selected, five: selected,
                                        })}}
                                        className="btn-sm"><i className="ti-star"></i>
                                </Button>
                            {/*    todo when submitting form show an alert when this form is submitted before work has been accepted. */}
                            </Form.Group>
                            <div className={"w-100"}></div>
                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label>Comment on service</Form.Label>
                                <FormControl
                                    aria-describedby="commentFormText"
                                    rows={3} as="textarea"
                                    name="comment"
                                    value={completionForm.comment}
                                    required={true}
                                    onChange={
                                    (e)=> {
                                        setCompletionForm({ ...completionForm, [e.target.name]: e.target.value })
                                    }}>
                                </FormControl>
                                <FormText id="commentFormText">Comment will be publicly available</FormText>
                            </Form.Group>
                            <div className={"w-100"}></div>
                            <div className="my-3 col-md-6 d-grid">
                                <Button type="submit" variant="secondary" disabled={disableButton}>Submit</Button>
                            </div>
                        </Form>
                    </div>
            }
        </div>
    );
}