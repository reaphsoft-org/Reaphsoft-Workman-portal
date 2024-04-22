import React from 'react';
import { Col, Form, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAuth } from "../components/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
const UserProfile = () => {
  const user = useAuth();

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Sidebar />
                <div class="col-xl-9 col-lg-8 m-b30">
                  <div class="job-bx job-profile">
                    <div class="job-bx-title clearfix">
                      <h5 class="font-weight-700 pull-left text-uppercase">Basic Information</h5><a
                        class="site-button right-arrow button-sm float-right" href="">Back</a>
                    </div>
                    <form>
                      <div class="col-lg-6 col-md-6">
                        <div class="form-group"><label>Full Name:</label><input type="text" class="form-control"
                          placeholder="Enter First Name and Last Name" spellcheck="false" data-ms-editor="true" /></div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group"><label>Phone:</label><input type="text" class="form-control"
                            placeholder="+1 123 456 7890" spellcheck="false" data-ms-editor="true"/></div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group"><label>Email Address:</label><input type="text" class="form-control"
                            placeholder="info@example.com" spellcheck="false" data-ms-editor="true"/></div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group"><label>Location:</label><input type="text" class="form-control"
                            placeholder="Location Name" spellcheck="false" data-ms-editor="true"/></div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group"><label>Full Address:</label><input type="text" class="form-control"
                            placeholder="New york City" spellcheck="false" data-ms-editor="true"/></div>
                        </div>
                      </div><button class="site-button m-b30 mt-4">Save Setting</button>
                    </form>
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