import React, { useEffect, useRef } from "react";

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Draw dot at (100, 80)
    ctx.beginPath();
    ctx.arc(130, 40, 5, 0, Math.PI * 2); // 4 = radius (dot size)
    ctx.arc(10, 40, 5, 0, Math.PI * 2); // 4 = radius (dot size)
    ctx.arc(10, 120, 5, 0, Math.PI * 2); // 4 = radius (dot size)

    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border border-gray-700"
      ></canvas>
    </div>
  );
};

export default App;
