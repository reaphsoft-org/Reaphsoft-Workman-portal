import React from 'react';
const UpdateUser = ({user}) => {
  return (
      <div className="col-xl-9 col-lg-8 m-b30">
        <div className="job-bx job-profile">
          <div className="job-bx-title clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase">Update Personal Information</h5>
            
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="form-group"><label>Full Name:</label><input type="text" value={user.fullname}
                                                                          className="form-control"/></div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label>Email Address:</label>
                <input type="text" value={user.email} readOnly={true} className="form-control"/></div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group"><label>Apartment:</label><input type="text" className="form-control"
                                                                          value={user.apartment}/></div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group"><label>Full Address:</label><input type="text" className="form-control" value={user.address}/></div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group"><label>Account Type</label><input type="text" className="form-control" readOnly={true} value={ user.accountType === 1 ? 'Individual' : 'Estate'}/></div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group"><label>Service Type</label><input type="text" className="form-control" value={ user.serviceType === 1 ? 'Priority' : 'Priority Plus'}/></div>
            </div>
            <button type="button" className="site-button m-b30 mt-4 align-center">Update Personal Details</button>
          </div>
        </div>
      </div>
    );
};

export default UpdateUser;