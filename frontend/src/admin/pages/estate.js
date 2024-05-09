import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../components/AuthContext";
import {showAlert, showDeleteDialog} from "../../utils/alert";
import {Button, Modal} from "react-bootstrap";
import {ContentHeader} from "../components/content-header";
import {Paginator} from "../components/paginator";
import {deleteModel} from "../utils/utils";

const Estate = () => {
    const userAuth = useAuth();
    const [page, setPage] = useState(1);
    const [usersData, setUsersData] = useState({
        pages: 0,
        data: []
    });
    useEffect(() => {
        fetch(`http://localhost:3001/admin/estate/managers/${page}/`,{
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
            setUsersData(data);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        })
    }, [page, userAuth.admin.token]);
    const [showModal, setShowModal] = useState(false);
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
        fetch('http://localhost:3001/admin/estate/manager/',{
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
                const users = usersData.data;
                users.unshift({
                    email: formData.email,
                    name: formData.fullname,
                    address: formData.address,
                    extra: formData.estate,
                });
                // todo if exceeds 50 remove the last item
                setUsersData({
                    pages: usersData.pages,
                    data: users,
                });
                setFormData({
                    email: '',
                    password: '',
                    fullname: '',
                    apartment: '',
                    estate: '',
                    address: '',
                    serviceType: "1",
                });
            }
            setDisableButton(false);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        })
    }

    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
            fullname: '',
            apartment: '',
            estate: '',
            address: '',
            serviceType: "1",
        }
    );
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [selectedImage, setSelectedImage] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const deletedUser = useRef(0);
    const deleteUser = (email, resolve) => {
        deleteModel(
            resolve,
            `http://localhost:3001/admin/estate/manager/${email}/`,
            userAuth.admin.token,
            deletedUser.current,
            usersData,
            setUsersData
        );
    }
    return ( 
        <section className="content">
            <div className="body_scroll">
                <ContentHeader heading={"Registered Estates"} current={"Estates"} />
                <div className="container-fluid">
                    <div className="my-2">
                        <Button onClick={() => {setShowModal(true)}}><i className="zmdi zmdi-home pe-2"></i>Add Estate</Button>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card px-lg-3 py-lg-4">
                                <div className="table-responsive">
                                    <table className="table c_table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Estate Name</th>
                                                <th data-breakpoints="sm xs">Address</th>
                                                <th data-breakpoints="xs">Email</th>
                                                <th data-breakpoints="xs">Manager</th>
                                                <th data-breakpoints="sm xs md">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            usersData.data.map((user, index) =>
                                            <tr key={index}>
                                                <td><strong>{user.extra}</strong></td>
                                                <td>{user.address}</td>
                                                <td>{user.email}</td>
                                                <td>{user.name}</td>
                                                <td className="my-0">
                                                    <a href={`/admin/estates/estate/${user.email}/`} className="btn btn-default waves-float btn-sm"><i className="zmdi zmdi-eye"></i></a>
                                                    <button
                                                        className="btn btn-default waves-float btn-sm"
                                                        onClick={() => {
                                                            showDeleteDialog({
                                                                object: user.name,
                                                                deleteCallback: () => {
                                                                    return new Promise(( resolve, _) => {
                                                                        deletedUser.current = index;
                                                                        deleteUser(user.email, resolve);
                                                                    })
                                                                },}
                                                            )
                                                        }
                                                    }
                                                    >
                                                        <i className="zmdi zmdi-delete text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Paginator page={page} pages={usersData.pages} setPage={setPage} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => {setShowModal(false)}}>
                <Modal.Header closeButton>
                    <h5 className="mb-3">Add Estate</h5>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitForm}>
                        <div className="my-3">
                            <div className="col-12 mb-2">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" autoComplete="email"
                              value={formData.email} onChange={handleInputChange} required />
                          </div>
                            <div className="col-12 mb-2">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" autoComplete="new-password" required
                              value={formData.password} onChange={handleInputChange}
                            />
                            </div>
                            <div className="col-12 mb-2">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" name="fullname" autoComplete="name" value={formData.fullname}
                              onChange={handleInputChange} required />
                            </div>
                            <div className="col-12 mb-2">
                            <label className="form-label">Estate Name</label>
                            <input type="text" className="form-control" name="estate" required value={formData.estate}
                              onChange={handleInputChange} />
                            </div>
                            <div className="col-12 mb-2">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" name="address" autoComplete="address-line1" required
                              value={formData.address} onChange={handleInputChange} />
                            </div>
                            <div className="col-12 mb-2">
                            <label className="form-label">Service Type</label>
                            <select className="form-select" aria-label="Select service type" name="serviceType" required
                              value={formData.serviceType} onChange={handleInputChange}>
                              <option>Select your Service Type</option>
                              <option value="1">Priority</option>
                              <option value="2">Priority Plus</option>
                            </select>
                            </div>
                            <div className="col-12 mb-2">
                                <label className="form-label">Estate Photo (or Logo)</label>
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
 
export default Estate;