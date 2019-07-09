import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Consumer } from '../Context';
import axios from 'axios';

export default class CourseDetail extends Component {
    state = {
        course: [],
        user: []
    }

    componentDidMount () {
        axios({
            method: 'GET',
            url: "http://localhost:5000/api/courses/" + this.props.match.params.id
        }).then( res => {
            this.setState({ course: res.data, user: res.data.user });
        })
        .catch(err => {
            if(err.response.status === 400){
                this.props.history.push('/notfound');
                console.log("Error Parsing and Fetching Data", err)
            } else if (err.response.status === 500) {
                this.props.history.push('/error');
                console.log("Error Parsing and Fetching Data", err)
            }
        })
    }

    handleDelete = (e, emailAddress, password) => {
        if (e) {
            e.preventDefault();
        }

        axios({
            method: 'DELETE',
            url: "http://localhost:5000/api/courses/" + this.props.match.params.id,
            auth:{
                username: emailAddress,
                password: password
            }
        }).then(() => this.props.history.push('/courses'))
        .catch(err => {
            if(err.status === 401){
                this.props.history.push('/forbidden');
                console.log("Error Parsing and Fetching Data", err)
            } else if (err.status === 500) {
                this.props.history.push('/error');
                console.log("Error Parsing and Fetching Data", err)
            }
        })
    }

    render() {
        const course = this.state.course
        console.log(course)    
        const courseUser = this.state.user
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <Consumer>
                                {
                                    ({ authenticatedUser }) => (
                                       authenticatedUser !== null && (authenticatedUser._id === courseUser._id )? (
                                            <span>
                                                <Link className="button" to={`/courses/${course._id}/update`}>Update Course</Link>
                                                <Link className="button" to="#" onClick={e => this.handleDelete(e, authenticatedUser.emailAddress, authenticatedUser.password)}>Delete Course</Link>
                                            </span>
                                        ) : (<span></span>)
                                )}
                            </Consumer>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>By {courseUser.firstName} {courseUser.lastName} </p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={course.description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown source={course.materialsNeeded} />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}