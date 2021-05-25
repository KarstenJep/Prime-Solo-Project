import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function AddPage() {
  return (
    <div className="container">
      <p>Let's add a batch biatch!</p>
    </div>
  );
}

export default AddPage;
