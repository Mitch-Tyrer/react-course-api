import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext, Consumer } from '../Context';

export default class UpdateCourse extends Component {
    state = {
        courseID: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        user: {},
        err: {}
    }
    /**
     * @description: compares the res data with the current user info as part
     * of the get request.  If they do not match user is unauthorized and redirected
     * to a forbidden path
     */
    static contextType = UserContext;
    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/courses/' + this.props.match.params.id
        }).then(res => {

            const course = res.data
            const user = this.context.authenticatedUser
            if(user) {
                if (course.user._id === user._id) {
                    this.setState({
                        courseID: res.data._id,
                        title: res.data.title,
                        description: res.data.description,
                        estimatedTime: res.data.estimatedTime,
                        materialsNeeded: res.data.materialsNeeded,
                        user: res.data.user
                    })
                } else {
                    this.props.history.push('/forbidden')
                }
            } else {
                this.props.history.push('/sign-in');
            }
           

        }).catch(err => {
            if (err.response.status === 401) {
                this.props.history.push('/forbidden');
                console.log("Error Parsing and Fetching Data", err)
            } else if (err.response.status === 500) {
                this.props.history.push('/error');
                console.log("Error Parsing and Fetching Data", err)
            } else if (err.response.status === 404) {
                this.props.history.push('/notfound');
            }
        })

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
     * @params { event, string, string }
     * takes the form submit event, and user credentials as strings.
     * makes a put request using the current state of the compoenent
     * using the user credentials for basic auth.
     */
    handleUpdate = (e, emailAddress, password) => {
        if (e) {
            e.preventDefault();
        }

        axios({
            method: 'PUT',
            url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
            auth: {
                username: emailAddress,
                password: password
            },
            data: {
                courseID: this.state._id,
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded,
            }
        }).then(res => {
            if (res.status === 204) {
                this.props.history.push("/courses/" + this.props.match.params.id)
            } else if (res.status === 404) {
                this.props.history.push("/notfound")
            }
        }).catch(err => {
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
                <h1>Update Course</h1>
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
                            <div>
                                <form onSubmit={e => this.handleUpdate(e, authenticatedUser.emailAddress, authenticatedUser.password)}>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div><input onChange={this.handleChange} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title || ''} /></div>
                                            <p>By {`${this.state.user.firstName} ${this.state.user.lastName}`} </p>
                                        </div>
                                        <div className="course--description">
                                            <div><textarea onChange={this.handleChange} id="description" name="description" className="" placeholder="Course description..." value={this.state.description || ''}>

                                            </textarea></div>
                                        </div>
                                    </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <div><input onChange={this.handleChange} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                                        placeholder="Hours" value={this.state.estimatedTime || ''} /></div>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <div><textarea onChange={this.handleChange} id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded || ''}>

                                                    </textarea></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="grid-100 pad-bottom">
                                        <button className="button" type="submit">Update Course</button>
                                        <Link to={`/courses/${this.props.match.params.id}`} className="button button-secondary">Cancel</Link>
                                        </div>
                                </form>
                            </div>
                        )
                    }
                </Consumer>
            </div>
        );
    }
}