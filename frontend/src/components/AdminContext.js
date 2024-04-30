import React, { createContext, useState, useContext, useEffect } from 'react';
import SweetAlertComponent from "../utils/alert";

const AdminConext = createContext();

const showSweetAlert = (type, text, title = "") => {
    let initializer = new SweetAlertComponent();
    initializer.showSweetAlert(type, text, title);
}

const AdminProvider = ({ children }) => {
    const [login, setLogin] = useState(JSON.parse(localStorage.getItem('adminData')) || null);
    const [admin, setAdmin] = useState(null);
    
    const adminLogin = (adminData) => async (data) => {
        const formData = (data);
        try {
          const response = await fetch('http://localhost:3001/admin/login/', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            showSweetAlert(3, "Received a bad response from the server.", "Error");
            return;
          }
          const responseData = await response.json();
          if (responseData.status === true) {
            setLogin({ token: responseData.access_token, account: data.account });
            setAdmin(adminData);
            localStorage.setItem('adminData', JSON.stringify(adminData));
            showSweetAlert(1, data.resp, "success");
            window.location.href = "/dashboard/";
          } else {
            showSweetAlert(3, data.resp, "error");
          }
        } catch (e) {
          showSweetAlert(3, "Encountered server error while posting the form data.", "Error");
        }

    };
    

    useEffect(() => {
        
    }, [])

    return (
        <AdminConext.Provider value={{ login, admin, adminLogin }}>
            {children}
        </AdminConext.Provider>
    );
};

export default AdminProvider;
export const useAdmin = () => useContext(AdminConext);
