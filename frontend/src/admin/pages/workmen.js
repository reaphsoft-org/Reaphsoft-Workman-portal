import React, {useRef, useState} from "react";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import {useAuth} from "../../components/AuthContext";
import {showAlert, showDeleteDialog} from "../../utils/alert";
import {deleteModel, getServices} from "../utils/utils";
import {Paginator} from "../components/paginator";
import fp9264828 from "../components/fp9264828.jpg"
import {BACKEND_DOMAIN} from "../../utils/konstants";

const Workmen = () => {
    const userAuth = useAuth();
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [workmen, setWorkmen] = useState({pages: 0, data: []});
    const handleEditClick = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    let servicesHasBeenSet = useRef(false);
    const [services, setServices] = useState([]);
    const deletedWorkman = useRef(0);
    const deleteWorkman = (email, resolve) => {
        deleteModel(
            resolve,
            `${BACKEND_DOMAIN}/admin/workman/${email}/`,
            userAuth.admin.token,
            deletedWorkman.current,
            workmen,
            setWorkmen
        );
    }
    useEffect(() => {
        fetch(`${BACKEND_DOMAIN}/admin/workmen/${page}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userAuth.admin.token}`,
            },
        })
            .then((res) => {
                if (!res.ok){
                    showAlert(3, 'Error while loading services', 'Error');
                    return;
                }
                return res.json();
            })
            .then((data) => setWorkmen(data))
            .catch((err) => showAlert(3, err.message, 'Error'));
        if (!servicesHasBeenSet.current){
            getServices(userAuth.admin.token, setServices, servicesHasBeenSet);
        }
    }, [page, servicesHasBeenSet, userAuth.admin.token]);
    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
            fullname: '',
            address: '',
            phone: '',
            service: 0,
            availability: '',
        }
    );
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [selectedImage, setSelectedImage] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const submitForm = (event) => {
        event.preventDefault();
        setDisableButton(true);
        const postData = new FormData();
        Object.keys(formData).forEach(key => {
            postData.append(key, formData[key]);
        });
        if (selectedImage != null) {
            postData.append("photo", selectedImage);
        }
        fetch(`${BACKEND_DOMAIN}/admin/workman/`,{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userAuth.admin.token,
              },
            body: postData
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
                showAlert(1, data.resp, 'Success');
                setShowModal(false);
                const workmen0 = workmen.data;
                workmen0.unshift({
                    email: formData.email,
                    name: formData.fullname,
                    service: services[service].name,
                });
                // todo if exceeds 50 remove the last item
                setWorkmen({
                    pages: workmen.pages,
                    data: workmen0,
                });
                setFormData({
                    email: '',
                    password: '',
                    fullname: '',
                    address: '',
                    phone: '',
                    service: 0,
                    availability: '',
                });
                setService(0);
            }
            setDisableButton(false);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        })
    }
    const [service, setService] = useState(0);
    return (  
        <section className="content">
            <div className="body_scroll">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2 className="pb-3">Registered Workmen</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/admin/">
                                    <i className="zmdi zmdi-home"></i> Reaphsoft Workman</a>
                                </li>
                                <li className="breadcrumb-item">Registered Workmen</li>
                                <li className="breadcrumb-item active">Workmen List</li>
                            </ul>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <button className="btn btn-primary btn-icon float-right" onClick={handleEditClick} type="button"><i className="zmdi zmdi-plus"></i></button>
                        </div>

                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card px-lg-3 py-lg-4">
                                <div className="table-responsive">
                                    <table className="table table-hover product_item_list c_table">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Service</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {workmen.data.map((workman, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td><strong>{workman.name}</strong></td>
                                                    <td><span className="text-muted">{workman.email}</span></td>
                                                    <td>{workman.service}</td>
                                                    <td>
                                                        <a href={`/admin/workmen/workman/${workman.email}/`} className="btn btn-default waves-float btn-sm"><i className="zmdi zmdi-eye"></i></a>
                                                        <button
                                                            className="btn btn-default waves-float btn-sm"
                                                            onClick={() => {
                                                                showDeleteDialog({
                                                                    object: `Workman ${workman.name}`,
                                                                    deleteCallback: () => {
                                                                        return new Promise(( resolve, _) => {
                                                                            deletedWorkman.current = index;
                                                                            deleteWorkman(workman.email, resolve);
                                                                    })
                                                                    },
                                                            })}}
                                                        ><i className="zmdi zmdi-delete text-danger"></i></button>
                                                    </td>
                                                </tr>
                                                ))}
                                                {workmen.data.length === 0 &&
                                                    <tr>
                                                        <td colSpan={5}>
                                                            <div className="text-center my-5" >
                                                                <img src={fp9264828} alt="no workman" />
                                                                <h5 className="text-black mt-2 text-center"> No Workman Yet</h5>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Paginator page={page} pages={workmen.pages} setPage={setPage} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title mb-3">Create New Worker</h5>
                        </div>
                        <div className="modal-body col-sm-12">
                            <form onSubmit={submitForm}>
                                <div className="col-12 mb-2">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" autoComplete="email"
                                  value={formData.email} onChange={handleInputChange} required />
                              </div>
                                <div className="col-12 mb-2">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" required
                                           autoComplete="new-password" value={formData.password} onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-12 mb-2">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" name="fullname" autoComplete="name" value={formData.fullname}
                                  onChange={handleInputChange} required />
                                </div>
                                <div className="col-12 mb-2">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" className="form-control" name="phone" required value={formData.estate}
                                      onChange={handleInputChange} />
                                    <span className="form-text">Optional</span>
                                </div>
                                <div className="col-12 mb-2">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-control" name="address" autoComplete="address-line1" required
                                  value={formData.address} onChange={handleInputChange} />
                                </div>
                                <div className="col-12 mb-2">
                                    <label className="form-label">Service</label>
                                    <select className="form-select" aria-label="services list" name="service" required
                                      value={formData.service} onChange={(e)=>{
                                          setService(Number.parseInt(e.target.selectedOptions[0].dataset['key']));
                                          handleInputChange(e);
                                      }}>
                                      <option value={0} data-key={0}>Select Service</option>
                                        {services.map(((service, index) =>
                                            <option value={service.id} key={index} data-key={index}>{service.name}</option>
                                        ))}
                                    </select>
                                    <span className="form-text">If the desired service is not included here, please create it
                                        under services before proceeding.</span>
                                </div>
                                <div className="col-12 mb-2">
                                    <label className="form-label">Photo</label>
                                    <div>
                                      {selectedImage && (
                                        <div className="text-center my-3">
                                          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                                        </div>
                                      )}
                                    </div>
                                    <input
                                      type="file" id="imageInput" className="form-control"
                                      accept="image/*"
                                      onChange={(e) => setSelectedImage(e.target.files[0])}
                                    />
                                    <span className="form-text">Optional</span>
                                </div>
                                <div className="col-12 mb-2 form-group">
                                    <label>Availability</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i
                                                className="zmdi zmdi-calendar"></i></span>
                                        </div>
                                        <input type="text" className="form-control" required={true} name="availability" value={formData.availability} onChange={handleInputChange} />
                                        <span className="form-text">Brief text describing the general period this worker is available for work.</span>
                                    </div>
                                </div>
                                <div className="text-center my-3">
                                    <button type="submit" className="btn btn-primary" disabled={disableButton}>SAVE CHANGES</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
        </section>
    );
}
 
export default Workmen;