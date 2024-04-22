import React, {useEffect, useState} from 'react';
import { useAuth } from "../components/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
const UserProfile = () => {
  const userAuth = useAuth();
  const [user, setUser] = useState({
    apartment: '',
    accountType: '',
    address: '',
    email: userAuth.user,
    fullname: '',
    photoURL: '',
    serviceType: '',
  });
  useEffect(() => {
    fetch(`http://localhost:3001/account/user/?email=${userAuth.user}`).then(resp => resp.json()).then( data => {setUser(data);
      console.log(data)})
        .catch( err => console.error('Error: ', err));
  }, [userAuth.user]);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Sidebar user={user} />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">Basic Information</h5><a
                        className="site-button right-arrow button-sm float-right" href="">Back</a>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group"><label>Full Name:</label><input type="text" value={user.fullname}
                                                                                    readOnly={true}
                                                                                    className="form-control"/></div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group"><label>Email Address:</label><input type="text" value={userAuth.user} className="form-control"/></div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group"><label>Apartment:</label><input type="text" className="form-control"
                                                                                    value={user.apartment}/></div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group"><label>Full Address:</label><input type="text" className="form-control" value={user.address}/></div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group"><label>Account Type</label><input type="text" className="form-control" value={ user.accountType === 1 ? 'Individual' : 'Estate'}/></div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group"><label>Service Type</label><input type="text" className="form-control" value={ user.serviceType === 1 ? 'Priority' : 'Priority Plus'}/></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    );
};

export default UserProfile;