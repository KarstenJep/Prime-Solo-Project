import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import UpdatePage from '../UpdatePage/UpdatePage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import OutlookPage from '../OutlookPage/OutlookPage';
import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import AddPage from '../AddPage/AddPage';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useDispatch } from 'react-redux';
import './App.css';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (

    <Router>
       <div>
         <Nav />
         <Switch>
           {/* Visiting localhost:3000 will redirect to localhost:3000/login */}
           <Redirect exact from="/" to="/login" />

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
            // logged in shows OutlookPage else shows LoginPage
            exact
            path="/schedule"
          >
            <OutlookPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UpdatePage else shows LoginPage
            exact
            path="/update/:id"
          >
            <UpdatePage />
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
            <LoginForm />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/home"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/home"
          >
            <RegisterForm />
          </ProtectedRoute>
          
          {/* Visiting localhost:3000/about will show the about page. */}
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
  );
}

export default App;
