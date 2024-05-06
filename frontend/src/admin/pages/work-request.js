// 06/05/2024 09:35
// reaphsoft-workman
// github.com/kahlflekzy

import {Button, Image, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {showAlert} from "../../utils/alert";
import {useAuth} from "../../components/AuthContext";
import fp9264828 from "../components/fp9264828.jpg";

export function WorkRequest({type}) {
    const userAuth = useAuth();
    const name = type === 1 ? "Users" : "Estates";
    const [showModal, setShowModal] = useState(false);
    const [workRequests, setWorkRequests] = useState({
        pages: 0,
        data: []
    });
    const submitForm = (event) => {
        event.preventDefault();
        setDisableButton(true);
        fetch('http://localhost:3001/admin/service/',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userAuth.admin.token,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(formData),
            })
            .then(res => {
            if (!res.ok){
                showAlert(3, 'Error while posting data', 'Error');
            }
            return res.json();
        }).then( data => {
            if (!data.status){
                showAlert(3, data.resp, 'Error');
            }else{
                showAlert(1, 'Created New Service', 'Success');
                setShowModal(false);
                const data1 = WorkRequest.data;
                data1.unshift({
                    id: Number.parseInt(data.resp),
                    name: formData.name,
                    description: formData.description,
                });
                // todo if exceeds 50 remove the last item
                setWorkRequests({
                    pages: workRequests.pages,
                    data: data1,
                });
                setFormData({
                    name: '',
                    description: '',
                });
            }
            setDisableButton(false);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        })
    }
    const [formData, setFormData] = useState(
        {
            name: '',
            description: '',
        }
    );
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [disableButton, setDisableButton] = useState(false);
    return (
        <section className="content">
            <div className="body_scroll">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2 className="pb-3">{name} Work Requests</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/admin/">
                                    <i className="zmdi zmdi-home pe-2"></i>Reaphsoft Workman</a>
                                </li>
                                <li className="breadcrumb-item">Work Requests</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card px-lg-3 py-lg-4">
                                <div className="table-responsive">
                                    <table className="table c_table mb-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Client</th>
                                                <th>Service</th>
                                                <th>Request Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            workRequests.data.map((service, index) =>
                                            <tr>
                                                <td><strong>{index + 1}</strong></td>
                                                <td><strong>{service.name}</strong></td>
                                                <td>{service.description}</td>
                                                <td className="my-0"> {/* on click get service.id */}
                                                    <button className="btn btn-default waves-effect waves-float btn-sm waves-green"><i className="zmdi zmdi-edit"></i></button>
                                                    <button className="btn btn-default waves-effect waves-float btn-sm waves-red"><i className="zmdi zmdi-delete"></i></button>
                                                </td>
                                            </tr>
                                            )
                                        }
                                        {
                                            workRequests.data.length === 0 &&
                                            <tr>
                                                <td colSpan={5}>
                                                    <div className="text-center my-5">
                                                        <Image
                                                            src={fp9264828}
                                                        />
                                                        <h6 className="mt-3">No {name} work requests found!</h6>
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="body">
                                    <ul className="pagination pagination-primary m-b-0">
                                        <li className="page-item"><a className="page-link" href=""><i className="zmdi zmdi-arrow-left"></i></a></li>
                                        <li className="page-item active"><a className="page-link" href="">1</a></li>
                                        <li className="page-item"><a className="page-link" href=""><i className="zmdi zmdi-arrow-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => {setShowModal(false)}}>
                <Modal.Header closeButton>
                    <h5 className="mb-3">Create New Service</h5>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitForm}>
                        <div className="my-3">
                            <div className="col-12 mb-2">
                            <label className="form-label">Service Name</label>
                            <input type="text" className="form-control" name="name" value={formData.name}
                                   onChange={handleInputChange} required />
                          </div>
                            <div className="col-12 mb-2">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-control" name="description" required
                                       value={formData.description} onChange={handleInputChange}
                                />
                                <span className="form-text">Brief description of this service</span>
                            </div>
                            <div className="col-8 offset-2 d-grid my-4">
                              <Button type="submit" disabled={disableButton}>Create</Button>
                          </div>
                        </div>
                      </form>
                </Modal.Body>
            </Modal>
        </section>
    );
}