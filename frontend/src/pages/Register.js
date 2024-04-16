import React, { useState } from 'react';
import logo from './logo.jpeg';

function Register() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle when a new image is selected
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
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
        console.log("error");
        // show toast
        return;
      }
      const data = await response.json();
      // Handle the response data
      if (data.status === true) {
        window.location.href = "/Login";
      }
    } catch (error) {
      console.error('Error posting form data:', error);
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
  return (
    <div className="App">
      <div className="hero_area section-1">
        <div className="bg-white">
          <div className="img-box">
            <img src="assets/images/001-removebg-preview.png" alt="" style={{ width: '12%' }} />
          </div>
          <div className="my-3">
            <h3 className="text-center text-secondary my-3">Account Type</h3>
            <div className="row gap-0">
              <div className="col-6 p-0 pe-1 d-grid">
                <button className="btn btn-outline-secondary" type="button" disabled>Estate</button>
              </div>
              <div className="col-6 p-0 ps-1 d-grid">
                <button className="btn btn-secondary" type="button">Individual</button>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h4 className="text-secondary">Personal Information</h4>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="accountType" value={formData.accountType} onChange={handleInputChange}/>
              {/* Above would be dynamically set subsequently */}
              <div className="my-5">
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" autoComplete="email"
                         value={formData.email} onChange={handleInputChange} required/>
                </div>
                <div className="col-12">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" autoComplete="new-password" required
                         value={formData.password} onChange={handleInputChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="fullname" autoComplete="name" value={formData.fullname}
                         onChange={handleInputChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label">Apartment</label>
                  <input type="text" className="form-control" name="apartment" required value={formData.apartment}
                         onChange={handleInputChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" autoComplete="address-line1" required
                         value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Service Type</label>
                  <select className="form-select" aria-label="Select service type" name="serviceType" required
                          value={formData.serviceType} onChange={handleInputChange}>
                    <option>Select your Service Type</option>
                    <option value="1">Priority</option>
                    <option value="2">Priority Plus</option>
                  </select>
                </div>
                <div className="col-12">
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
                <div className="col-8 offset-2 d-grid justify-content">
                  <button className="btn btn-primary" type="submit">Sign Me</button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
