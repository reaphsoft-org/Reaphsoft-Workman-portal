import React , { useState } from "react";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";

const Skill = () => {
    const [showModal, setShowModal] = useState(false);
    const [worker, setWorker] = useState([]);

    const handleEditClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    

    useEffect(() => {
        fetch("http://localhost:3001/admin/workmen/skills/", {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('adminData.token')))}`
            },
        })
            .then((res) => res.json())
            .then((data) => setWorker(data))
            .catch((err) => console.log(err));
    }, []);
    return (  
        <section className="content">
            <div className="body_scroll">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Worker List</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="">
                                    <i className="zmdi zmdi-home"></i> Reaphsoft Workman Portal</a>
                                </li>
                                <li className="breadcrumb-item">Registered Worker</li>
                                <li className="breadcrumb-item active">Worker List</li>
                            </ul>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">                
                            {/* <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button> */}
                            <button className="btn btn-success btn-icon float-right" onClick={handleEditClick} type="button"><i class="zmdi zmdi-plus"></i></button>
                        </div>
                        
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="table-responsive">
                                    <table className="table table-hover product_item_list c_table theme-color mb-0">
                                        <thead>
                                            <tr className="text-black">
                                                <th>S/N</th>
                                                <th>Workman Name</th>
                                                <th data-breakpoints="sm xs">Address</th>
                                                <th data-breakpoints="xs">Skilled</th>
                                                <th data-breakpoints="xs">Service Type</th>
                                                <th data-breakpoints="sm xs md">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {worker && worker.map((list, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td><h5>{list.name}</h5></td>
                                                    <td><span className="text-muted">{list.street}</span></td>
                                                    <td>{list.skill}</td>
                                                    <td>{list.serviceType}</td>
                                                    <td>
                                                        <a href="javascript:void(0);" onClick={handleEditClick} className="btn btn-default waves-effect waves-float btn-sm waves-green"><i className="zmdi zmdi-edit"></i></a>
                                                        <a href="javascript:void(0);" className="btn btn-default waves-effect waves-float btn-sm waves-red"><i className="zmdi zmdi-delete"></i></a>
                                                    </td>
                                                </tr>
                                                ))}
                                            {worker.length === 0 && <h3 className="text-black text-center">No Workman Registered Yet</h3>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="body">
                                    <ul className="pagination pagination-primary m-b-0">
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="zmdi zmdi-arrow-left"></i></a></li>
                                        <li className="page-item active"><a className="page-link" href="javascript:void(0);">1</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="zmdi zmdi-arrow-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
                <Modal class="modal-dialog" role="document" show={showModal} onHide={handleCloseModal}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="title" id="defaultModalLabel">Edit Worker Details</h4>
                        </div>
                        <div class="modal-body col-sm-12">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" class="form-control" placeholder="Full Name" />
                            </div>
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="Text" class="form-control" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <label>Email Name</label>
                                <input type="Text" class="form-control" placeholder="Worker Email" />
                            </div>
                            <div class="form-group">
                                <label>Worker Skill</label>
                                <input type="Text" class="form-control" placeholder="Worker Skill" />
                            </div>
                            <div class="form-group">
                                <label>Service Type</label>
                                <select class="form-control show-tick">
                                    <option value=""> Please Service Type</option>
                                    <option value="10">Priority</option>
                                    <option value="20">Priority Plus</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Worker Availability Time and Date</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                    </div>
                                    <input type="text" class="form-control datetimepicker" placeholder="Please choose date & time..."/>
                                </div>
                            </div>
                        
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default btn-round waves-effect">SAVE CHANGES</button>
                            <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">CLOSE</button>
                        </div>
                    </div>
                </Modal>
        </section>
    );
}
 
export default Skill;