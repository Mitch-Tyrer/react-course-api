import React from 'react';
import '../styles/404.css';


const NotFound = (props) => (
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404">
        <h1><span>4</span><span>0</span><span>4</span></h1>
      </div>
      <h2>we are sorry, but the page you requested was not found</h2>
      <div className="grid-100 pad-bottom">
        <button className="button button-secondary">
        <div onClick={() => props.history.go(-2)}>Go Back</div>
        </button></div>
    </div>
  </div>
  //<!-- This templates was made by Colorlib (https://colorlib.com) -->//

);

export default NotFound;