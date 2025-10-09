import React, { useEffect, useRef,useState } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [start,setstart] = useState(false);
  const [points, setPoints] = useState([
    { x: 30, y: 40 },
    { x: 30, y: 140 }
  ]);
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    
    
    console.log("Canvas ref:", canvasRef.current.attributes);
    points.forEach((p) => {
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
});

    
  }, [points]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <canvas
// 
onClick={(e)=>{
  setstart(!start);
  
  console.log(e.clientX)
  console.log(canvasRef.current.getBoundingClientRect().left)
  console.log( e.clientX - canvasRef.current.getBoundingClientRect().left)
}}

onMouseMove={(e)=>{
  start ?
  setPoints([...points, { x: e.clientX - canvasRef.current.getBoundingClientRect().left, y: e.clientY - canvasRef.current.getBoundingClientRect().top }]):null
}}
        ref={canvasRef}
        width={900}
        height={700}
        className="border border-gray-700"
      ></canvas>
    </div>
  );
};

export default App;
// getBoundingClientRect() se canvas ka exact position milta hai, jisse click coordinates ko accurately map kiya ja sakta hai.
  // console.log(canvasRef.current.getBoundingClientRect().left)
  // console.log(canvasRef.current.getBoundingClientRect().x)
  // console.log(canvasRef.current.getBoundingClientRect().top)
  // console.log(canvasRef.current.getBoundingClientRect().y)
// getContext("2d") se canvas par drawing ke liye 2D context milta hai.