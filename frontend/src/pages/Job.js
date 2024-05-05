import React, {useEffect, useState} from "react";
import {showAlert} from "../utils/alert";
import {useAuth} from "../components/AuthContext";
import {Button, Form, FormControl, Modal, Spinner} from "react-bootstrap";
const Job = ({_}) => {
    const [workRequests, setWorkRequests] = useState([]);
    const userAuth = useAuth();
    useEffect(() => {
        try {
             fetch('http://localhost:3001/workmen/requested/services/', {
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
                 .then(responseData => {
                    setWorkRequests(responseData);
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                 });
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
        }
    }, [userAuth.user.token]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [request, setRequest] = useState({id: 0, index: 0});
    const getWorkRequest = (workId = 10) => {
        try {
             fetch(`http://localhost:3001/workmen/request/service/${workId}/`, {
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
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
        }
    }
    const [workRequest, setWorkRequest] = useState(null);
    return (
        <>
            <div className="col-xl-9 col-lg-8 m-b30">
                <h3 className="mb-3 text-black">Workman Requests</h3>
                {workRequests.length === 0 &&
                    <div className="my-5 text-center">
                        <img src="../../../asset/image/empty.png" className="img-fluid mb-4" alt="work"/>
                        <h3 className="text-black m-b5 text-center"> No Workman Request Yet</h3>
                    </div>}
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Service</th>
                        <th>Accepted</th>
                        <th>Date Created</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {workRequests.map((work, index) => (
                        <tr key={index} className="text-dark">
                            <td>{index + 1}</td>
                            <td>{work.worker}</td>
                            <td>{work.accepted ? 'Accepted' : 'Pending'}</td>
                            <td>{new Date(work.date_created).toLocaleString()}</td>
                            <td>
                                <Button variant="outline-primary" className="btn-sm m-0"
                                        onClick={()=>{
                                            setRequest({index: index, id: work.id});
                                            handleShow();
                                            getWorkRequest(work.id);
                                        }}>
                                    <i className="ti-eye"></i></Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title className="mb-3">Work Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        !workRequest ?
                            <div className="my-2 text-center">
                                <Spinner animation="border" role="status" variant="primary">
                                  <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <p className="my-2 text-dark">Loading</p>
                            </div> :
                            <div>
                                <Form.Group className="mb-3">
                                    <Form.Label>Worker</Form.Label>
                                    <FormControl name="worker" value={workRequest.worker} type="name" readOnly={true}></FormControl>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Accepted</Form.Label>
                                    <FormControl name="accepted" value={workRequest.accepted ? 'Accepted' : 'Pending'} type="name" readOnly={true}></FormControl>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date Created</Form.Label>
                                    <FormControl name="created" value={new Date(workRequest.date_created).toLocaleString()} type="text" readOnly={true}></FormControl>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date Required</Form.Label>
                                    <FormControl name="required" value={new Date(workRequest.date_required).toLocaleString()} type="text" readOnly={true}></FormControl>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date Accepted</Form.Label>
                                    <FormControl name="accepted" value={!workRequest.date_accepted ? 'NA' : new Date(workRequest.date_accepted).toLocaleString()} type="text" readOnly={true}></FormControl>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date Completed</Form.Label>
                                    <FormControl name="completed" value={!workRequest.date_completed ? 'NA' : new Date(workRequest.date_completed).toLocaleString()} type="text" readOnly={true}></FormControl>
                                </Form.Group>
                            </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default Job;
