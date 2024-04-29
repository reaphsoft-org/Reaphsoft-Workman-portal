import React, { createContext, useState, useContext, useEffect } from 'react';
import SweetAlertComponent from "../utils/alert";

const UserContext = createContext();

const showSweetAlert = (type, text, title = "") => {
    let initializer = new SweetAlertComponent();
    initializer.showSweetAlert(type, text, title);
}

const UserProvider = ({ children }) => {
    const [service, setService] = useState(null);
    Const [workman, setWorkman] = useState(null);

    const getServcice = async () => {
        try {
            const response = await fetch('http://localhost:3001/workmen/request/service/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                showSweetAlert(3, "Received a bad response from the server.", "Error");
                return;
            }
            const responseData = await response.json();
            if (responseData.status) {
                console.log(responseData);
                setService(responseData.data)
            }
        } catch (e) {
            showSweetAlert(3, "Encountered server error while posting the form data.", "Error");
            console.log(e);
        }
    }

    const getWorkman = async () => {
        try {
            const response = await fetch('http://localhost:3001/workmen/request/workman/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                showSweetAlert(3, "Received a bad response from the server.", "Error");
                return;
            }
            const responseData = await response.json();
            if (responseData.status) {
                console.log(responseData);
            }
        } catch (e) {
            showSweetAlert(3, "Encountered server error while posting the form data.", "Error");
            console.log(e);
        }
    }
        
    

    useEffect(() => {
        getServcice();
        getWorkman();
    }, [])

    return (
        <UserContext.Provider value={{ service }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
