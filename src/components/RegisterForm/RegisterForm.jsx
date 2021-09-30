import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Material UI imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      {/* Logo */}
      <img src="https://bootstraplogos.com/wp-content/uploads/edd/2017/11/logo-1.png" width="70" className="logo"/>
      {/* Title */}
      <h1>New User</h1>

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      {/* Username */}
      <Box p={1} >
          <TextField
            className="input"
            type="text"
            label="Username"
            variant="outlined"
            required
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
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            size="small"
          />
      </Box>
          
     {/* Register Button */}
     <Box p={2} >
        <Button 
          size="large" 
          type="submit" 
          value="Log In" 
          variant="outlined" 
          color="primary">
          Register
        </Button>
      </Box>
      
      {/* Login Link */}
      <Box p={1} >
        <Button 
          size="small"
          type="submit" 
          value="Log In" 
          variant="text"
          aria-label="underlined" 
          color="default"
          onClick={() => {
            history.push('/login');
          }}>
           <u>Already Registered? Login</u>
        </Button>
      </Box>
    </form>
  );
}

export default RegisterForm;
