// 07/05/2024 10:02
// reaphsoft-workman
// github.com/kahlflekzy

import {useParams} from "react-router";
import {useAuth} from "../../components/AuthContext";
import React, {useEffect, useState} from "react";
import {showAlert} from "../../utils/alert";
import {Button, Form, FormControl, FormGroup, FormLabel, Image, InputGroup, Modal} from "react-bootstrap";
import {ImageComponent} from "../components/image-component";

export const ViewEstate = () => {
    const { email } = useParams();
    const userAuth = useAuth();
    const [user, setUser] = useState({
        email: '',
        fullname: '',
        estate: '',
        address: '',
        serviceType: '',
        photoURL: '',
        }
    );
    useEffect(() => {
        fetch(`http://localhost:3001/admin/estate/manager/${email}/`,
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
                setFormData({
                    estate: data.estate,
                    address: data.address,
                    fullname: data.fullname,
                    serviceType: data.serviceType,
                });
            }
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
            setDisableButton(false);
        });
     }, [email, userAuth.admin.token]);
    function submitForm(event) {
        event.preventDefault();
        if (formData.serviceType === user.serviceType &&
            formData.address === user.address &&
            formData.estate === user.estate &&
            formData.fullname === user.fullname
            // no change
        ){
            return;
        }
        setDisableButton(true);
        fetch(`http://localhost:3001/admin/estate/manager/${email}/`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + userAuth.admin.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            }
        ).then(r => {
            if (!r.ok){
                showAlert(3, 'Got a bad response from the server. Please contact the administrators.', 'Error');
                setDisableButton(false);
                return;
            }
            return r.json();
        }).then(value => {
            if (!value.status){
                showAlert(3, value.resp, 'Error');
            }else{
                showAlert(1, 'Successfully updated profile', 'Success');
            }
            setDisableButton(false);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
            setDisableButton(false);
        });
    }
    const [formData, setFormData] = useState({
            estate: '',
            address: '',
            fullname: '',
            serviceType: "",
        }
    );
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [selectedImage, setSelectedImage] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const [disableSavePhoto, setDisableSavePhoto] = useState(true);
    const savePhoto = () => {
        setDisableSavePhoto(true);
        const postData = new FormData();
        postData.append("photo", selectedImage);
        fetch(`http://localhost:3001/admin/change/photo/22/${email}/`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userAuth.admin.token,
            },
            body: postData,
        }).then( r => {
            if (!r.ok){
                showAlert(3, `Error while making request, please contact the system administrators. ${r.statusText}`, 'Error');
                return;
            }
            return r.json();
        }).then(value => {
            if (!value.status){
                showAlert(3, value.resp, 'Error');
                setDisableSavePhoto(false);
            }else {
                showAlert(1, 'Changed photo successfully', 'Success');
            }
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
            setDisableSavePhoto(false);
        });
    }
    const [showModal, setShowModal] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        password: '',
        password2: '',
    });
    const handlePasswordChange = (e) => {
      setPasswordForm({...passwordForm, [e.target.name]: e.target.value });
    }
    const [disablePasswordButtons, setDisablePasswordButtons] = useState(false);
    const changePassword = (event) => {
        event.preventDefault();
        setDisablePasswordButtons(true);
        if (passwordForm.password.length < 4 ){
            setDisablePasswordButtons(false);
            setPasswordErrorText('Password length should be more than 4');
            return;
        }
        if (passwordForm.password !== passwordForm.password2){
            setDisablePasswordButtons(false);
            setPasswordErrorText('Passwords should be the same');
            return;
        }
        setPasswordErrorText('');
        fetch(`http://localhost:3001/admin/change/password/22/${email}/`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userAuth.admin.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordForm),
        }).then( r => {
            if (!r.ok){
                showAlert(3, `Error while making request, please contact the system administrators. ${r.statusText}`, 'Error');
                setPasswordForm({password2: '', password: ''});
                setShowModal(false);
                setDisablePasswordButtons(false);
                return;
            }
            return r.json();
        }).then(value => {
            if (!value.status){
                showAlert(3, value.resp, 'Error');
                setDisablePasswordButtons(false);
            }else {
                showAlert(1, 'Password was changed successfully', 'Success');
                setPasswordForm({password2: '', password: ''});
                setShowModal(false);
                setDisablePasswordButtons(false);
            }
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
            setPasswordForm({password2: '', password: ''});
            setShowModal(false);
            setDisablePasswordButtons(false);
        });
    }
    const [passwordErrorText, setPasswordErrorText] = useState('')
    return (
      <section className="content">
          <div className="body_scroll">
              <div className="block-header">
                  <div className="row">
                      <div className="col-lg-7 col-md-6 col-sm-12">
                          <h2 className="pb-3">Manager's Name: {user.fullname}</h2>
                          <ul className="breadcrumb">
                              <li className="breadcrumb-item"><a href="/admin/">
                                  <i className="zmdi zmdi-home me-2"></i>Reaphsoft Workman</a>
                              </li>
                              <li className="breadcrumb-item"><a href="/admin/estates/">Estates</a></li>
                              <li className="breadcrumb-item">Estate</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
          <div className="container-fluid">
              <div className="row">
                  <div className="col-lg-6">
                      <div className="card px-lg-3 py-lg-3">
                          {ImageComponent(selectedImage, user, setSelectedImage, setDisableSavePhoto, savePhoto, disableSavePhoto)}
                          <Form onSubmit={submitForm}>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Email</Form.Label>
                                  <FormControl value={user.email} readOnly={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Password</Form.Label>
                                  <InputGroup>
                                      <Button onClick={() => setShowModal(true)} variant="outline-primary">Edit</Button>
                                      <Form.Control value="hashedpassword" className="my-1"
                                                    readOnly={true}></Form.Control>
                                  </InputGroup>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Fullname</Form.Label>
                                  <FormControl name="fullname" value={formData.fullname} onChange={handleInputChange}
                                               required={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Estate</Form.Label>
                                  <FormControl name="estate" value={formData.estate} onChange={handleInputChange}
                                               required={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Address</Form.Label>
                                  <FormControl name="address" value={formData.address} onChange={handleInputChange}
                                               required={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Service Type</Form.Label>
                                  <Form.Select name="serviceType" value={formData.serviceType}
                                               onChange={handleInputChange} required={true}>
                                      <option value="0">Select Service</option>
                                      <option value="1">Priority</option>
                                      <option value="2">Priority Plus</option>
                                  </Form.Select>
                              </Form.Group>
                              <div className="col-10 offset-1 row my-3">
                                  <div className="col-lg-6 d-grid">
                                      <Button type="submit" disabled={disableButton}>Update</Button>
                                  </div>
                                  <div className="col-lg-6 d-grid">
                                      <a className="btn btn-outline-info">Houses</a>
                                  </div>
                              </div>
                              <div className="w-100"></div>
                              <div className="col-lg-6 offset-lg-3 my-2 d-grid">
                                  <Button variant="outline-danger">Delete</Button>
                              </div>
                          </Form>
                      </div>
                  </div>
              </div>
          </div>
          <Modal
              show={showModal}
              backdrop="static"
              keyboard={false}
          >
              <Modal.Header>
                  <h5>Change Password</h5>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={changePassword}>
                      <FormGroup className="mb-3 col-lg-8 offset-lg-2">
                          <FormLabel>New Password</FormLabel>
                          <FormControl required={true} type="password" autoComplete="new-password" name="password"
                                       value={passwordForm.password} onChange={handlePasswordChange}></FormControl>
                      </FormGroup>
                      <div className="w-100"></div>
                      <FormGroup className="mb-3 col-lg-8 offset-lg-2">
                          <FormLabel>Repeat New Password</FormLabel>
                          <FormControl required={true} name="password2" autoComplete="new-password" type="password"
                                       value={passwordForm.password2} onChange={handlePasswordChange}></FormControl>
                      </FormGroup>
                      <div className="w-100"></div>
                      <Form.Text className="text-danger text-center">{passwordErrorText}</Form.Text>
                      <div className="text-center my-3">
                          <Button variant="danger" type="submit" disabled={disablePasswordButtons}>Submit</Button>
                      </div>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button disabled={disablePasswordButtons} onClick={() => {
                      setShowModal(false)
                  }}>Close</Button>
              </Modal.Footer>
          </Modal>
      </section>
    );
}