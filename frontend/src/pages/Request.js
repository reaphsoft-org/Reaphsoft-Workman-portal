import React from "react";
import { useUser } from "../components/UserContext";
import { useState } from "react";

const Request = ({ user }) => {
    const { service, worker, getWorkman } = useUser();
    const [date, setDate] = useState();
    const [workman, setWorkman] = useState();
    const handleChange = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        getWorkman({
          id: selectedOption.getAttribute('data-id'),
          name: selectedOption.value,
        });
      };
    
    const handleDateChange = (event) => {
        setDate (event.target.value);
    }

    const handleWorkerChange = (event) => {
        setWorkman(event.target.value);
    }
    
    
    return (
        <div className="col-xl-9 col-lg-8 m-b30">
            <div className="col-xl-10 col-lg-10 m-b30">
                <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase text-black">Request Workmen</h5>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Services</label>
                                    <select className="custom-select custom-select text-black"  onChange={handleChange}>
                                    {service?.map((service) => (
          <option key={service.id} data-id={service.id}>{service.name}</option>
        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group text-black">
                                    <label>Select Worker</label>
                                    <select onChangeCapture={handleWorkerChange} className="custom-select custom-select text-black" >
                                        {worker?.map((worker, index) =>  (<option key={index}>{worker}</option>))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group text-black">
                                    <label>Date Needed:</label>
                                    <input type="date" className="form-control" onChange={handleDateChange} placeholder=" 2020-01-01" spellCheck="false" data-ms-editor="true" />
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-16 text-black">
                                <p>Please Note: The Services Selected are Concordant with the Professional Silled Worker</p>
                            </div>
                        </div>
                        <button type="button" className="site-button m-b30 mt-4 align-center">Request Worker</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Request;