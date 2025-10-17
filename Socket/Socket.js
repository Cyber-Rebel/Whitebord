import { Server } from "socket.io";

const io = new Server({
    cors:{
        origin:"http://localhost:5173",
    }
}
);

io.on("connection", (socket) => {
   console.log('User is connected')
   
   socket.on('helo', (data)=>{
    console.log("data from client ",data)
    io.emit("Sending postion", {x:4300,y:3200})

   })   
   socket.on("disconnect", () => {
      console.log("User is disconnected");
   });
   socket.on('sendcordinate',(data)=>{
    console.log(data)
    io.emit('drawpoint',data)
   })

});

io.listen(3000);