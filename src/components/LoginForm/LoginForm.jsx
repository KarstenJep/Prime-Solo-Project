import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <img src="https://bootstraplogos.com/wp-content/uploads/edd/2017/11/logo-1.png" width="50" />
      <h1>What's Hop'nin?</h1>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
      <Box p={1} >
          <TextField
            className="input"
            type="text"
            label="username"
            variant="outlined"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            size="small"
          />
        </Box>
      </div>
      <div>
      <Box p={1} >
          <TextField
            type="password"
            label="password"
            variant="outlined"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            size="small"
          />
        </Box>
      </div>
      <Box p={1} >
        <Button size="large" type="submit" name="submit" value="Log In" variant="contained" color="primary" font="primary" >
          Login
        </Button>
      </Box>
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
         No account? Register 
        </button>
      </center>
    </form>
  );
}

export default LoginForm;
