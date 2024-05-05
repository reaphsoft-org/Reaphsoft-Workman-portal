import React from "react";
import NavBar from "./Navbar";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import LeftSideBar from "./LeftSideBar";

const Layout = () => {
    return ( 
        <div>
            <NavBar />
            <LeftSideBar />
            <Sidebar />
            <Outlet />
        </div>
    );
}
 
export default Layout;