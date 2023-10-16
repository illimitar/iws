const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("mensagem", (mensagem) => {
    console.log(`Cliente ${socket.id} enviou uma mensagem: ${mensagem}`);
    // Enviar a mensagem de volta para o cliente que a enviou
    socket.emit("mensagem", `Você disse: ${mensagem}`);
    socket.broadcast.emit("mensagem", `Cliente disse: ${mensagem}`);
  });

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

httpsServer.listen(443, () => {
  console.log("Servidor Socket.IO rodando na porta 3000");
});
