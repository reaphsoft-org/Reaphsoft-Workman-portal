import React, {useEffect, useRef, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useAuth} from "../../components/AuthContext";
import {showAlert, showDeleteDialog} from "../../utils/alert";
import {ContentHeader} from "../components/content-header";
import {Paginator} from "../components/paginator";

const Users = () => {
    const userAuth = useAuth();
    const [page, setPage] = useState(1);
    const [usersData, setUsersData] = useState({
        pages: 0,
        data: []
    });
    useEffect(() => {
        fetch(`http://localhost:3001/admin/users/${page}/`,{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userAuth.admin.token,
            'Content-Type': 'application/json'
          }
        }).then(res => {
                if (!res.ok){
                    showAlert(3, 'Error while loading users', 'Error');
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
        fetch('http://localhost:3001/admin/user/',{
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
    const deletedUser = useRef(0);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [selectedImage, setSelectedImage] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const deleteUser = async (email, resolve) => {
        fetch(`http://localhost:3001/admin/user/${email}/`,{
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + userAuth.admin.token,
            'Content-Type': 'application/json'
          }
        }).then(res => {
                if (!res.ok){
                    resolve({ status: false, resp: `Error while deleting User.\n${res.statusText}` });
                }
                return res.json();
            }
        ).then(data => {
            resolve(data);
            if (data.status){
                const data0 = usersData.data;
                data0.splice(deletedUser.current, 1);
                setUsersData({
                    pages: usersData.pages, data: data0
                });
            }
        }).catch(reason => {
            resolve({ status: false, resp: reason.message });
        })
    }

    return ( 
        <section className="content">
            <div className="body_scroll">
                <ContentHeader current={"Users"} heading={"Registered Users"} />
                <div className="container-fluid">
                    <div className="my-2">
                        <Button onClick={() => {setShowModal(true)}}><i className="zmdi zmdi-account-add pe-2"></i>Add User</Button>
                    </div>
                    <div className="row clearfix">
                        <div className="col-12">
                            <div className="card px-lg-3 py-4">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Address</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            usersData.data.map((user, index) =>
                                            <tr key={index}>
                                                <td><strong>{user.name}</strong></td>
                                                <td>{user.email}</td>
                                                <td>{user.address}</td>
                                                <td className="my-0">
                                                    <a href={`/admin/users/user/${user.email}/`} className="btn btn-default waves-float btn-sm"><i className="zmdi zmdi-eye text-primary"></i></a>
                                                    <button onClick={() => {
                                                        showDeleteDialog({
                                                            object: user.name, deleteCallback: new Promise(( resolve, _) => {
                                                                deletedUser.current = index;
                                                                deleteUser(user.email, resolve).then(r => {});
                                                            }),
                                                        })}} className="btn btn-default waves-float btn-sm"><i className="zmdi zmdi-delete text-danger"></i></button>
                                                </td>
                                            </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Paginator page={page} setPage={setPage} pages={usersData.pages} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => {setShowModal(false)}}>
                <Modal.Header closeButton>
                    <h5 className="mb-3">Add User</h5>
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
                            <label className="form-label">Apartment</label>
                            <input type="text" className="form-control" name="apartment" required value={formData.apartment}
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
 
export default Users;