import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = React.createContext();
export const Consumer = UserContext.Consumer;

class Provider extends Component {
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        prevPath: ''
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location !== this.props.location) {
            this.setState({prevPath: this.props.location})
        }
    }

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

export default withRouter(Provider);