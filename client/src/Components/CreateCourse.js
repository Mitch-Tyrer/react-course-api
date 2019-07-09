import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../Context';
import axios from 'axios';

export default class CreateCourse extends Component {
    state = {
        user: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        err: {},
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e, emailAddress, password, id) => {
        if (e) {
            e.preventDefault();
        }
        // Axios Post Request
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/courses',
            auth: {
                username: emailAddress,
                password: password
            },
            data: {
                user: id,
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded
            }

        })
            .then(() => this.props.history.push('/courses'))
            .catch(err => {
                if (err.response.status === 400) {
                    this.setState({
                        err: err.response.data
                    })
                } else if (err.response.status === 500) {
                    this.props.history.push('/error')
                }
            })
    }


    render() {
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                {this.state.err.error ?
                    <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                            <ul>
                                {this.state.err.error.map((err, i) => <li key={i}>{err}</li>)}
                            </ul>
                        </div>
                    </div> : ""
                }
                <Consumer>
                    {
                        ({ authenticatedUser }) => (
                            <form onSubmit={e => this.handleSubmit(e, authenticatedUser.emailAddress, authenticatedUser.password, authenticatedUser._id)}>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleChange} />
                                        </div>
                                        <p>By Joe Smith</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleChange}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                                        placeholder="Hours" onChange={this.handleChange} />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.handleChange}></textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Create Course</button>
                                    <button className="button button-secondary">
                                        <Link to="/">Cancel</Link>
                                    </button></div>
                            </form>
                        )
                    }


                </Consumer>
            </div>

        );
    }
}