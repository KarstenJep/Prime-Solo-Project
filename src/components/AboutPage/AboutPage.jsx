import React from 'react';
import Box from '@material-ui/core/Box';

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
      <center>
       <h2><b>Thank You!</b></h2>
       </center>
      <Box ml={4}>
      <iframe src="https://giphy.com/embed/DGWAx8d3IkICs" width="240" height="180" frameBorder="5" frameRadius="5" margin="" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/cool-DGWAx8d3IkICs"></a></p>
      </Box>
    </div>
    
  );
}

export default AboutPage;
