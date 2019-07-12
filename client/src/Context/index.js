import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = React.createContext();
export const Consumer = UserContext.Consumer;

class Provider extends Component {
    /**
     * @description: the state used to maintain the user credentials
     * if there is a cookie for an authenticated user, this state is automatically 
     * updated with that information.  Else it is set to null.
     */
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        prevPath: ''
    }
    /**
     * 
     * @param {*} nextProps 
     * recieves props from the previous component
     * it then uses these to check if the location of the previous page
     * and the current location are different.
     * if so it changes the state to the new location.
     */
    componentWillReceiveProps(nextProps) {
        if(nextProps.location !== this.props.location) {
            this.setState({prevPath: this.props.location})
        }
    }

    /**
     * 
     * @param { event, string, string}
     * recieves the form submit event and user credentials from the state
     * of the sign in component.  If the basic auth matches credentials (no errors)
     * state will be updated to the res.data and will be stored in a cookie on the 
     * clients browser.
     */
    handleSignIn = (e, emailAddress, password) => {
        if(e) {
            e.preventDefault();
        }

        axios.get('http://localhost:5000/api/users', {
            auth: {
                username: emailAddress,
                password: password
            }
        })
        .then(res => {
            if(res.status === 200) {
                const user = res.data;
                this.setState({
                    authenticatedUser: user
                })
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
            this.props.history.push(this.state.prevPath)
            } 
        }).catch(err => {
            if(err.response.status === 400){
                this.props.history.push('/sign-up');
                console.log("Error Parsing and Fetching Data", err)
            } else if (err.response.status === 500) {
                this.props.history.push('/error');
                console.log("Error Parsing and Fetching Data", err)
            }
        })
    }

    /**
     * @description: resets the state and deletes the user cookie
     * before redirecting to the main route.
     */
    handleSignOut = () => {
        this.setState({
            authenticatedUser: null
        });
        Cookies.remove('authenticatedUser')

        this.props.history.push('/courses');
 }

    render () {
        const { authenticatedUser } = this.state
        return (
            <UserContext.Provider value= {
                {
                    authenticatedUser,
                    signIn: this.handleSignIn,
                    signOut: this.handleSignOut
                }
            } >
            {this.props.children}
            </UserContext.Provider>
        )
    }
}

//exported withRouter to have access to this.props.history.push();
export default withRouter(Provider);