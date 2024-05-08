// 06/05/2024 09:35
// reaphsoft-workman
// github.com/kahlflekzy

import {Button, Image, Modal} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {showAlert} from "../../utils/alert";
import {useAuth} from "../../components/AuthContext";
import fp9264828 from "../components/fp9264828.jpg";
import {ContentHeader} from "../components/content-header";
import {Paginator} from "../components/paginator";

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
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetch(`http://localhost:3001/admin/work/requests/${type}/${page}/`,{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userAuth.admin.token,
            'Content-Type': 'application/json'
          }
        }).then(res => {
                if (!res.ok){
                    showAlert(3, 'Error while loading work requests', 'Error');
                    return;
                }
                return res.json();
            }
        ).then(data => {
            setWorkRequests(data);
        }).catch(reason => {
            showAlert(3, reason.message, 'Error');
        })
    }, [page, type, userAuth.admin.token]);
    const selectedRequest = useRef(0);
    const getWorkRequest = (index) => {}
    return (
        <section className="content">
            <div className="body_scroll">
                <ContentHeader heading={`${name} Work Requests`} current="Work Requests" />
                <div className="container-fluid">
                    <div className="row">
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
                                            workRequests.data.map((workRequest, index) =>
                                            <tr key={index}>
                                                <td><strong>{index + 1}</strong></td>
                                                <td><strong>{workRequest.client}</strong></td>
                                                <td>{workRequest.service}</td>
                                                <td>{(new Date(workRequest.created_at)).toLocaleString()}</td>
                                                <td className="my-0">
                                                    <a href={`/admin/view/work/request/${type}/${workRequest.id}/`} className="btn btn-default waves-float btn-sm"><i className="zmdi zmdi-eye text-primary"></i></a>
                                                    <button className="btn btn-default waves-float btn-sm"><i className="zmdi zmdi-delete text-danger"></i></button>
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
                            <Paginator page={page} setPage={setPage} pages={workRequests.pages} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}