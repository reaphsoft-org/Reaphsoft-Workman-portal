// 07/05/2024 11:04
// reaphsoft-workman
// github.com/kahlflekzy

import {ContentHeader} from "../components/content-header";
import {Button, Form, FormControl, FormGroup, FormLabel, Image, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAuth} from "../../components/AuthContext";
import fp9264828 from "../components/fp9264828.jpg";
import {showAlert} from "../../utils/alert";
import {Paginator} from "../components/paginator";

export function ViewHouses() {
    const { email } = useParams();
    const userAuth = useAuth();
    const [page, setPage] = useState(1);
    const [houses, setHouses] = useState({
        pages: 0,
        data: []
    });
    useEffect(() => {
        fetch(`http://localhost:3001/admin/estate/${email}/houses/${page}/`,{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userAuth.admin.token,
            'Content-Type': 'application/json'
          }
        }).then(res => {
                if (!res.ok){
                    showAlert(3, `Error while loading houses. ${res.statusMessage}`, 'Error');
                    return;
                }
                return res.json();
            }
        ).then(data => {
            setHouses(data);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        });
    }, [email, page, userAuth.admin.token]);
    const ADD = 1;
    const UPDATE = 2;
    const [modalData, setModalData] = useState({
        heading: '',
        button: '',
        action: 0
    });
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        number: '',
        occupant_name: '',
        vacancy: 'true',
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const submitForm = (event) => {
        event.preventDefault();
        setDisableButtons(true);
        if (modalData.action === ADD){
            fetch(`http://localhost:3001/admin/estate/${email}/house/`,{
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + userAuth.admin.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(res => {
                if (!res.ok){
                    showAlert(3, `Error while posting data. ${res.statusMessage}`, 'Error');
                    setDisableButtons(false);
                    return;
                }
                return res.json();
                }
            ).then(data => {
                if (!data.status){
                    showAlert(3, data.resp, 'Error');
                }else{
                    showAlert(1, 'Successfully added house', 'Success');
                    const houses0 = houses.data;
                    houses0.unshift({
                        id: data.resp,
                        number: formData.number,
                        name: formData.occupant_name,
                        vacancy: formData.vacancy === 'true'
                    });
                    setHouses({ pages: houses.pages, data: houses0 });
                    setFormData({
                        number: '',
                        occupant_name: '',
                        vacancy: 0,
                    });
                    setShowModal(false);
                }
                setDisableButtons(false);
            }).catch(reason => {
                showAlert(3, reason.message, 'Error');
                setDisableButtons(false);
            });
        }
    }
    const [disableButtons, setDisableButtons] = useState(false);
    return (
        <section className="content">
            <ContentHeader heading="Estate Houses" current="Estate House" />
            <div className="container-fluid">
                <div className="my-2">
                    <Button onClick={
                        ()=>{
                            setModalData({heading: 'Add', button: 'Create', action: ADD});
                            setShowModal(true);
                        }}
                    ><i className="zmdi zmdi-collection-add pe-2"></i>Add House</Button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card px-lg-3 py-lg-4 text-bg-light">
                            <div className="table-responsive">
                                <table className="table c_table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Occupant's Name</th>
                                        <th>House Number</th>
                                        <th>Vacancy</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        houses.data.map((house, index) =>
                                            <tr key={index}>
                                                <td><strong>{index + 1}</strong></td>
                                                <td><strong>{house.name}</strong></td>
                                                <td>{house.number}</td>
                                                <td>{house.vacancy ? 'Vacant' : 'Occupied'}</td>
                                                <td>
                                                    <button className="btn btn-default waves-float btn-sm"><i
                                                        className="zmdi zmdi-edit"></i></button>
                                                    <button className="btn btn-default waves-float btn-sm"><i
                                                        className="zmdi text-danger zmdi-delete"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    {
                                        houses.data.length === 0 &&
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="text-center my-5">
                                                    <Image
                                                        src={fp9264828}
                                                    />
                                                    <h6 className="mt-3">No houses found!</h6>
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Paginator page={page} setPage={setPage} pages={houses.pages} />
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                  <h5>{modalData.heading} Estate House</h5>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={submitForm}>
                      <FormGroup className="mb-3 col-lg-8 offset-lg-2">
                          <FormLabel>Occupant's Name</FormLabel>
                          <FormControl required={true} type="text" name="occupant_name" value={formData.occupant_name}
                                       onChange={handleInputChange}></FormControl>
                      </FormGroup>
                      <div className="w-100"></div>
                      <FormGroup className="mb-3 col-lg-8 offset-lg-2">
                          <FormLabel>Apartment Number</FormLabel>
                          <FormControl required={true} name="number" type="text" value={formData.number}
                                       onChange={handleInputChange}></FormControl>
                      </FormGroup>
                      <div className="w-100"></div>
                      <FormGroup className="mb-5 col-lg-8 offset-lg-2">
                          <FormLabel>Vacancy</FormLabel>
                          <Form.Select name="vacancy" value={formData.vacancy} onChange={handleInputChange} required={true}>
                              <option value='true'>Vacant</option>
                              <option value='false'>Occupied</option>
                          </Form.Select>
                      </FormGroup>
                      <div className="w-100"></div>
                      <div className="row col-12 my-3">
                          <div className="col-lg-4 offset-lg-2 col-6 d-grid">
                              <Button variant="primary" type="submit" disabled={disableButtons}>Submit</Button>
                          </div>
                          <div className="col-lg-4 col-6 d-grid">
                              <Button variant="secondary" disabled={disableButtons}
                                      onClick={()=>{
                                          setShowModal(false);
                                          setFormData({number: '', occupant_name: '', vacancy: 'true'})
                                      }}>Cancel</Button>
                          </div>
                      </div>
                  </Form>
              </Modal.Body>
            </Modal>
        </section>
    );
}