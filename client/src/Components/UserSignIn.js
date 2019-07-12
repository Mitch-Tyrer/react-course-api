import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer, UserContext } from '../Context';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: ''
    }
    /** 
     * @description: checks if a user is logged in. If they are
     * they are redirected to the main route.
     */
    static contextType = UserContext;
    componentDidMount () {
        if(this.context.authenticatedUser !== null) {
            this.props.history.push('/');
        }
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


    render() {
            return (
                <Consumer>
                    {({ signIn }) => (
                        <div className="bounds">
                            <div className="grid-33 centered signin">
                                <h1>Sign In</h1>
                                <div>
                                    <form onSubmit={e => signIn(e, this.state.emailAddress, this.state.password)}>
                                        <div>
                                            <input id="emailAddress"
                                                name="emailAddress"
                                                type="text"
                                                className=""
                                                placeholder="Email Address"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div>
                                            <input id="password"
                                                name="password"
                                                type="password"
                                                className=""
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="grid-100 pad-bottom">
                                            <button className="button" type="submit">Sign In</button>
                                            <Link to="/" className="button button-secondary">Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                                <p>&nbsp;</p>
                                <p>Don't have a user account? <Link to="/sign-up">Click here</Link> to sign up!</p>
                            </div>
                        </div>
                    )}
                </Consumer>
            );
        }
    }