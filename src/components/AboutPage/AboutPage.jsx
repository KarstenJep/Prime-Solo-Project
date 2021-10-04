import React from 'react';


function AboutPage() {
  return (
    <div className="formPanel">
      <center>
        {/* Logo */}
        <img src="https://bootstraplogos.com/wp-content/uploads/edd/2017/11/logo-1.png" width="50" />
        <h3><b>Technologies:</b></h3>
      </center>

      {/* Technology List */}
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>SQL</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>Material-UI</li>
        <li>Moment.js</li>
      </ul>

      <center>
        {/* Giphy source */}
        <h3><b>Cheers!</b></h3>
        <iframe src="https://giphy.com/embed/DGWAx8d3IkICs" width="240" height="180" frameBorder="5" frameRadius="5"
          margin="" class="giphy-embed" allowFullScreen></iframe>
        <p><a href="https://giphy.com/gifs/cool-DGWAx8d3IkICs"></a></p>
        <h4>- Karsten Jepsen - </h4>
      </center>
    </div>
  );
}

export default AboutPage;