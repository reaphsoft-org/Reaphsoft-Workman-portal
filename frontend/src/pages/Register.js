import { IoAnalyticsSharp } from "react-icons/io5";
import React, { useState } from 'react';
import {Image, Toast, ToastContainer} from "react-bootstrap";
import { Link } from "react-router-dom";
import SweetAlertComponent  from "../utils/alert";
import logo from "../components/i/logo.png";
import style from "./login.module.css";
import {BACKEND_DOMAIN} from "../utils/konstants";
import ImageUploadAndCrop from "../components/ImageUploadAndCrop";

export function generateRandomString() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function Register() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showToast, setShowToast] = useState({ message: "", show: false });
  const [disableButton, setDisableButton] = useState('');
  const [accountTypeValues, setAccountTypeValues] = useState({
    individual: true, description: 'Personal', accountType: 1
  });

  const showAlert = (type, text, page ,title = "") => {
    let initializer = new SweetAlertComponent();
    initializer.showAlert(type, text, page ,title);
  }

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
      const link = accountTypeValues.accountType === 1 ? "account/sign/up/i/" : "account/sign/up/e/";
      const response = await fetch(`${BACKEND_DOMAIN}/${link}`, {
        method: 'POST',
        body: postData,
      });
      if (!response.ok) {
        setShowToast({
          message: `Got a bad response from the server. Please contact the administrators. <${response.statusText}>`,
          show: true
        });
        setDisableButton("");
        return;
      }
      const data = await response.json();
      // Handle the response data
      if (data.status === true) {
        const code = generateRandomString();
        localStorage.setItem('register', code + `;;${formData.email}`);
        showAlert(1, data.resp, "/login/", "Success");
      } else {
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
      email: '',
      password: '',
      fullname: '',
      apartment: '',
      estate: '',
      address: '',
      serviceType: "1",
    }
  );
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const logoSize = 80;
 
  return (
    <div className="vh-100">
      <div className="page-wraper">
        <div className="browse-job login-style3">
          <div className={`bg-img-fix ${style.yes}`} style={{ position: "relative", height: "auto", minHeight: "100vh" }}>
            <div className="row">
              <div
                className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-body-secondary bg-opacity-75 vh-100 content-scroll left-bottom">
                <div className="login-form style-2">
                  <div className="logo-header text-center py-1">
                    <Link to="/"><img src={logo} alt="logo" style={{ width: logoSize, height: logoSize }} /></Link>
                  </div>
                  <div className="clearfix"></div>
                  <div>
                    <div id="login">
                      <div className="my-3 mx-2">
                        <h3 className="text-secondary my-3">Select Account Type</h3>
                        <div className="row gap-0">
                          <div className="col-6 p-0 pe-1 d-grid">
                            <button className={accountTypeValues.individual ? "btn btn-secondary disabled" : "btn btn-outline-secondary"} type="button" onClick={() => {
                              setAccountTypeValues({ individual: true, description: 'Personal', accountType: 1 });
                            }}>Individual</button>
                          </div>
                          <div className="col-6 p-0 ps-1 d-grid">
                            <button className={accountTypeValues.individual ? "btn btn-outline-secondary" : "btn btn-secondary disabled"} type="button" onClick={() => {
                              setAccountTypeValues({ individual: false, description: 'Estate', accountType: 2 });
                            }}>Estate</button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1">
                        {/* Personal Information */}
                        <h4 className="text-secondary">{accountTypeValues.description} Information</h4>
                        {accountTypeValues.individual ?
                          <form onSubmit={handleSubmit}>
                            <div className="my-3">
                              <div className="col-12 mb-2">
                                <label className="form-label">Individual Email</label>
                                <input type="email" className="form-control" name="email" autoComplete="email"
                                  value={formData.email} onChange={handleInputChange} required />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" autoComplete="new-password" required
                                  value={formData.password} onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" name="fullname" autoComplete="name" value={formData.fullname}
                                  onChange={handleInputChange} required />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Apartment</label>
                                <input type="text" className="form-control" name="apartment" required value={formData.apartment}
                                  onChange={handleInputChange} />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-control" name="address" autoComplete="address-line1" required
                                  value={formData.address} onChange={handleInputChange} />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Service Type</label>
                                <select className="form-select" aria-label="Select service type" name="serviceType" required
                                  value={formData.serviceType} onChange={handleInputChange}>
                                  <option>Select your Service Type</option>
                                  <option value="1">Priority</option>
                                  <option value="2">Priority Plus</option>
                                </select>
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">House Photo</label>
                                <div>
                                  {selectedImage && (
                                    <div className="text-center my-2">
                                      <Image
                                          src={URL.createObjectURL(selectedImage)}
                                          width={150}
                                          alt="Selected" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 my-2">
                                <ImageUploadAndCrop setCroppedImage={setSelectedImage} />
                              </div>
                              <div className="col-8 offset-2 d-grid my-2">
                                <button className={"btn btn-primary" + disableButton} type="submit">Sign Up</button>
                              </div>
                            </div>
                          </form> :
                          <form onSubmit={handleSubmit}>
                            <div className="my-3">
                              <div className="col-12 mb-2">
                                <label className="form-label">Estate Email Address</label>
                                <input type="email" className="form-control" name="email" autoComplete="email"
                                  value={formData.email} onChange={handleInputChange} required />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Create Estate Password</label>
                                <input type="password" className="form-control" name="password" autoComplete="new-password" required
                                  value={formData.password} onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" name="fullname" autoComplete="name" value={formData.fullname}
                                  onChange={handleInputChange} required />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Estate Name</label>
                                <input type="text" className="form-control" name="estate" autoComplete="name" value={formData.estate}
                                  onChange={handleInputChange} required />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Estate Address</label>
                                <input type="text" className="form-control" name="address" autoComplete="address-line1" required
                                  value={formData.address} onChange={handleInputChange} />
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Estate Service Type</label>
                                <select className="form-select" aria-label="Select service type" name="serviceType" required
                                  value={formData.serviceType} onChange={handleInputChange}>
                                  <option>Select your Service Type</option>
                                  <option value="1">Priority</option>
                                  <option value="2">Priority Plus</option>
                                </select>
                              </div>
                              <div className="col-12 mb-2">
                                <label className="form-label">Estate Photo/Logo</label>
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
                              <div className="col-8 offset-2 d-grid my-2">
                                <button className={"btn btn-primary" + disableButton} type="submit">Create Account</button>
                              </div>
                            </div>
                          </form>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="text-center my-3">
                    <Link className="site-button button-md btn-block text-white text-decoration-none" to="/login/">
                      <i className="ti ti-user me-3"></i>
                      Sign In</Link>
                  </div>
                  <div className="bottom-footer clearfix m-t10 m-b20 row text-center">
                    <div className="col-lg-12 text-center"><span>© <a href="/" className="text-decoration-none">Reaphsoft Limited </a></span></div>
                  </div>
                  <ToastContainer className="p-3" position="bottom-center" style={{ zIndex: 1 }}>
                    <Toast show={showToast.show} onClose={() => { setShowToast({ message: "", show: false }) }}>
                      <Toast.Header>
                        <IoAnalyticsSharp />
                        <strong className="ms-3 me-auto">Server Response</strong>
                      </Toast.Header>
                      <Toast.Body>{showToast.message}</Toast.Body>
                    </Toast>
                  </ToastContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
