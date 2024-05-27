import React, {useEffect, useState} from 'react';
import {useAuth} from "../components/AuthContext";
import SweetAlertComponent from "../utils/alert";
import {BACKEND_DOMAIN} from "../utils/konstants";
const UpdateUser = ({user}) => {
  const userAuth = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    if (user.address === data.address &&
        user.fullname === data.fullname &&
        user.serviceType === data.serviceType &&
        user.apartment === data.apartment &&
        user.estate === data.estate
    ){
      setDisableButton(false);
      return;
    }
    const link = user.accountType === 1 ? "i/" : "e/";
    const alert = (type, text, title) => {
      const component = new SweetAlertComponent();
      component.showSweetAlert(type, text, title);
      setDisableButton(false);
    };
    fetch(`${BACKEND_DOMAIN}/account/update/user/${link}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + userAuth.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then( res => {
      if (!res.ok){
        alert(3,
            "Got a bad response from the server. Please contact the administrators.",
            "Error");
      }else {
        return res.json();
      }
    }).then((data) => {
          if (data.status === true){
            alert(1, "Profile Updated Successfully", "Success");
            user.fullname = data.fullname;
            user.address = data.address;
            user.serviceType = data.serviceType;
            if (userAuth.user.account === 1)
              user.apartment = data.apartment;
            else
              user.estate = data.estate;
          }else{
            alert(3, data.resp, "Error");
          }
          setDisableButton(false);
        }
    ).catch((reason) => {
      alert(3, reason.message, "Error");
      setDisableButton(false);
    });
  }
  const [disableButton, setDisableButton] = useState(false);
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const [data, setData] = useState({
    address: '',
    fullname: '',
    serviceType: 1,
    apartment: '',
    estate: '',
  });
  useEffect(() => {
    setData({
      address: user.address,
      fullname: user.fullname,
      serviceType: user.serviceType,
      apartment: user.apartment,
      estate: user.estate,
    })
  }, [user]);
  return (
      <div className="col-xl-9 col-lg-8 m-b30">
        <div className="job-bx job-profile">
          <div className="job-bx-title clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase text-black">Update Profile</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Full Name:</label>
                  <input type="text" name="fullname" value={data.fullname} onChange={handleInputChange} className="form-control text-black"/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Email Address:</label>
                  <input type="text" value={user.email} readOnly={true} className="form-control text-black"/></div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  {user.accountType === 1 ?
                      <>
                        <label>Apartment:</label>
                        <input type="text" className="form-control text-black" name="apartment" value={data.apartment} onChange={handleInputChange} />
                      </> :
                      <>
                        <label>Estate:</label>
                        <input type="text" className="form-control text-black" name="estate" value={data.estate} onChange={handleInputChange} />
                      </>}
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Full Address:</label>
                  <input type="text" className="form-control text-black" name="address" value={data.address} onChange={handleInputChange} />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Account Type</label>
                  <input type="text" className="form-control text-black" readOnly={true} name="accountType" value={user.accountType === 1 ? 'Individual' : 'Estate'}/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Service Type</label>
                  <select className="form-select" aria-label="Select service type" name="serviceType" required
                    value={data.serviceType} onChange={handleInputChange}>
                    <option>Select your Service Type</option>
                    <option value="1">Priority</option>
                    <option value="2">Priority Plus</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-8 offset-2 d-grid">
                <button type="submit" className="site-button m-b30 mt-4 align-center text-black" disabled={disableButton}>Update Profile</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
};

export default UpdateUser;