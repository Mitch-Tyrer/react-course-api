import React from 'react';
import './styles/global.css';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

//Components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UpdateCourse from './Components/UpdateCourse';
//Authenticated Routes
import PrivateRoute from './Components/PrivateRoute';
//Error Pages
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import Error from './Components/Error';



const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/courses" />} />
        <Route exact path="/courses" render={(props) => <Courses {...props} />} />
        <Route exact path="/courses/:id" render={(props) => <CourseDetail {...props} />} />
        <Route exact path="/sign-in" render={(props) => <UserSignIn {...props} />} />
        <Route exact path="/sign-up" render={(props) => <UserSignUp {...props} />} />
        <Route exact path="/sign-out" render={() => <Redirect to="/courses" />} />
        <PrivateRoute exact path="/create-course" component={CreateCourse} />
        <PrivateRoute exact path="/courses/:id/update" render={(props) => <UpdateCourse {...props} />} />
        <Route exact path="/notfound" component={NotFound} />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route exact path="/error" component={Error} />
      </Switch>
    </>
  );
}

export default withRouter(App); 
