import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../components/AuthContext";

const Dashboard = () => {
    return ( 
        <div className="page-wrapper">
            <Navbar />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white browse-job p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <Sidebar />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default Dashboard;