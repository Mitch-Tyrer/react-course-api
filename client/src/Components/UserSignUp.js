import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Consumer } from '../Context'
import axios from 'axios';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSignUp = (e, signIn) => {
        if (e) {
            e.preventDefault();
        }

        if (this.state.password === '') {
            console.log("Please enter a password")
        } else if (this.state.password !== this.state.confirmPassword) {
            console.log('passwords do not match')
        } else {
            axios({
                method: 'POST',
                url: 'http://localhost:5000/api/users',
                data: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    emailAddress: this.state.emailAddress,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                }
            }).then(res => {
                if (res.status === 201) {
                    signIn(null, this.state.emailAddress, this.state.password);
                }

            }).catch(err => console.log("error fetching data", err))
        }
    }

    render() {
        return (
            <Consumer>
                {({ signIn }) => (
                    <div className="bounds">
                        <div className="grid-33 centered signin">
                            <h1>Sign Up</h1>
                            <div>
                                <form onSubmit={e => this.handleSignUp(e, signIn)}>
                                    <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleChange} /></div>
                                    <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleChange} /></div>
                                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange} /></div>
                                    <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange} /></div>
                                    <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleChange} /></div>
                                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button>
                                        <button className="button button-secondary">
                                            <Link to="/">Cancel</Link>
                                        </button></div>
                                </form>
                            </div>
                            <p>&nbsp;</p>
                            <p>Already have a user account? <Link to="/sign-in">Click here</Link> to sign in!</p>
                        </div>
                    </div>
                )}
            </Consumer>
        );
    }
}