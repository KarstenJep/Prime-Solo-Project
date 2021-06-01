import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import UpdatePage from '../UpdatePage/UpdatePage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SchedulePage from '../SchedulePage/SchedulePage';
import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import AddPage from '../AddPage/AddPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import InventoryPage from '../InventoryPage/InventoryPage';
import './App.css';
// import Button from '@material-ui/core/Button'
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';

// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  // const [state, setState] = React.useState(false)

  // const toggleDrawer = (open) => (event) => {
  //   setState(open)
  // }

  // const list = () => (
  //   <div onClick={toggleDrawer(false)}>
  //   <List>
  //     <ListItem button>It works</ListItem>
  //   </List>
  //   </div>
  // )

  // return (
  //   <div>
  //     <Button onClick={toggleDrawer(true)}>Open From Top</Button>
  //     <Drawer
  //       ancho={'right'}
  //       open={state}
  //       onClose={toggleDrawer(false)}
  //       >
  //       {list()}
  //     </Drawer>
  //   </div>

    <Router>
    //   <div>
    //     <Nav />
    //     <Switch>
    //       {/* Visiting localhost:3000 will redirect to localhost:3000/login */}
    //       <Redirect exact from="/" to="/login" />
          <Layout>

          </Layout>
          {/* Visiting localhost:3000/about will show the about page. */}
          {/* <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route> */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows homePage else shows LoginPage
            exact
            path="/home"
          >
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddPage else shows LoginPage
            exact
            path="/add"
          >
            <AddPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows SchedulePage else shows LoginPage
            exact
            path="/schedule"
          >
            <SchedulePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows SchedulePage else shows LoginPage
            exact
            path="/update"
          >
            <UpdatePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InventoryPage else shows LoginPage
            exact
            path="/inventory"
          >
            <InventoryPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/home"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/home"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/home"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/home"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/home"
            // - else shows AboutPage at "/about"
            exact
            path="/about"
            authRedirect="/home"
          >
            <AboutPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  // );
}

export default App;
