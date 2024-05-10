// 09/05/2024 20:16
// reaphsoft-workman
// github.com/kahlflekzy

import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../components/AuthContext";
import {Button, Form, FormControl, FormGroup, FormLabel, FormText, Image, InputGroup, Modal} from "react-bootstrap";
import {showAlert, showDeleteDialog} from "../../utils/alert";
import fp29332702_7495554 from '../components/fp29332702_7495554.jpg'
import {changePassword, deleteModel, savePhoto} from "../utils/utils";

export const ViewWorkman = () => {
    const { email } = useParams();
    const userAuth = useAuth();
    const [workman, setWorkman] = useState({
        email: '',
        fullname: '',
        address: '',
        phone: '',
        service: '',
        availability: '',
        photoURL: '',
    });
    useEffect(() => {
        fetch(`http://localhost:3001/admin/workman/${email}/`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userAuth.admin.token}`,
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
                setWorkman(data);
                setFormData({
                    fullname: data.fullname,
                    address: data.address,
                    phone: data.phone,
                    service: data.service,
                    availability: data.availability,
                });
            }
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
            setDisableButton(false);
        });
     }, [email, userAuth.admin.token]);
    function submitForm(event) {
        event.preventDefault();
        if (formData.address === workman.address &&
            formData.availability === workman.availability &&
            formData.fullname === workman.fullname &&
            formData.phone === workman.phone
            // no change
        ){
            return;
        }
        setDisableButton(true);
        fetch(`http://localhost:3001/admin/workman/${email}/`,
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
                showAlert(3, `Got a bad response from the server. 
                Please contact the administrators. ${r.statusText}`, 'Error');
                setDisableButton(false);
                return;
            }
            return r.json();
        }).then(value => {
            if (!value.status){
                showAlert(3, value.resp, 'Error');
            }else{
                showAlert(1, 'Successfully updated profile', 'Success');
                workman.address = formData.address;
                workman.availability = formData.availability;
                workman.fullname = formData.fullname;
                workman.phone = formData.phone;
            }
            setDisableButton(false);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
            setDisableButton(false);
        });
    }
    const [formData, setFormData] = useState({
        fullname: '',
        address: '',
        phone: '',
        service: 0,
        availability: '',
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [selectedImage, setSelectedImage] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const [disableSavePhoto, setDisableSavePhoto] = useState(true);
    const saveWorkmanPhoto = () => {
        savePhoto(userAuth.admin.token, '33', email, selectedImage, setDisableSavePhoto);
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
    const changeWorkmanPassword = (event) => {
        event.preventDefault();
        changePassword(passwordForm, '33', email, userAuth.admin.token, setDisablePasswordButtons,
            setPasswordErrorText, setPasswordForm, setShowModal);
    }
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const deleteWorkman = (email, resolve) => {
        new Promise((internalResolve, _) => {
            deleteModel(
                internalResolve,
                `http://localhost:3001/admin/workman/${email}/`,
                userAuth.admin.token,
            );
        }).then(
            (value) => {
                resolve(value);
                if (value.status){
                    window.location.href = '/admin/workmen/';
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
                            <h2 className="pb-3">User: {workman.fullname}</h2>
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
                                              src={workman.photoURL === '' ? fp29332702_7495554 : `http://localhost:3001/${workman.photoURL}`}/>
                                        <p className="mt-3">Current Photo: {workman.photoURL === '' ? 'None' : workman.photoURL }</p>
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
                                  <Button variant="outline-primary" onClick={saveWorkmanPhoto} disabled={disableSavePhoto}>Save</Button>
                              </InputGroup>
                          </div>
                          <Form onSubmit={submitForm}>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Email</Form.Label>
                                  <FormControl value={workman.email} readOnly={true}></FormControl>
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
                                  <Form.Label>Phone</Form.Label>
                                  <FormControl name="phone" value={formData.phone} onChange={handleInputChange}></FormControl>
                                  <FormText>Phone Number is optional</FormText>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Apartment</Form.Label>
                                  <FormControl name="availability" value={formData.availability} onChange={handleInputChange} required={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Address</Form.Label>
                                  <FormControl name="address" value={formData.address} onChange={handleInputChange} required={true}></FormControl>
                              </Form.Group>
                              <div className="w-100"></div>
                              <Form.Group className="col-10 offset-1 my-3">
                                  <Form.Label>Service</Form.Label>
                                  <Form.Control name="service" className="disabled" value={formData.service} readOnly={true}></Form.Control>
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
                                                    deleteCallback: () => {
                                                        return new Promise((resolve, _) => {
                                                            deleteWorkman(workman.email, resolve);
                                                        })
                                                    },
                                                    object: `Workman ${workman.fullname}`
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
                  <Form onSubmit={ changeWorkmanPassword }>
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