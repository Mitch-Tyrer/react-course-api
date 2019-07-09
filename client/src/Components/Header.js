import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../Context';

const Header = () => {
    return (
        <Consumer>
            {({ authenticatedUser, signOut }) => (
                 (authenticatedUser !== null) ? (
                    <div className="header">
                        <div className="bounds">
                            <h1 className="header--logo">Courses</h1>
                            <nav>
                                <span>Welcome { `${authenticatedUser.firstName} ${authenticatedUser.lastName}` }!</span>
                                <Link className="signin" to="/sign-out" onClick={signOut} >Sign Out</Link>
                            </nav>
                        </div>
                    </div>
                ) : (
                        <div className="header">
                            <div className="bounds">
                                <h1 className="header--logo">Courses</h1>
                                <nav>
                                    <Link className="signup" to="/sign-up">Sign Up</Link>
                                    <Link className="signin" to="/sign-in">Sign In</Link>
                                </nav>
                            </div>
                        </div>
                    )
            )}
        </Consumer>

    );
}

export default Header;