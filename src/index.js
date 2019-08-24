const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
// permitindo que o servidor ainda receba chamadas a protocolo http
const server = require("http").Server(app);
// inserindo acesso a requisições via websokckets tambem
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb+srv://omnistack:1q2w3e@cluster0-rw5hr.mongodb.net/omnistack8?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

// criando um middleware proprio
// para inserir o acesso ao websockets para emitir eventos
app.use((req, res, next) => {
  req.io = io;
  // evita de parar a execução
  next();
});
// libera permissões para qualquer dominio ter acesso a esta api
// algumas configurações podem ser passados
app.use(cors());
// criando um caminho para acessar as imagens
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);
app.use(express.json());
// inicia as rotas
app.use(require("./routes"));

server.listen(3333);
