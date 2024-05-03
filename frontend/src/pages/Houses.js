import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {useAuth} from "../components/AuthContext";
import SweetAlertComponent from "../utils/alert";

function range(stop) {
    const items = [];
    for (let i = 1; i <= stop; i++) {
        items.push(i);
    }
    return items;
}
const Houses = ({user}) => {
    const userAuth = useAuth();
    const [page, setPage] = useState(1);
    const alert = (type, text, title) => {
      const component = new SweetAlertComponent();
      component.showSweetAlert(type, text, title);
    };
    const [houses, setHouses] = useState({ pages: 0, data: []});
    useEffect(() => {
        fetch(`http://localhost:3001/estate/houses/${page}/`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + userAuth.user.token,
                'Content-Type': 'application/json'
              }
            }
            )
            .then((res) => {
                if (!res.ok){
                    alert(3,
                        "Got a bad response from the server. Please contact the administrators.",
                        "Error");
                    return;
                }
                return res.json();
            })
            .then((result) => {setHouses(result)})
            .catch((reason) => {
                alert(3,
                    reason.message,
                    "Error");
            });
    }, [page, user, userAuth.user.token]);
    let count = houses.pages >= 5 ? 5 : houses.pages;
    return (
        <div className="col-xl-9 col-lg-8 m-b30">
            <div className="job-bx browse-job clearfix">
                <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase text-black">Estate House</h5>
                    <div className="float-right">
                        <Button className=""><i className="pe-2 ti-plus"></i>Add House</Button>
                    </div>
                </div>
                <table className="table-job-bx cv-manager company-manage-job">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>House Number</th>
                            <th>House Occupant</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        houses.data.map((house, index) => (
                            <tr key={index}>
                                <td className="text-primary">{index + 1}</td>
                                <td className="text-dark">{house.number}</td>
                                <td className="text-dark">{house.name}</td>
                                <td>
                                    <a href={`/estate/house/${house.id}/`} className="btn btn-primary"><i className="ti-eye"></i></a>
                                    <Button className="btn-danger"><i className="ti-trash"></i></Button>
                                    {/*  show modal on click to delete item with id on confirmation. */}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example" className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={ page <= 1 ? "page-item disabled" : "page-item" }>
                            <Button onClick={ page <= 1 ? null : () => {
                                setPage(page - 1)
                            }} className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </Button>
                        </li>
                        {
                            range(count).map((item) => (
                            <li key={item} className={page === item ? "page-item active" : "page-item"}>
                                <Button className="page-link" onClick={ page === item ? null : () => {setPage(item)}}>{item}</Button>
                            </li>
                            ))
                        }
                        <li className={ page >= houses.pages ? "page-item disabled" : "page-item" }>
                            <Button onClick={ page >= houses.pages ? null : () => {
                                setPage(page + 1)
                            }} className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Houses;