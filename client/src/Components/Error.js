import React from 'react';
import '../styles/404.css';
import { Link } from 'react-router-dom';

const Error = () => (
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404">
        <h1><span>E</span><span>R</span><span>R</span><span>O</span><span>R</span></h1>
      </div>
      <h2>Sorry! We just encountered an unexpected error!</h2>
      <div className="grid-100 pad-bottom">
        <button className="button button-secondary">
          <Link to="/">Go Back</Link>
        </button></div>
    </div>

  </div>
  //<!-- This templates was made by Colorlib (https://colorlib.com) -->//

);

export default Error;