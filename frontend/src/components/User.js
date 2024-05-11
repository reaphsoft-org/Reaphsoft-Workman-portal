import React, {useEffect, useState} from 'react';
import { useAuth } from "./AuthContext";
import Sidebar from '../components/sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import {Navigate} from "react-router-dom";
import {logout} from "../utils/auth";

const User = ({content}) => {
  const userAuth = useAuth();
  const [user, setUser] = useState({
    apartment: '',
    accountType: '',
    address: '',
    email: '',
    fullname: '',
    photoURL: '',
    serviceType: '',
  });
  const [estate, setEstate] = useState({
      estate: '',
      accountType: '',
      address: '',
      email: '',
      fullname: '',
      photoURL: '',
      serviceType: '',
      houses: [],
  });
  useEffect(() => {
    if (userAuth.user)
    fetch(`http://localhost:3001/account/user/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userAuth.user.token,
            'Content-Type': 'application/json'
          }
        }
        )
        .then((resp) => {
            if (resp.status === 401){
                // token has expired
                logout(userAuth);
                return;
            }
            return resp.json();
        })
        .then( data => {
            if(userAuth.user.account === 1) setUser(data)
            else setEstate(data)
        })
        .catch( err => console.error('Error: ', err));
  }, [userAuth, userAuth.user]);
  return (
      <>
      {userAuth.user !== null ? <AuthenticatedUser user={userAuth.user.account === 1 ? user : estate} content={content} /> : <Navigate to="/login/"/>}
      </>
  );
};

function AuthenticatedUser({user, content: Content}) {
  return (
      <div className="page-wrapper">
      <Navbar />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Sidebar user={user} />
                <Content user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default User;