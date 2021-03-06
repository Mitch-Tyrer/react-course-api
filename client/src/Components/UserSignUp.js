import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Consumer, UserContext } from '../Context'
import axios from 'axios';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        err: {},
        emailError: '',

    }
    /**
     * @description updates the state based on the input fields as they change
     * @type {string}
     */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    /**
     * @description: checks if a user is logged in.
     * if they are, it redirects to the main page.
     */
    static contextType = UserContext;
    componentDidMount () {
        if(this.context.authenticatedUser !== null) {
            this.props.history.push('/');
        }
    }
/**
 * @params { event, function }
 * takes the submit event from the form and the signIn method from
 * the context API.
 * Posts the updated state to the server and then automatically logs in
 * the new user
 */
    handleSignUp = (e, signIn) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            err: {},
            emailError: ''
        })
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

        }).catch(err => {
            if (err.response.status === 400) {
                this.setState({
                    err: err.response.data
                })
            } else if (err.response.status === 409) {
                this.setState({
                    emailError: 'Email is already in use.'
                })

            } else if (err.response.status === 500) {
                this.props.history.push('/error');
            }
        })
    }


    render() {

        return (
            <div className="bounds course--detail">
                {this.state.err.error ?
                    <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                            <ul>
                                {this.state.err.error.map((err, i) => <li key={i}>{err}</li>)}
                            </ul>
                        </div>
                    </div> :
                    this.state.emailError !== '' ?
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    {this.state.emailError}
                                </ul>
                            </div>
                        </div> : ""

                }

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
                                                <Link to="/" className="button button-secondary">Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                                <p>&nbsp;</p>
                                <p>Already have a user account? <Link to="/sign-in">Click here</Link> to sign in!</p>
                            </div>
                        </div>
                    )}
                </Consumer>
            </div>
        );
    }
}