import React from 'react';


function AboutPage() {
  return (
    <div className="formPanel3">
      <center>
        {/* Logo */}
        <img src="https://bootstraplogos.com/wp-content/uploads/edd/2017/11/logo-1.png" width="50" />
        <h3><b>Technologies:</b></h3>
      </center>

      {/* Technology List */}
      <ul>
        <li>🍺 &nbsp;&nbsp;React</li>
        <li>🍺 &nbsp;&nbsp;Redux</li>
        <li>🍺 &nbsp;&nbsp;SQL</li>
        <li>🍺 &nbsp;&nbsp;Node.js</li>
        <li>🍺 &nbsp;&nbsp;Express</li>
        <li>🍺 &nbsp;&nbsp;Material-UI</li>
        <li>🍺 &nbsp;&nbsp;Moment.js</li>
      </ul>

      <center>
        <h3><b>Thank You!</b></h3>
        {/* Giphy source */}
        <iframe src="https://giphy.com/embed/DGWAx8d3IkICs" width="240" height="180" frameBorder="5" frameRadius="5"
          margin="" class="giphy-embed" allowFullScreen></iframe>
        <p><a href="https://giphy.com/gifs/cool-DGWAx8d3IkICs"></a></p>
      </center>
    </div>
  );
}

export default AboutPage;