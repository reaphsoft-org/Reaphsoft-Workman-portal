// 06/05/2024 09:35
// reaphsoft-workman
// github.com/kahlflekzy

import {Image} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {showAlert, showDeleteDialog} from "../../utils/alert";
import {useAuth} from "../../components/AuthContext";
import fp9264828 from "../components/fp9264828.jpg";
import {ContentHeader} from "../components/content-header";
import {Paginator} from "../components/paginator";
import {deleteModel} from "../utils/utils";
import {BACKEND_DOMAIN} from "../../utils/konstants";

export function WorkRequest({type}) {
    const userAuth = useAuth();
    const name = type === 1 ? "Users" : "Estates";
    const [workRequests, setWorkRequests] = useState({
        pages: 0,
        data: []
    });
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetch(`${BACKEND_DOMAIN}/admin/work/requests/${type}/${page}/`,{
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
    const deletedRequest = useRef(0);
    const deleteRequest = (id, resolve) => {
        deleteModel(
            resolve,
            `${BACKEND_DOMAIN}/admin/work/request/${type}/${id}/`,
            userAuth.admin.token,
            deletedRequest.current,
            workRequests,
            setWorkRequests
        );
    }
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
                                                    <button
                                                        className="btn btn-default waves-float btn-sm"
                                                        onClick={() => {
                                                        showDeleteDialog({
                                                            object: `${workRequest.service} service request`,
                                                            deleteCallback: () => {
                                                                return new Promise(( resolve, _) => {
                                                                    deletedRequest.current = index;
                                                                    deleteRequest(workRequest.id, resolve);
                                                            })
                                                            },
                                                        })}}
                                                    ><i className="zmdi zmdi-delete text-danger"></i></button>
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