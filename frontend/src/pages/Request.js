import React, {useEffect, useState} from "react";
import {useAuth} from "../components/AuthContext";
import {showAlert} from "../utils/alert";
import {Alert, Button} from "react-bootstrap";
import mStyle from "./register.module.css";
import {range} from "../utils/range";

const Request = ({ _ }) => {
    const userAuth = useAuth();
    const [services, setServices] = useState([]);
    const [workers, setWorkers] = useState([]);
    useEffect(() => {
        try {
             fetch('http://localhost:3001/workmen/services/', {
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
                    setServices(responseData);
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                 });
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
        }
    }, [userAuth.user.token]);
    const [date, setDate] = useState(null);
    const [workman, setWorkman] = useState(null);
    const [workmanOverview, setWorkmanOverview] = useState([]);
    const [showOverView, setShowOverView] = useState(false);
    const handleSelectServiceChange = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const serviceName = selectedOption.value;
        if (serviceName === 0){
            setWorkers([]);
            return;
        }
        const serviceId = selectedOption.getAttribute('data-id');
        setShowOverView(false);
        // todo disable services select while fetching
        try {
            fetch(`http://localhost:3001/workmen/services/workers/?id=${serviceId}&name=${serviceName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuth.user.token}`
                },
            }).then(res => {
                if (!res.ok) {
                    showAlert(3, "Received a bad response from the server.", "Error");
                    return;
                }
                return res.json();
            }).then(data => {
                if (data.status) {
                    setWorkers(data.data);
                }else {
                    showAlert(2, data.resp, 'Server Response');
                }
            }).catch(reason => showAlert(3, reason.message, "Error"));
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
            console.log(e);
        }
      };
    const handleDateChange = (event) => {
        setDate (new Date(event.target.value));
    }
    const handleWorkerChange = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const workerID = selectedOption.value;
        const workerName = selectedOption.getAttribute('data-name');
        setWorkman({id: workerID, name: workerName});
        if (workerID === 'Select Worker') return;

        fetch(`http://localhost:3001/workmen/worker/b/rating/${workerID}/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userAuth.user.token}`
        },
        }).then((res) => {
            if (!res.ok) {
                showAlert(3, `Error trying to get workman overview. ${res.statusText}`, "Error");
                return;
            }
            return res.json();
        })
         .then(data => {
            setWorkmanOverview(data);
            setShowOverView(true);
         })
         .catch((reason) => {
             showAlert(3, reason.message, "Error");
         });
    }
    const [disableButton, setDisableButton] = useState(false);
    const submitRequest = () => {
      setDisableButton(true);
      if (!workman){
          showAlert(2, 'Please select a workman', 'Uhm!!');
          setDisableButton(false);
          return;
      }
      if (!date){
          showAlert(2, 'Please select a datetime', 'Uhm!!');
          setDisableButton(false);
          return;
      }
      // showAlert(2, 'Please wait for a moment', 'Sending Request');
      const data = {
          workerID: workman.id,
          workerName: workman.name,
          date: date
      }
      try {
             fetch('http://localhost:3001/workmen/request/service/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuth.user.token}`
                },
                 body: JSON.stringify(data),
            }).then((res) => {
                if (!res.ok) {
                    showAlert(3, "Received a bad response from the server.", "Error");
                    return;
                }
                return res.json();
             })
                 .then(resData => {
                     console.log(resData);
                     if (resData.status === true){
                         showAlert(1, "Workman service request was successfully created. Please track it in your work requests history", "Success");
                     }else{
                         showAlert(3, resData.resp, "Error");
                     }
                  setDisableButton(false);
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                     setDisableButton(false);
                 });
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
            setDisableButton(false);
        }
    }
    return (
        <div className="col-xl-9 col-lg-8 m-b30">
            <div className="col-xl-10 col-lg-10 m-b30">
                <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase text-black">Request Workman</h5>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Services</label>
                                    <select className="custom-select text-black" onChange={handleSelectServiceChange}>
                                        <option value={0}>Select Service</option>
                                    {services?.map((service) => (
                                        <option key={service.id} value={service.name} data-id={service.id}>{service.name}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group text-black">
                                    <label>Select Worker</label>
                                    <select onChangeCapture={handleWorkerChange} className="custom-select text-black" >
                                        <option>Select Worker</option>
                                        {workers?.map((worker) => (<option key={worker.id} value={worker.id} data-name={worker.fullname}>{worker.fullname} ({worker.availability})</option>))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <WorkmanOverviewAlert data={workmanOverview} showOverview={showOverView} setShowOverview={setShowOverView} />
                            </div>
                            <div className="col-12">
                                <div className="form-group text-black">
                                    <label>Date & Time Needed:</label>
                                    <input type="datetime-local" className="form-control" onChange={handleDateChange} placeholder="2020-01-01" spellCheck="false" data-ms-editor="true" />
                                </div>
                            </div>
                            <div className="col-12 text-black">
                                <p>Please note that the selected services are concordant with the skilled workmen</p>
                            </div>
                        </div>
                        <button type="button" className="site-button m-b30 mt-4 align-center" onClick={submitRequest} disabled={disableButton}>Request Worker</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Request;

function WorkmanOverviewAlert({data, showOverview, setShowOverview}) {
    // todo, on slow networks show a spinner
    if (showOverview) {
        return (
          <Alert variant="primary" className="text-light" onClose={() => setShowOverview(false)} dismissible>
            <Alert.Heading>Workman Rating Overview</Alert.Heading>
              <div className="row">
                  <div className="col-lg-9">
                  {
                      data.map((r, index) =>
                        <div key={index} className="my-3">
                            <p className="m-0"><strong>Rating</strong>: <Stars stars={r.stars} /></p>
                            <p><strong>Comment</strong>: {r.comment}</p>
                        </div>
                      )
                  }
                  </div>
                  <div className="col-lg-3 ms-auto">
                      {/* https://icons8.com/icon/set/certified/group-filled--static--white */}
                      <img alt="certified" className="float-end" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACdklEQVR4nO2aPU8UQRiAx1xigoYCNQp/gQIhJFZ+JBIKSWzEToIfhfTGWGhC7OQvWJyxsPCUDhQKSims+AMEaPQKo4UFFiiPmeQ9M26WYw/2453ZeZLN7e28++ad5272ZnfOmEgkEolEMgNcA1aAH+jA1vERuGqKBngC/EEntq7HRXb+NrCPbmx900V0/hTQxg++An15C7iHLprAednsfpLZvAUsooeVlPrsRdnlfd4CdtDD9ZT6JhIx23kL2EUPZ1PqO5eI2a2VAEsyyAQ8BCYOqLFQAYvowV7wTpQt4C66eAVcKFNAn0wwVFGaAAtwS9tU2Dh0a8sN4JGmm6HSBViAK8AH4Hs13U7vZLe2WkAU8D+VWNdEFFAGKCYKKAOqtH/IN7DSAkzdBWggCigDFFOpAJNjrijgiOT/caeAYkwZoJjQBLwAFrwRYI4n7Ruw5bx/aZ8Cy2b3O2xJbHACmhI3IH/GaACnZWvIsQGJaaoUAJwBLgF3gOfAG+Bzxsdo85L7ZOcVWJXt3zF5ndcq4DjMSO51YBPYcNo25Ni6xMyEJOATcLOz6nPIOsQXp4bLwFLykb1vAlpOzhEZMt3WIPYlZsQ5763PAvaAYcm51sN5a3LOsOTwVoBlWXJezLj4YmPG5Ry7ToHvApYk5+gRBCz7LmCv7kOglcNFsOWzAOr+M+gy2cNEaJID8FnAWA9T4bEQBQz1cDM0FJqA39LJhuxbXqfcDqfFBSGgLXkHE8cXUh6IDEpsuzIBRdFtbDuMmlABpjIIuGFCBXiQQcB9EyrAM+nkL+CdTHbG5SL4U9qemlAB5oCHQH9KW7+0zVVTXSQSMQHxF1iWeXhuLGitAAAAAElFTkSuQmCC" />
                  </div>
              </div>
              {
                  data.length === 0 ? <p>No ratings found for this worker.</p> : <Button href={'#'} variant='outline-light' className={`btn-sm ${mStyle.alertA}`}>See More</Button>
              }
          </Alert>
        );
    }
}

function Stars({stars}) {
    return (
        <>
            {
                range(stars).map((i) => <i key={i} className="zmdi zmdi-star"></i>)
            }
            {
                range(5 - stars).map((i) => <i key={i} className="ti ti-star"></i>)
            }
        </>
    );
}