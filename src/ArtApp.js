import React, { useState, useRef, useEffect } from 'react';
import './ArtApp.css';

function ArtApp() {
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    };

    const handleMouseMove = (e) => {
      if (isDrawing) {
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = color;
        context.lineWidth = isErasing ? eraserSize : brushSize;
        context.stroke();
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [color, brushSize, eraserSize, isErasing]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleBrushSizeChange = (e) => {
    setBrushSize(e.target.value);
  };

  const handleEraserSizeChange = (e) => {
    setEraserSize(e.target.value);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveArt = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'art.png';
    link.click();
  };

  const handleToggleEraser = () => {
    setIsErasing(!isErasing);
  };

  return (
    <div className="art-app">
      <h1>Art App</h1>
      <div className="canvas-container">
        <canvas ref={canvasRef} id="art-canvas" width="800" height="600"></canvas>
      </div>
      <div className="toolbar">
        <input type="color" value={color} onChange={handleColorChange} />
        <label>
          Brush Size:
          <input type="range" min="1" max="100" value={brushSize} onChange={handleBrushSizeChange} />
          {brushSize}
        </label>
        <button onClick={handleToggleEraser}>{isErasing ? 'Switch to Brush' : 'Switch to Eraser'}</button>
        {isErasing && (
          <label>
            Eraser Size:
            <input type="range" min="1" max="100" value={eraserSize} onChange={handleEraserSizeChange} />
            {eraserSize}
          </label>
        )}
        <button onClick={handleClearCanvas}>Clear Canvas</button>
        <button onClick={handleSaveArt}>Save Art</button>
      </div>
    </div>
  );
}

export default ArtApp;
