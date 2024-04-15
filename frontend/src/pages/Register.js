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
          <div className="person">
            <h1>Personal Information</h1>
            <br />
            <label htmlFor="estateNameOrIndividual">
              Estate Name Or Individual*
            </label>
            <input type="text" id="estateNameOrIndividual" required placeholder="John Doe" />

            <label htmlFor="service">
              Service / Flat Apartment*
            </label>
            <input type="text" id="service" required placeholder="" />

            <label htmlFor="flatOccupant">
              Name of Flat Occupant*
            </label>
            <input type="text" id="flatOccupant" required placeholder="" />

            <label htmlFor="serviceContract">Service Contract</label>
            <br />
            <select id="serviceContract">
              <option value="priorityService">Priority Service</option>
              <option value="priorityPlusService">Priority Plus Service</option>
            </select>

            <label htmlFor="location">
              Location*
            </label>
            <input type="text" id="location" required placeholder="" />

            <label htmlFor="email">
                      Email Address*
            </label>
            <input type="email" required placeholder='johndoe123@gmail.com' />

            <label htmlFor="password">
              Password*
            </label>
            <input type="password" id="password" required placeholder="******" />

            <div>
              <label htmlFor="Image">Uplaod Picture or Estate Logo</label>
              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </form>
              {/* Display the selected image */}
              {selectedImage && (
                <div>
                  <h3>Selected Image Preview:</h3>
                  <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                </div>
              )}
            </div>
          </div>
          
          <div className="btn-2">
            <button>Sign me up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
