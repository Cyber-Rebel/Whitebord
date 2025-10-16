import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [shapes,setshapes] = useState([]);
  const [paints,setpaints] = useState(true)
  const [selectedShape, setSelectedShape] = useState(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [cursorstyle, setCursorStyle] = useState('pointer');
  const [eraseMode, setEraseMode] = useState(false);
  const [postion,setpostion]= useState({
    x:210,
    y:210
  })

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";
  }, [postion]);

  const startDrawing = (e) => {
    if(paints){
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
  }
  };

  const draw = (e) => {
    if (isDrawing) {;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext("2d");
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (eraseMode) {
      ctx.clearRect(x - 10, y - 10, 30, 30);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }}
    else{


  setpostion({x:400,y :300})
}


    
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const CreateCircle = () => {
    setCursorStyle('crosshair');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    // position x and position y its center point of circle 
    // Math.PI * 2 its full circle
    // for Half circle use Math.PI
    ctx.arc(postion.x, postion.y, 50, 0, Math.PI * 2, true); // Outer circle
    setshapes((previous) => {
      return [...previous, {
        type: "circle",
        id: Date.now(),
        x: postion.x,
        y: postion.y,
        radius: 50,
      }]

    })
    ctx.stroke();
  };
  const onDragfn = (e) => {
    alert("onDrag")
    console.log(e)

  };
const dbclick=(e)=>{
  const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clickedShape = shapes.find(shape => {
     return    Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2) <= shape.radius
    })
    if (clickedShape) {
      alert("clicked on circle")
      setSelectedShape(clickedShape);
    } else {
      alert("not clicked on circle")
    }
    setpaints(!paints)
    console.log(postion)
}


  return (
    <div className={`flex flex-col items-center bg-black   cursor-${cursorstyle} justify-center h-screen gap-4`}>
      <canvas
        ref={canvasRef}
        width={900}
        height={700}
        
      onDoubleClick={dbclick}
        
        className="border border-gray-700 bg-black"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
<div className="flex w-full  justify-center gap-20 items-center h-auto">
      <button
        onClick={() => setEraseMode(!eraseMode)&& setCursorStyle('auto')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {eraseMode ? "Switch to Draw" : "Switch to Eraser"}
      </button>
      <button   className="px-4 py-2  bg-red-600 text-white" onClick={CreateCircle}>
        Cicle
      </button>
      <button  className="px-4 py-2  bg-green-600 text-white" onClick={onDragfn}
 >
        onDrag
      </button>
      <button className="px-4 py-2 bg-green-600 text-white" onClick={(e)=>{
        console.log(e)
        setpaints(!paints)

      }}>
       {paints?"StartDrawing":"StopDrawing"}
        
      </button>
      </div>
    </div>
  );
};

export default App;
