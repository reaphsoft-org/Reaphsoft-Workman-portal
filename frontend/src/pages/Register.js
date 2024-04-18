import { IoAnalyticsSharp } from "react-icons/io5";
import React, { useState } from 'react';
import logo from './logo.jpeg';
import {Image, Toast, ToastContainer} from "react-bootstrap";

function Register() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showToast, setShowToast] = useState({ message: "", show: false });
  const [disableButton, setDisableButton] = useState('');

  // Function to handle when a new image is selected
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisableButton(" disabled");
    const postData = new FormData();
    Object.keys(formData).forEach(key => {
      postData.append(key, formData[key]);
    });
    if (selectedImage != null) {
      postData.append("photo", selectedImage);
    }
    try {
      const response = await fetch('http://localhost:3001/account/sign/up/', {
        method: 'POST',
        body: postData,
      });
      if (!response.ok){
        setShowToast({ message: "Got a bad response from the server. Please contact the administrators.",
          show: true });
        setDisableButton("");
        return;
      }
      const data = await response.json();
      // Handle the response data
      if (data.status === true) {
        window.location.href = "/login/";
      }else {
        setShowToast({ message: data.resp, show: true });
        setDisableButton("");
      }
    } catch (error) {
      setShowToast({ message: "Encountered server error while posting the form data.", show: true });
      setDisableButton("");
    }
  };

  const [formData, setFormData] = useState(
      {
        accountType: "1",
        email: '',
        password: '',
        fullname: '',
        apartment: '',
        address: '',
        serviceType: "0",
      }
  );
  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  const logoSize = 80;
  return (
    <div className="row ">
      <div className="col-md-6 col-lg-4">
        <div className="bg-white container">
          <div className="mx-1 my-1">
            <a href="/">
              <Image
              src={logo}
              width={logoSize}
              height={logoSize}
              alt="Logo"
              className="rounded"
            />
            </a>
          </div>
          <div className="my-3 mx-2">
            <h3 className="text-secondary my-3">Account Type</h3>
            <div className="row gap-0">
              <div className="col-6 p-0 pe-1 d-grid">
                <button className="btn btn-outline-secondary" type="button" disabled>Estate</button>
              </div>
              <div className="col-6 p-0 ps-1 d-grid">
                <button className="btn btn-secondary" type="button">Individual</button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-secondary">Personal Information</h4>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="accountType" value={formData.accountType} onChange={handleInputChange}/>
              {/* Above would be dynamically set subsequently */}
              <div className="my-5">
                <div className="col-12 mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" autoComplete="email"
                         value={formData.email} onChange={handleInputChange} required/>
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" autoComplete="new-password" required
                         value={formData.password} onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="fullname" autoComplete="name" value={formData.fullname}
                         onChange={handleInputChange} required />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Apartment</label>
                  <input type="text" className="form-control" name="apartment" required value={formData.apartment}
                         onChange={handleInputChange} />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" autoComplete="address-line1" required
                         value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Service Type</label>
                  <select className="form-select" aria-label="Select service type" name="serviceType" required
                          value={formData.serviceType} onChange={handleInputChange}>
                    <option>Select your Service Type</option>
                    <option value="1">Priority</option>
                    <option value="2">Priority Plus</option>
                  </select>
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">House Photo</label>
                  <div>
                    {selectedImage && (
                        <div className="text-center my-3">
                          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                        </div>
                    )}
                  </div>
                  <input
                      type="file" id="imageInput" className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                  />
                </div>
                <div className="col-8 offset-2 d-grid my-5">
                  <button className={"btn btn-primary"+disableButton} type="submit">Sign Me</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-8">
        <div className="my-md-5 d-none d-md-block">
          <div style={{height: 20}}></div>
        </div>
        <Image
            className="img-fluid mx-auto d-block"
          src="/assets/images/labour-removebg-preview.png"
        />
      </div>
      <ToastContainer className="p-3" position="bottom-center" style={{ zIndex: 1 }}>
        <Toast show={ showToast.show } onClose={()=>{setShowToast({ message: "", show: false })}}>
          <Toast.Header>
            <IoAnalyticsSharp />
            <strong className="ms-3 me-auto">Server Response</strong>
          </Toast.Header>
          <Toast.Body>{ showToast.message }</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Register;
