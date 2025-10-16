import React from "react";

const Canvas = ({ 
  canvasRef, 
  onMouseDown, 
  onMouseMove, 
  onMouseUp, 
  onMouseLeave,
  width = 900,
  height = 700,
  className = "border border-gray-700 bg-white"
}) => {
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default Canvas;