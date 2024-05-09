// 06/05/2024 11:56
// reaphsoft-workman
// github.com/kahlflekzy

import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../components/AuthContext";
import {Button, Form, FormControl, FormGroup, FormLabel, Image, InputGroup, Modal} from "react-bootstrap";
import {showAlert, showDeleteDialog} from "../../utils/alert";
import fp29332702_7495554 from '../components/fp29332702_7495554.jpg'
import {deleteModel} from "../utils/utils";

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
                setFormData({
                    apartment: data.apartment,
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
            formData.apartment === user.apartment &&
            formData.fullname === user.fullname
            // no change
        ){
            return;
        }
        setDisableButton(true);
        fetch(`http://localhost:3001/admin/user/${email}/`,
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
            apartment: '',
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
        fetch(`http://localhost:3001/admin/change/photo/11/${email}/`, {
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
        fetch(`http://localhost:3001/admin/change/password/11/${email}/`, {
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
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const deleteUser = (email, resolve) => {
        new Promise((internalResolve, reject) => {
            deleteModel(
                internalResolve,
                `http://localhost:3001/admin/user/${email}/`,
                userAuth.admin.token,
            );
        }).then(
            (value) => {
                resolve(value);
                if (value.status){
                    window.location.href = '/admin/users/';
                }
            }
        );
    }
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
                          <div className="text-center my-3">
                              {
                                  selectedImage === null ?
                                      <>
                                          <Image
                                              src={user.photoURL === '' ? fp29332702_7495554 : `http://localhost:3001/${user.photoURL}`}/>
                                        <p className="mt-3">Current Photo: {user.photoURL === '' ? 'None' : user.photoURL }</p>
                                      </>
                                      :
                                      <>
                                          <Image src={URL.createObjectURL(selectedImage)} alt="selected"/>
                                          <p className="mt-3">Current Photo: {selectedImage.name }</p>
                                      </>
                              }
                              <InputGroup className="col-10 offset-1">
                                  <Form.Control type="file" accept="image/*" className="" style={{margin: '5px 0', paddingTop: '7.5px'}} onChange={
                                      (e)=>{
                                          if (e.target.files[0]) {
                                              setSelectedImage(e.target.files[0]);
                                              setDisableSavePhoto(false);
                                          }
                                      }
                                  }/>
                                  <Button variant="outline-primary" onClick={savePhoto} disabled={disableSavePhoto}>Save</Button>
                              </InputGroup>
                          </div>
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
                                      <Form.Control value="hashedpassword" className="my-1" readOnly={true}></Form.Control>
                                  </InputGroup>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Fullname</Form.Label>
                                  <FormControl name="fullname" value={formData.fullname} onChange={handleInputChange} required={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Apartment</Form.Label>
                                  <FormControl name="apartment" value={formData.apartment} onChange={handleInputChange} required={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Address</Form.Label>
                                  <FormControl name="address" value={formData.address} onChange={handleInputChange} required={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Service Type</Form.Label>
                                  <Form.Select name="serviceType" value={formData.serviceType} onChange={handleInputChange} required={true}>
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
                                    <Button
                                        disabled={disableButton}
                                        variant="danger"
                                        onClick={() => {
                                                showDeleteDialog({
                                                    object: user.fullname,
                                                    deleteCallback: () => { return new Promise((resolve, _) => {
                                                        deleteUser(user.email, resolve);
                                                    })}
                                                })
                                            }}
                                    >Delete</Button>
                                  </div>
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
                  <Form onSubmit={ changePassword }>
                      <FormGroup className="mb-3 col-lg-8 offset-lg-2">
                          <FormLabel>New Password</FormLabel>
                          <FormControl required={true} type="password" autoComplete="new-password" name="password" value={passwordForm.password} onChange={ handlePasswordChange }></FormControl>
                      </FormGroup>
                      <div className="w-100"></div>
                      <FormGroup className="mb-3 col-lg-8 offset-lg-2">
                          <FormLabel>Repeat New Password</FormLabel>
                          <FormControl required={true} name="password2" autoComplete="new-password" type="password" value={passwordForm.password2} onChange={ handlePasswordChange }></FormControl>
                      </FormGroup>
                      <div className="w-100"></div>
                      <Form.Text className="text-danger text-center">{passwordErrorText}</Form.Text>
                      <div className="text-center my-3">
                          <Button variant="danger" type="submit" disabled={disablePasswordButtons}>Submit</Button>
                      </div>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button disabled={disablePasswordButtons} onClick={() => {setShowModal(false)}}>Close</Button>
              </Modal.Footer>
          </Modal>
      </section>
    );
}