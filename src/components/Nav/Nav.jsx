import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import {useSelector, useDispatch} from 'react-redux';
// Material UI Icon imports
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/home';
    loginLinkData.text = < HomeIcon style={{ fontSize: 34 }}/>;
  }


  return (
    <div className="nav">
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
              <AddCircleIcon style={{ fontSize: 34 }}/>
            </Link>
            <Link className="navLink" to="/schedule">
              <DateRangeIcon style={{ fontSize: 34 }}/>
            </Link>
            <Link
              className="navLink"
              onClick={() => dispatch({ type: 'LOGOUT' })}>
              <ExitToAppIcon style={{ fontSize: 34 }}/>
             </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
