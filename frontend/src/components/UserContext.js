import React, { createContext, useState, useContext, useEffect } from 'react';
import SweetAlertComponent from "../utils/alert";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

const showSweetAlert = (type, text, title = "") => {
    let initializer = new SweetAlertComponent();
    initializer.showSweetAlert(type, text, title);
}

const UserProvider = ({ children }) => {
    const [service, setService] = useState(null);
    const [worker, setWorker] = useState(null);
    const {user} = useAuth();
    const getServcice = async () => {
        try {
            const response = await fetch('http://localhost:3001/workmen/services/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
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
        }
    }

    const requestHistory = async () => {
        try {
            const response = await fetch('http://localhost:3001/workmen/requested/services/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });
            if (!response.ok) {
                showSweetAlert(3, "Received a bad response from the server.", "Error");
                return;
            }
            const responseData = await response.json();
            if (responseData.status) {
                setService(responseData.data)
            }
        } catch (e) {
            showSweetAlert(3, "Encountered server error while posting the form data.", "Error");
        }
    }

    const getWorkman = async (id, name) => {
        try {
            const response = await fetch('http://localhost:3001/workmen/services/workers/?id=' + id + '&name=' + name + '', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
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

    const postRequest = async () => {
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.user.token}`
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
        }
    }
        
    

    useEffect(() => {
        getServcice();
    }, [])

    return (
        <UserContext.Provider value={{ service, getWorkman}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
