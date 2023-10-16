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


httpServer.on("request", (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(":)");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Página não encontrada.");
  }
});


httpServer.listen(3000, () => {
  console.log("Servidor Socket.IO rodando na porta 3000");
});