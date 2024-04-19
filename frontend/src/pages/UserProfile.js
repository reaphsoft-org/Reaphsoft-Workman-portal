import React from 'react';
import { Col, Form, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {useAuth} from "../components/AuthContext";
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
const UserProfile = () => {
  const user = useAuth();
  // logout(user);

  return (
    <div className="page-content bg-white">
      <div className="content-block">
        <div className="section-full bg-white browse-job p-t50 p-b20">
          <div className="container">
            <div className="row">
              <Sidebar />
              <Col xl={9} lg={8} className="m-b30">
                <div className="job-bx job-profile">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">Basic Information</h5>
                    
                  </div>
                  <Form>
                    <div className="row m-b30">
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Your Name:</Form.Label>
                          <Form.Control type="text" placeholder="Alexander Weir" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Professional title:</Form.Label>
                          <Form.Control type="text" placeholder="Web Designer" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Languages:</Form.Label>
                          <Form.Control type="text" placeholder="English" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Age:</Form.Label>
                          <Form.Control type="text" placeholder="32 Year" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Current Salary($):</Form.Label>
                          <Form.Control type="text" placeholder="2000$" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Expected Salary:</Form.Label>
                          <Form.Control type="text" placeholder="2500$" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={12} md={12}>
                        <Form.Group>
                          <Form.Label>Description:</Form.Label>
                          <Form.Control as="textarea" spellCheck={false} />
                        </Form.Group>
                      </Col>
                    </div>
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">Contact Information</h5>
                    </div>
                    <div className="row">
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Phone:</Form.Label>
                          <Form.Control type="text" placeholder="+1 123 456 7890" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Email Address:</Form.Label>
                          <Form.Control type="text" placeholder="info@example.com" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Country:</Form.Label>
                          <Form.Control type="text" placeholder="Country Name" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Postcode:</Form.Label>
                          <Form.Control type="text" placeholder="112233" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>City:</Form.Label>
                          <Form.Control type="text" placeholder="London" spellCheck={false} />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group>
                          <Form.Label>Full Address:</Form.Label>
                          <Form.Control type="text" placeholder="New york City" spellCheck={false} />
                        </Form.Group>
                      </Col>
                    </div>
                    <Button variant="primary" className="site-button m-b30 mt-5">
                      Save Setting
                    </Button>
                  </Form>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;