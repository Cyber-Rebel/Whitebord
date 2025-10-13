import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraseMode, setEraseMode] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
  }, []);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext("2d");
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (eraseMode) {
      ctx.clearRect(x - 5, y - 5, 20, 20);
      setIsDrawing(true);
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext("2d");
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (eraseMode) {
      ctx.clearRect(x - 10, y - 10, 30, 30);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 gap-4">
      <canvas
        ref={canvasRef}
        width={900}
        height={700}
        className="border border-gray-700 bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>

      <button
        onClick={() => setEraseMode(!eraseMode)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {eraseMode ? "Switch to Draw" : "Switch to Eraser"}
      </button>
    </div>
  );
};

export default App;
