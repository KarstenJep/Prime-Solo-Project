import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/home';
    loginLinkData.text = 'Home';
  }


  return (
    <div className="nav">
      {/* <Link to="/home">
        <h2 className="nav-title">What's Hop'nin?</h2>
      </Link> */}
      <div> 
        <Link className="navLink" to={loginLinkData.path}>
          <b>{loginLinkData.text}</b>
        </Link>

        {!user.id && ( 
          <Link className="navLink" to="/about">
            About
          </Link>
        )}

        {user.id && (
          <>
            <Link className="navLink" to="/add">
              <b>Add Batch</b>
            </Link>
            <Link className="navLink" to="/schedule">
              <b>Schedule</b>
            </Link>
            {/* <Link className="navLink" to="/inventory">
              Inventory
            </Link>  */}
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
