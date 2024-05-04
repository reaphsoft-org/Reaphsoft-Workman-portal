import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const Houses = ({user}) => {
    const [estate, setEstate] = useState();
    const [showModal, setShowModal] = useState(false);
    const onhandleClick = (addEstate) => {
        setEstate(addEstate);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div className="col-xl-9 col-lg-8 m-b30">
            <div className="job-bx browse-job clearfix">
                <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase text-black">Estate House</h5>
                    <div class="float-right">
                        <span class="fa fa-plus text-black" onClick={() => {onhandleClick('addEstate'); setShowModal(true)}}>Add Estate House</span>
                    </div>
                </div>
                <table className="table-job-bx cv-manager company-manage-job">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>House Address</th>
                            <th>House Owner</th>
                            <th>Date Created</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="application text-primary">1</td>
                            <td className="job-name">No 12, Jibowu, Ikorodu.</td>
                            <td className="application text-primary fa fa-map-marker">Estate Name</td>
                            <td className="expired pending">2022-01-01 </td>
                            <td className="job-links">
                                <Link to=""><i className="fa fa-eye"></i></Link>
                                <Link to=""><i className="ti-trash"></i></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
                <Modal class="modal-dialog" id={estate} role="document" show={showModal} >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="title" id="defaultModalLabel">Add Estate Houses</h4>
                        </div>
                        <div class="modal-body col-sm-12">
                            <div class="form-group">
                                <label>House Owner</label>
                                <input type="text" class="form-control" placeholder="Full Name" />
                            </div>
                            <div class="form-group">
                                <label>House Number</label>
                                <input type="Text" class="form-control" placeholder="Worker Email" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default btn-round waves-effect">SAVE CHANGES</button>
                            <button type="button" onClick={handleCloseModal} class="btn btn-danger waves-effect" data-dismiss="modal">CLOSE</button>
                        </div>
                    </div>
                </Modal>
        </div>
    );
}

export default Houses;