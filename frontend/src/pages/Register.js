import React, { useState } from 'react';
import logo from './logo.jpeg';

function Register() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle when a new image is selected
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform actions with the selected image, such as uploading it to a server
    console.log('Selected image:', selectedImage);
  };

  return (
    <div className="App">
      <div className="section-1">
        <div className="bg-white">
          <img src={logo} alt="" />
          <div className="my-3">
            <h3 className="text-center text-secondary my-3">Account Type</h3>
            <div className="row gap-0">
              <div className="col-6 p-0 pe-1">
                <div className="d-grid">
                  <button className="btn btn-outline-secondary" type="button" disabled>Estate</button>
                </div>
              </div>
              <div className="col-6 p-0 ps-1">
                <div className="d-grid gap-0">
                  <button className="btn btn-secondary" type="button">Individual</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h4 className="text-secondary">Personal Information</h4>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="accountType" value="1"/>
              {/* Above would be dynamically set subsequently */}
              <div className="my-5">
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" autoComplete="email"/>
                </div>
                <div className="col-12">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" autoComplete="new-password" />
                </div>
                <div className="col-12">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="name" autoComplete="name" />
                </div>
                <div className="col-12">
                  <label className="form-label">Apartment</label>
                  <input type="text" className="form-control" name="apartment" />
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" autoComplete="address-level1"/>
                </div>
                <div className="col-12">
                  <label className="form-label">Service Type</label>
                  <select className="form-select" defaultValue="0" aria-label="Default select example" name="service">
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
                <div className="col-8 offset-2">
                  <div className="d-grid">
                    <button className="btn-primary btn" type="submit">Sign Me</button>
                  </div>
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
