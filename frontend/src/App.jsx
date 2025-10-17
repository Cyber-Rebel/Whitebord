import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const App = () => {
  const canvasRef = useRef(null);
  const listencanvasRef = useRef(null)
  const [paints,setpaints] = useState(true)
  const [isDrawing, setIsDrawing] = useState(false);
  const [cursorstyle, setCursorStyle] = useState('pointer');
  const [eraseMode, setEraseMode] = useState(false);
  const [pointer,setpointer] = useState([])
const [ socket, setSocket ] = useState(null);


  useEffect(() => {
    
    
const tempSocket = io("http://localhost:3000/");
setSocket(tempSocket)

tempSocket.on("drawpoint",async(data)=>{
  console.log("data from server ",data.pointer)

  const ctx1 = listencanvasRef.current.getContext("2d");
  ctx1.lineWidth = 10;
  ctx1.lineCap = "round";
  ctx1.strokeStyle = "white";
  ctx1.beginPath();
 await data.pointer?.forEach(element => {
    ctx1.lineTo(element.x, element.y);
  });
  ctx1.stroke();
  ctx1.closePath();
})
const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");
ctx.lineWidth = 10;
ctx.lineCap = "round";
    ctx.strokeStyle = "white";
    
  }, []);
  
  const startDrawing = (e) => {
    console.log(pointer)
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
    setpointer((prev)=>[...prev,{x,y}])
    socket.emit('sendcordinate',{
      pointer:pointer
    })

    if (eraseMode) {
      ctx.clearRect(x - 10, y - 10, 30, 30);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }}
   


    
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const onDragfn = (e) => {
    alert("onDrag")
    console.log(e)

  };


  return (
    <div className={`flex  items-center bg-black   cursor-${cursorstyle} justify-center h-screen gap-4`}>
      <div>

      <canvas
        ref={canvasRef}
        width={900}
        height={700}
        
        
        className="border border-gray-700 bg-black"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
<div className="flex w-full  justify-center gap-20 items-cent
er h-auto">
      <button
        onClick={() => setEraseMode(!eraseMode)&& setCursorStyle('auto')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {eraseMode ? "Switch to Draw" : "Switch to Eraser"}
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
      <div >
      <div className="w-[600px] text-white rounded-lg overflow-hidden shadow-lg border border-gray-700">
        {/* Top Bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2d2d2d]">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>

        {/* Terminal Content */}
        <div className="bg-black text-sm p-4 h-80 overflow-y-auto font-mono">
          <p className="text-green-500">Hp Start</p>
      {pointer.map(element => {
     return   <p style={{color: `rgb(${Math.random()*255},${Math.random()*255} , ${Math.random()*255})`}} >x:{element?.x} y:{element?.y}</p>
      })}
      <p className="text-red-900">Power Off</p>
      
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#2d2d2d] px-3 py-1 text-gray-400 text-xs flex justify-between items-center">
          <span>BackTop</span>
          <span className="italic">_</span>
        </div>
      </div>
      
      </div>
<div>
<canvas
ref={listencanvasRef}

  width={600}
          className="border border-gray-700 bg-black"
        height={700}
>

</canvas>
</div>
    </div>
  );
};

export default App;
