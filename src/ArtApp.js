import React from 'react';
import './ArtApp.css';

function ArtApp() {
  return (
    <div className="art-app">
      <h1>Art App</h1>
      <div className="canvas-container">
        <canvas id="art-canvas" width="800" height="600"></canvas>
      </div>
      <div className="toolbar">
        {/* Add buttons and other UI elements here */}
      </div>
    </div>
  );
}

export default ArtApp;
