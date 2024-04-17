import React from 'react';
import { Col, Form, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {useAuth} from "../components/AuthContext";

const UserProfile = () => {
  const user = useAuth();
  const logout = (e) => {
    user.logout();
    window.location.href = "/login/";
  }
  return (
    <div className="page-content bg-white">
      <div className="content-block">
        <div className="section-full bg-white browse-job p-t50 p-b20">
          <div className="container">
            <div className="row">
              <Col xl={3} lg={4} className="m-b30">
                <div className="sticky-top">
                  <div className="candidate-info">
                    <div className="candidate-detail text-center">
                      <div className="canditate-des">
                        <a href="/react/demo/">
                          <Image src="../../public/asset/image/pic1.jpg" alt="" />
                        </a>
                        <div className="upload-link" title="update">
                          <input type="file" className="update-flie" />
                          <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip id="update-tooltip">Update</Tooltip>}
                          >
                            <i className="fa fa-camera"></i>
                          </OverlayTrigger>
                        </div>
                      </div>
                      <div className="candidate-title">
                        <div>
                          <h4 className="m-b5">
                            <a href="#">Peter JOhn</a>
                          </h4>
                          <p className="m-b0">
                            <a href="#">Web developer</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <a className="active" href="#">
                          <i className="fa fa-user-o" aria-hidden="true"></i>
                          <span>Profile</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-file-text-o" aria-hidden="true"></i>
                          <span>My Resume</span>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                          <span>Saved Jobs</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-briefcase" aria-hidden="true"></i>
                          <span>Applied Jobs</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-bell-o" aria-hidden="true"></i>
                          <span>Job Alerts</span>
                        </a>
                      </li>
                      <li>
                        <a href="/react/demo/jobs-cv-manager">
                          <i className="fa fa-id-card-o" aria-hidden="true"></i>
                          <span>CV Manager</span>
                        </a>
                      </li>
                      <li>
                        <a href="/react/demo/jobs-change-password">
                          <i className="fa fa-key" aria-hidden="true"></i>
                          <span>Change Password</span>
                        </a>
                      </li>
                      <li>
                        <Button className="link-offset-2 link-underline-secondary" variant="link" onClick={logout}>Log Out</Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col xl={9} lg={8} className="m-b30">
                <div className="job-bx job-profile">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">Basic Information</h5>
                    <a className="site-button right-arrow button-sm float-right" href="/react/demo/">
                      Back
                    </a>
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
                    <Button variant="primary" className="site-button m-b30">
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