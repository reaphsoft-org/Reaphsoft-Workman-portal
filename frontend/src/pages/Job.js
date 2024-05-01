import React from "react";
import {useUser} from "../components/UserContext";
const Job = ({user}) => {
    const {history} = useUser();
    return (
        <div className="col-xl-9 col-lg-8 m-b30 browse-job">
            <h3 className="m-b5">Workman Request</h3>
            {history.length === 0 && <h3>No Workman Request</h3>}

            {history?.map((history) => (
                <ul className="post-job-bx browse-job">
                <li>
                    <div className="post-bx">
                        <div className="job-post-info m-a0">
                            <h4><a href="">{history.workerName}</a></h4>
                            <ul>
                                <li >{history.workerID}</li>
                                <li><i className="fa fa-map-marker"></i> {history.date}</li>
                                <li><i className="fa fa-money"></i> 25,000</li>
                            </ul>
                            
                            <div className="posted-info clearfix">
                                <p className="m-tb0 text-primary float-left"><span
                                    className="text-black m-r10">Date Request:</span> {history.date}</p>
                            </div>
                        </div>
                    </div>
                </li>
                

            </ul> 
            ))}
        </div>
    );
}
 
export default Job;

