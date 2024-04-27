import React, {useEffect, useState} from 'react';
import { useAuth } from "./AuthContext";
import Sidebar from '../components/sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import {Navigate} from "react-router-dom";

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
        .then(resp => resp.json())
        .then( data => {
          // todo catch token expiry, and force logout, then redirect to login page.
            setUser(data);
        })
        .catch( err => console.error('Error: ', err));
  }, [userAuth.user]);

  return (
      <>
      {userAuth.user !== null ? <AuthenticatedUser user={user} content={content} /> : <Navigate to="/login/"/>}
      </>
  );
};

function AuthenticatedUser({user, content}) {
  return (
      <div className="page-wrapper">
      <Navbar />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Sidebar user={user} />
                  { content({user: user}) }
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