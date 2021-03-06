import React from 'react';
import '../styles/404.css';


const Forbidden = (props) => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1><span>F</span><span>O</span><span>R</span><span>B</span><span>I</span><span>D</span><span>D</span><span>E</span><span>N</span></h1>
        </div>
        <h2>You Do Not Have Access This Page!</h2>
        <div className="grid-100 pad-bottom">
          <button className="button button-secondary">
            <div onClick={() => props.history.go(-2)}>Go Back</div>
          </button>
        </div>
      </div>
    </div>
    //<!-- This templates was made by Colorlib (https://colorlib.com) -->//
  )
};

export default Forbidden;