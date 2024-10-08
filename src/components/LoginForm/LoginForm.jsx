import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import hop from '../../hop.png';
// Material UI imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    // Checking for state
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
      {/* Logo */}
      <img src={hop} width="70" className="logo"/>
      {/* Title */}
      <h1>What's Hop'nin?</h1>

      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      
      {/* Username */}
      <Box p={1} >
          <TextField
            className="input"
            type="text"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            size="small"
          />
        </Box>
      
      {/* Password */}
      <Box p={1} >
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            size="small"
          />
        </Box>
     
     {/* Login Button */}
      <Box p={2} >
        <Button 
          size="large" 
          type="submit" 
          value="Log In" 
          variant="contained" 
          color="primary">
          Login
        </Button>
      </Box>

      {/* Register Link */}
      <Box p={1} >
        <Button 
          size="small" 
          type="submit" 
          value="Log In" 
          variant="text" 
          color="default"
          onClick={() => {
            history.push('/registration');
          }}>
          <u>No account? Register</u>
        </Button>
      </Box>
    </form>
  );
}

export default LoginForm;
