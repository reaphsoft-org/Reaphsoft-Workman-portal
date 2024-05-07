// 07/05/2024 11:04
// reaphsoft-workman
// github.com/kahlflekzy

import {ContentHeader} from "../components/content-header";
import {Button, Image} from "react-bootstrap";
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
        })
    }, [email, page, userAuth.admin.token]);
    return (
        <section className="content">
            <ContentHeader heading="Estate Houses" current="Estate House" />
            <div className="container-fluid">
                <div className="my-2">
                    <Button><i className="zmdi zmdi-collection-add pe-2"></i>Add House</Button>
                </div>
                <div className="row">
                    <div className="col-12">
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
                                            <td>{!house.vacancy ? 'Vacant' : 'Occupied'}</td>
                                            <td>
                                                <button className="btn btn-default waves-float btn-sm"><i className="zmdi zmdi-edit"></i></button>
                                                <button className="btn btn-default waves-float btn-sm"><i className="zmdi text-danger zmdi-delete"></i></button>
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
                        <Paginator page={page} setPage={setPage} pages={houses.pages} />
                    </div>
                </div>
            </div>
        </section>
    );
}