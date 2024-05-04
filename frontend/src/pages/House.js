// 04/05/2024 21:42
// reaphsoft-workman
// github.com/kahlflekzy

import {useParams} from "react-router";
import {useAuth} from "../components/AuthContext";
import React, {useEffect, useState} from "react";
import {Button, Form, FormControl, Spinner} from "react-bootstrap";
import {showAlert} from "../utils/alert";

export function House({_}) {
    const { id } = useParams();
    const userAuth = useAuth();
    const [house, setHouse] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/estate/house/${id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userAuth.user.token,
                    'Content-Type': 'application/json'
                },
            }
            ).then(res => {
                if (!res.ok){
                    showAlert(3,
                        "Got a bad response from the server. Please contact the administrators.",
                        "Error");
                    return;
                }
                return res.json();
        }).then(data => {
            if (data.status === true){
                setHouse(data.data);
                setFormData({
                    number: data.data.number,
                    occupant_name: data.data.name,
                });
            }else {
                showAlert(3,
                    data.resp,
                    "Error");
            }
        }).catch(reason => {});
    }, [id, userAuth]);
    const [formData, setFormData] = useState({
        number: '',
        occupant_name: '',
    });
    const submitForm = (event) => {
        setDisableButton(true);
        event.preventDefault();
        if (house.number === formData.number &&
            house.name === formData.occupant_name
        ){
            setDisableButton(false);
            return;
        }
        try {
             fetch(`http://localhost:3001/estate/house/${id}/`, {
                 method: 'PUT',
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuth.user.token}`
                 },
                 body: JSON.stringify(formData),
            }).then((res) => {
                if (!res.ok) {
                    showAlert(3, "Received a bad response from the server.", "Error");
                    setDisableButton(false);
                    return;
                }
                return res.json();
             })
                 .then(data => {
                    if (data.status === true){
                        showAlert(1, "House updated successfully", "Success");
                    }else {
                        showAlert(3, data.resp, "Error");
                    }
                    setDisableButton(false);
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                     setDisableButton(false);
                 });
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
            setDisableButton(false);
        }
    }
    const [disableButton, setDisableButton] = useState(false);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className="col-lg-8">
                <div className="job-bx">
                    <h5 className="text-uppercase text-dark">Estate House</h5>
                    {
                        house === null ?
                            <div className="my-4">
                                <Spinner animation="border" role="status" variant="primary">
                                  <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <p className="my-3 text-dark"><strong>Loading</strong></p>
                            </div> :
                            <div className="mt-3">
                                <Form onSubmit={submitForm}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>House Owner</Form.Label>
                                        <FormControl name="occupant_name" value={formData.occupant_name} type="name" onChange={handleInputChange} required={true}></FormControl>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>House Number</Form.Label>
                                        <FormControl name="number" value={formData.number} onChange={handleInputChange} type="text" required={true}></FormControl>
                                    </Form.Group>
                                    <Button type="submit" disabled={disableButton}>Update House</Button>
                                </Form>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}