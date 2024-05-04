import React, {useEffect, useState} from "react";
import {Button, Form, FormControl} from "react-bootstrap";
import {useAuth} from "../components/AuthContext";
import SweetAlertComponent, {showAlert} from "../utils/alert";
import { Modal } from "react-bootstrap";

function range(stop) {
    const items = [];
    for (let i = 1; i <= stop; i++) {
        items.push(i);
    }
    return items;
}
const Houses = ({user}) => {
    const userAuth = useAuth();
    const [houseToDelete, setHouseToDelete] = useState({
        id: '',
        index: 0,
    });
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [disableAddHouse, setDisableAddHouse] = useState(false);
    const [formData, setFormData] = useState({
        number: '',
        occupant_name: '',
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [newHouse, setNewHouse] = useState(0);
    const addHouse = () => {
        setDisableAddHouse(true);
        handleCloseModal();
        if (formData.number === '' || formData.occupant_name === ''){
            setDisableAddHouse(false);
            return;
        }
        try {
             fetch('http://localhost:3001/estate/add/house/', {
                 method: 'POST',
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuth.user.token}`
                 },
                 body: JSON.stringify(formData),
            }).then((res) => {
                if (!res.ok) {
                    showAlert(3, "Received a bad response from the server.", "Error");
                    return;
                }
                return res.json();
             })
                 .then(data => {
                    if (data.status === true){
                        showAlert(1, "House added successfully", "Success");
                        const houseObjects = houses.data;
                        houseObjects.splice(houseToDelete.index, 1);
                        setHouses({pages: houses.pages, data: houseObjects});
                    }else {
                        showAlert(3, data.resp, "Error");
                    }
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                 });
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
            setDisableAddHouse(false);
        }
    }
    const deleteHouse = () => {
      // remove from houses data
        setShowDeleteModal(false);
        try {
             fetch(`http://localhost:3001/estate/house/${houseToDelete.id}/`, {
                 method: 'DELETE',
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuth.user.token}`
                 },
                 body: JSON.stringify(formData),
            }).then((res) => {
                if (!res.ok) {
                    showAlert(3, "Received a bad response from the server.", "Error");
                    return;
                }
                return res.json();
             })
                 .then(data => {
                    if (data.status === true){
                        showAlert(1, "House was deleted successfully", "Success");
                        setNewHouse(newHouse + 1);
                    }else {
                        showAlert(3, data.resp, "Error");
                    }
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                     setDisableAddHouse(false);
                 });
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
            setDisableAddHouse(false);
        }
    }
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const [page, setPage] = useState(1);
    const alert = (type, text, title) => {
      const component = new SweetAlertComponent();
      component.showSweetAlert(type, text, title);
    };
    const [houses, setHouses] = useState({ pages: 0, data: []});
    useEffect(() => {
        fetch(`http://localhost:3001/estate/houses/${page}/`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + userAuth.user.token,
                'Content-Type': 'application/json'
              }
            }
            )
            .then((res) => {
                if (!res.ok){
                    alert(3,
                        "Got a bad response from the server. Please contact the administrators.",
                        "Error");
                    return;
                }
                return res.json();
            })
            .then((result) => {setHouses(result)})
            .catch((reason) => {
                alert(3,
                    reason.message,
                    "Error");
            });
    }, [page, user, userAuth.user.token, newHouse]);
    let count = houses.pages >= 5 ? 5 : houses.pages;
    return (
        <>
            <div className="col-xl-9 col-lg-8 m-b30">
                <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase text-black">Estate House</h5>
                        <div className="float-right">
                            <Button disabled={disableAddHouse} onClick={()=>{setShowModal(true)}}><i className="pe-2 ti-plus"></i>Add House</Button>
                        </div>
                    </div>
                    <table className="table-job-bx cv-manager company-manage-job">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>House Number</th>
                                <th>House Occupant</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            houses.data.map((house, index) => (
                                <tr key={index}>
                                    <td className="text-primary">{index + 1}</td>
                                    <td className="text-dark">{house.number}</td>
                                    <td className="text-dark">{house.name}</td>
                                    <td>
                                        <a href={`/estate/house/${house.id}/`} className="btn btn-primary"><i className="ti-eye"></i></a>
                                        <Button className="btn-danger" onClick={()=> {setHouseToDelete({id: house.id, index: index}); setShowDeleteModal(true)}}><i className="ti-trash"></i></Button>
                                        {/*  show modal on click to delete item with id on confirmation. */}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation" className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={ page <= 1 ? "page-item disabled" : "page-item" }>
                                <Button onClick={ page <= 1 ? null : () => {
                                    setPage(page - 1)
                                }} className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </Button>
                            </li>
                            {
                                range(count).map((item) => (
                                <li key={item} className={page === item ? "page-item active" : "page-item"}>
                                    <Button className="page-link" onClick={ page === item ? null : () => {setPage(item)}}>{item}</Button>
                                </li>
                                ))
                            }
                            <li className={ page >= houses.pages ? "page-item disabled" : "page-item" }>
                                <Button onClick={ page >= houses.pages ? null : () => {
                                    setPage(page + 1)
                                }} className="page-link" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <h4 className="mb-3">Add House</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>House Owner</Form.Label>
                                <FormControl name="occupant_name" value={formData.occupant_name} type="name" onChange={handleInputChange} required={true}></FormControl>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>House Number</Form.Label>
                                <FormControl name="number" value={formData.number} onChange={handleInputChange} type="text" required={true}></FormControl>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={addHouse} className="btn btn-primary waves-effect">Save</button>
                        <button type="button" onClick={handleCloseModal} className="btn btn-danger waves-effect" data-dismiss="modal">Close</button>
                    </Modal.Footer>
                </Modal>
            <Modal show={showDeleteModal} onHide={()=>{setShowDeleteModal(false)}}>
                <Modal.Header closeButton>
                    <h4 className="mb-3">Delete House</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this house? This process cannot be reverted.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger waves-effect" onClick={deleteHouse}>Delete</Button>
                    <Button className="waves-effect" onClick={()=>{setShowDeleteModal(false)}}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Houses;