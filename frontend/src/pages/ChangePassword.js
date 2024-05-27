import React, {useState} from "react";
import { Col } from 'react-bootstrap';
import {showAlert} from "../utils/alert";
import {useAuth} from "../components/AuthContext";
import {logout} from "../utils/auth";
import {BACKEND_DOMAIN} from "../utils/konstants";

const ChangePassword = ({_}) => {
    const userAuth = useAuth();
    const [disableButton, setDisableButton] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.new_password2 !== formData.new_password){
            showAlert(2, 'New passwords not the same', 'Password Error');
            return;
        }
        setDisableButton(true);
        try {
             fetch(`${BACKEND_DOMAIN}/account/change/password/`, {
                 method: 'POST',
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAuth.user.token}`
                 },
                 body: JSON.stringify(formData),
            }).then((res) => {
                if (!res.ok) {
                    showAlert(3, "Received a bad response from the server.", "Error");
                    return;
                }
                return res.json();
             })
                 .then(data => {
                    if (data.status === true){
                        showAlert(1, "Your password has been changed successfully", "Success");
                        logout(userAuth);
                    }else {
                        showAlert(3, data.resp, "Error");
                        setDisableButton(false);
                    }
                 })
                 .catch((reason) => {
                     showAlert(3, reason.message, "Error");
                 });
        } catch (e) {
            showAlert(3, "Encountered server error while posting the form data.", "Error");
        }
    }
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        new_password2: ''
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (
         <Col xl={9} lg={8} className="m-b30">
             <div className="col-lg-10 m-b30">
                 <div className="job-bx job-profile">
                     <div className="job-bx-title clearfix">
                         <h5 className="font-weight-700 pull-left text-uppercase text-dark">Change Password</h5>
                     </div>
                     <form onSubmit={handleSubmit}>
                         <div className="row">
                             <div className="col-lg-12 ">
                                 <div className="form-group">
                                     <label>Old Password</label>
                                     <input type="password" required={true} value={formData.old_password}
                                            onChange={handleInputChange} name="old_password"
                                            autoComplete="current-password" className="form-control mt-2"/>
                                 </div>
                             </div>
                             <div className="col-lg-6">
                                 <div className="form-group ">
                                     <label>New Password </label>
                                     <input type="password" name="new_password" value={formData.new_password}
                                            onChange={handleInputChange} required={true} autoComplete="new-password"
                                            className="form-control mt-2"/>
                                 </div>
                             </div>
                             <div className="col-lg-6">
                                 <div className="form-group">
                                     <label>Confirm New Password</label>
                                     <input type="password" name="new_password2" value={formData.new_password2}
                                            onChange={handleInputChange} className="form-control mt-2"
                                            autoComplete="new-password"/>
                                 </div>
                             </div>
                             <div className="my-2">
                                 <p className="text-info">You will be logout if your password is changed successfully, so that you can log in with the new password.</p>
                             </div>
                             <div className="col-lg-12 m-b10">
                                 <button type="submit" className="site-button mt-4" disabled={disableButton}>Update Password</button>
                             </div>
                         </div>
                     </form>
                 </div>
             </div>
         </Col>
     );
}
 
export default ChangePassword;