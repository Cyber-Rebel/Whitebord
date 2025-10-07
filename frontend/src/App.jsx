import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const canvasRef = useRef(null);

  // 4 coordinates stored in state
  const [line, setLine] = useState({
    x1: 10,
    y1: 10,
    x2: 20,
    y2: 100,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw line with updated values
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
    ctx.closePath();
  }, [line]); // re-draw when any line value changes

  // Change coordinates on button click
  const moveLine = () => {
    setLine((prev) => ({
      ...prev,
      x2: prev.x2 + 50,
      y2: prev.y2 + 50,
    }));
  };
  // obje like jo value orvide hogi wahi change hogi bake same rhega Run tihs
  // let obj= {
  //   name:"jiha",
  //   age:10
  // }
  // obj.age=20
  // console.log(obj)

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-200">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="border-dashed border-gray-700 border-8 text-black"
      ></canvas>

      <button
        onClick={moveLine}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Move Line
      </button>
    </div>
  );
};

export default App;
