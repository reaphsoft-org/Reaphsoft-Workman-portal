import React from 'react';
const UserProfile = ({ user }) => {
  return (
      <div className="col-xl-9 col-lg-8 m-b30">
        <div className="job-bx job-profile">
          <div className="job-bx-title clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase text-black">Basic Information</h5>
          </div>
          <div className="row">
          <div className="col-lg-6 col-md-9 col-sm-9">
            <div className="clearfix m-b20">
              <label className="m-b0">Full Name</label>
              <span className="clearfix font-13 text-black">{user.fullname}</span></div>
            <div className="clearfix m-b20">
              <label className="m-b0">Email</label>
              <span className="clearfix font-13 text-black">{user.email}</span></div>
            <div className="clearfix m-b20">
              {
                user.accountType === 1 ?
                    <>
                      <label className="m-b0">Apartment</label>
                      <span className="clearfix font-13 text-black">{user.apartment}</span>
                    </> :
                  <>
                      <label className="m-b0">Estate</label>
                      <span className="clearfix font-13 text-black">{user.estate}</span>
                  </>
              }
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Address</label>
              <span className="clearfix font-13 text-black">{user.address}</span></div>
            <div className="clearfix m-b20"><label className="m-b0">Service Type</label><span className="clearfix font-13 text-black">{user.serviceType === 1? 'Priority' : 'Priority Plus'}</span></div>
          </div>
        </div>
        </div>
      </div>
    );
};

export default UserProfile;