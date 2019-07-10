import React from 'react';
import '../styles/404.css';


const Error = (props) => (
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404">
        <h1><span>E</span><span>R</span><span>R</span><span>O</span><span>R</span></h1>
      </div>
      <h2>Sorry! We just encountered an unexpected error!</h2>
      <div className="grid-100 pad-bottom">
        <button className="button button-secondary">
        <div onClick={() => props.history.goBack()}>Go Back</div>
        </button></div>
    </div>

  </div>
  //<!-- This templates was made by Colorlib (https://colorlib.com) -->//

);

export default Error;