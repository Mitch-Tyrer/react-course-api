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
        user: {}
    }
    static contextType = UserContext;
    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/courses/' + this.props.match.params.id
        }).then(res => {

            const course = res.data
            const user = this.context.authenticatedUser

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

        }).catch(err => console.log("error fetching data", err))

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

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
        }).then(() => {
            this.props.history.push("/courses/" + this.props.match.params.id)
        })
    }

    render() {
        return (
            <Consumer>
                {
                    ({ authenticatedUser }) => (
                        <div className="bounds course--detail">
                            <h1>Update Course</h1>
                            <div>
                                <form onSubmit={e => this.handleUpdate(e, authenticatedUser.emailAddress, authenticatedUser.password)}>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div><input onChange={this.handleChange} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title || ''} /></div>
                                            <p>By {`${this.state.user.firsName} ${this.state.user.lastName}`} </p>
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
                                        <button className="button button-secondary">
                                            <Link to={`/courses/${this.props.match.params.id}`}> Cancel </Link>
                                        </button></div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </Consumer>
        );
    }
}