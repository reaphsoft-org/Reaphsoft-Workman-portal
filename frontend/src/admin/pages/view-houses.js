// 07/05/2024 11:04
// reaphsoft-workman
// github.com/kahlflekzy

import {ContentHeader} from "../components/content-header";
import {Button} from "react-bootstrap";
import React from "react";
import {useParams} from "react-router";
import {useAuth} from "../../components/AuthContext";

export function ViewHouses() {
    const { email } = useParams();
    const userAuth = useAuth();

    return (
        <section className="content">
            <div>
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
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}