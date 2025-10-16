import React from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import { useDrawing } from "../hooks/useDrawing";

const Whiteboard = () => {
  const {
    canvasRef,
    eraseMode,
    startDrawing,
    draw,
    stopDrawing,
    toggleEraseMode,
  } = useDrawing();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 gap-4">
      <Canvas
        canvasRef={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      
      <Toolbar 
        eraseMode={eraseMode} 
        onToggleEraseMode={toggleEraseMode} 
      />
    </div>
  );
};

export default Whiteboard;