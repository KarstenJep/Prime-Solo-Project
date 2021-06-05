import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

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
      <h2>Whats Hop'nin?</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <b>Username:</b>
          <TextField
            className="input"
            type="text"
            name="username"
            variant="outlined"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            size="small"
          />
        </label>
        {/* <TextField 
                      // className="input"
                      // className={classes.paper}
                      htmlFor="username"
                      label="Username"
                      type="text"
                      variant="outlined"
                      required
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      // error={nameError}
                      size="small"
                    /> */}
      </div>
      <div>
      {/* <TextField 
                      htmlFor="password"
                      label="Password"
                      type="text"
                      variant="outlined"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      size="small"
                      m={2}
                    /> */}
        <label htmlFor="password">
          <b>Password:&nbsp;</b>
          <TextField
            type="password"
            name="password"
            variant="outlined"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            size="small"
          />
        </label>
      </div>
      <div>
        <Button className="btn" type="submit" name="submit" value="Log In" variant="contained" color="primary" text="primary" >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
