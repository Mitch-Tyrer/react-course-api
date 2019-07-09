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

import PrivateRoute from './Components/PrivateRoute';



const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/courses" />} />
        <Route exact path="/courses" render={() => <Courses />} />
        <Route exact path="/courses/:id" render={(props) => <CourseDetail {...props} />} />
        <Route exact path="/sign-in" render={(props) => <UserSignIn {...props} />} />
        <Route exact path="/sign-up" render={() => <UserSignUp />} />
        <Route exact path="/sign-out" render={() => <Redirect to="/courses" />} />
        <PrivateRoute exact path="/create-course" component={CreateCourse} />
        <PrivateRoute exact path="/courses/:id/update" render={(props) => <UpdateCourse {...props} />} />
        {/* <Route exact path= "/" />    */}
      </Switch>
    </>
  );
}

export default withRouter(App);
