import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [gege, setGege] = useState(1);

    return (
        <UserContext.Provider value={{ gege }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider; 
export const useUser = () => useContext(UserContext);
