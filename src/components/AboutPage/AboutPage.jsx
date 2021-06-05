import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="formPanel3">
      <center>
       <h2><b>Technologies:</b></h2>
       </center> 
      <ul>
        <li>🍺 &nbsp;&nbsp;React</li>
        <li>🍺 &nbsp;&nbsp;Redux</li>
        <li>🍺 &nbsp;&nbsp;SQL</li>
        <li>🍺 &nbsp;&nbsp;Node.js</li>
        <li>🍺 &nbsp;&nbsp;Express</li>
        <li>🍺 &nbsp;&nbsp;Material-UI</li>
        <li>🍺 &nbsp;&nbsp;Moment.js</li>
      </ul>
    </div>
  );
}

export default AboutPage;
