import React, {useEffect, useState} from "react";
import {showAlert} from "../utils/alert";
import {useAuth} from "../components/AuthContext";
import {BACKEND_DOMAIN} from "../utils/konstants";
import empty from "../components/i/fp5464326_2808307.jpg";

const Job = ({_}) => {
    const [workRequests, setWorkRequests] = useState([]);
    const userAuth = useAuth();
    useEffect(() => {
        try {
             fetch(`${BACKEND_DOMAIN}/workmen/requested/services/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuth.user.token}`
                },
            }).then((res) => {
                if (!res.ok) {
                    showAlert(3, "Received a bad response from the server.", "Error");
                    return;
                }
                return res.json();
             })
                 .then(responseData => {
                    setWorkRequests(responseData);
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                 });
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
        }
    }, [userAuth.user.token]);
    return (
        <>
            <div className="col-xl-9 col-lg-8 m-b30">
                <h3 className="mb-3 text-black">Workman Requests</h3>
                {workRequests.length === 0 &&
                    <div className="my-5 text-center">
                        <img src={empty} className="img-fluid mb-4" alt="work"/>
                        <h3 className="text-black m-b5 text-center"> No Workman Request Yet</h3>
                    </div>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Service</th>
                            <th>Accepted</th>
                            <th>Date Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {workRequests.map((work, index) => (
                        <tr key={index} className="text-dark">
                            <td>{index + 1}</td>
                            <td>{work.worker}</td>
                            <td>{work.accepted ? 'Accepted' : 'Pending'}</td>
                            <td>{new Date(work.date_created).toLocaleString()}</td>
                            <td>
                                <a className="btn btn-outline-primary btn-sm m-0" href={`/work/request/service/${work.id}/`}><i className="ti-eye"></i></a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
 
export default Job;
