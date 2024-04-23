import React, {useEffect, useState} from 'react';
import { useAuth } from "./AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
const User = ({content}) => {
  const userAuth = useAuth();
  const [user, setUser] = useState({
    apartment: '',
    accountType: '',
    address: '',
    email: userAuth.user,
    fullname: '',
    photoURL: '',
    serviceType: '',
  });
  useEffect(() => {
    fetch(`http://localhost:3001/account/user/?email=${userAuth.user}`).then(resp => resp.json()).then( data => {setUser(data);
      console.log(data)})
        .catch( err => console.error('Error: ', err));
  }, [userAuth.user]);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Sidebar user={user} />
                  { content(user) }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    );
};

export default User;