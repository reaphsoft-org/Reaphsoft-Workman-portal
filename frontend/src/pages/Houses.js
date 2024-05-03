import React from "react";
import { Link } from "react-router-dom";

const Houses = ({user}) => {
    return (
        <div className="col-xl-9 col-lg-8 m-b30">
            <div className="job-bx browse-job clearfix">
                <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase text-black">Estate House</h5>
                    <div class="float-right">
                        <span class="fa fa-plus text-black">Add Estate House</span>
                    </div>
                </div>
                <table className="table-job-bx cv-manager company-manage-job">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>House Address</th>
                            <th>House Owner</th>
                            <th>Date Created</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="application text-primary">1</td>
                            <td className="job-name">No 12, Jibowu, Ikorodu.</td>
                            <td className="application text-primary fa fa-map-marker">Estate Name</td>
                            <td className="expired pending">2022-01-01 </td>
                            <td className="job-links">
                                <Link to=""><i className="fa fa-eye"></i></Link>
                                <Link to=""><i className="ti-trash"></i></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        </div>
    );
}

export default Houses;