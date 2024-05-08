// 06/05/2024 06:31
// reaphsoft-workman
// github.com/kahlflekzy

import {useAuth} from "../../components/AuthContext";
import React, {useEffect, useRef, useState} from "react";
import {showAlert} from "../../utils/alert";
import {Button, Modal} from "react-bootstrap";
import {Paginator} from "../components/paginator";
import {ContentHeader} from "../components/content-header";

export function Services() {
    const userAuth = useAuth();
    const [page, setPage] = useState(1);
    const [services, setServices] = useState({
        pages: 0,
        data: []
    });
    useEffect(() => {
        fetch(`http://localhost:3001/admin/services/${page}/`,{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userAuth.admin.token,
            'Content-Type': 'application/json'
          }
        }).then(res => {
                if (!res.ok){
                    showAlert(3, 'Error while loading estates', 'Error');
                    return;
                }
                return res.json();
            }
        ).then(data => {
            setServices(data);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        })
    }, [page, userAuth.admin.token]);
    const [showModal, setShowModal] = useState(false);
    const addServiceLink = '';
    const POST = 'POST';
    const PUT ='PUT';
    const submitForm = (event) => {
        event.preventDefault();
        setDisableButton(true);
        fetch(`http://localhost:3001/admin/service/${modalState.link}`,{
            method: modalState.action,
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
                setShowModal(false);
                if (modalState.action === POST) {
                    showAlert(1, 'Created New Service', 'Success');
                    const data1 = services.data;
                    data1.unshift({
                        id: Number.parseInt(data.resp),
                        name: formData.name,
                        description: formData.description,
                    });
                    // todo if exceeds 50 remove the last item, simply set state for services and increase pages by 1, data would be reloaded
                    setServices({
                        pages: services.pages,
                        data: data1,
                    });
                } else {
                    showAlert(1, 'Successfully Updated Service', 'Success');
                    const service = services.data[selectedService.current];
                    services.data[selectedService.current] = {
                        id: service.id,
                        name: formData.name,
                        description: formData.description,
                    }
                }
                setFormData({
                    name: '',
                    description: '',
                });
                setModalState({header: '', button: '', link: addServiceLink, action: ''});
            }
            setDisableButton(false);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        })
    }
    const [formData, setFormData] = useState({
            name: '',
            description: '',
        });
    const handleInputChange = (e) => {setFormData({ ...formData, [e.target.name]: e.target.value });}
    const [disableButton, setDisableButton] = useState(false);
    const selectedService = useRef(0);
    const [modalState, setModalState] = useState({
        header: '',
        button: '',
        link: addServiceLink,
        action: ''
    });
    const getService = (index) => {
        selectedService.current = index;
        const service = services.data[index];
        setFormData({
            name: service.name,
            description: service.description,
        });
    }
    return (
        <section className="content">
            <div className="body_scroll">
                <ContentHeader heading="Services List" current="Services" />
                <div className="container-fluid">
                    <div className="my-2">
                        <Button onClick={
                            () => {
                                setShowModal(true);
                                setModalState({header: 'Create New', button: 'Create', link: addServiceLink, action: POST});
                            }
                        }><i className="zmdi zmdi-collection-add pe-2"></i>Add Service</Button>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card px-lg-3 py-lg-4">
                                <div className="table-responsive">
                                    <table className="table c_table mb-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th data-breakpoints="sm xs">Name</th>
                                                <th data-breakpoints="xs">Description</th>
                                                <th data-breakpoints="sm xs md">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            services.data.map((service, index) =>
                                            <tr key={index}>
                                                <td><strong>{index + 1}</strong></td>
                                                <td><strong>{service.name}</strong></td>
                                                <td>{service.description}</td>
                                                <td className="my-0">
                                                    <button onClick={
                                                        () => {
                                                            getService(index);
                                                            setShowModal(true);
                                                            setModalState({header: 'Update', button: 'Update', link: `${service.id}/`, action: PUT })
                                                        }
                                                    } className="btn btn-default waves-float btn-sm"><i className="zmdi zmdi-edit text-primary"></i></button>
                                                    <button className="btn btn-default waves-float btn-sm"><i className="zmdi zmdi-delete text-danger"></i></button>
                                                </td>
                                            </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Paginator page={page} setPage={setPage} pages={services.pages} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setModalState({header: '', button: '', link: addServiceLink, action: ''});
                    setFormData({name: '', description: ''});
                }}>
                <Modal.Header closeButton>
                    <h5 className="mb-3">{modalState.header} Service</h5>
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
                              <Button type="submit" disabled={disableButton}>{modalState.button}</Button>
                          </div>
                        </div>
                      </form>
                </Modal.Body>
            </Modal>
        </section>
    );
}