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
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link> */}
      <div> 
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {!user.id && ( 
          <Link className="navLink" to="/about">
            About
          </Link>
        )}

        {user.id && (
          <>
            <Link className="navLink" to="/add">
              Add Batch
            </Link>
            <Link className="navLink" to="/schedule">
              Schedule
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
