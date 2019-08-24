const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");
const SessionController = require("./controllers/SessionController");
const UserController = require("./controllers/UserController");
const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

const routes = new express.Router();
// configurações do multer
// que permite trabalharmos com o tipo de envio "multipart Form"
// que pode conter arquivos
const upload = multer(uploadConfig);

// rotas
routes.post("/signin", SessionController.store);
routes.post("/signup", UserController.store);
routes.get("/posts", PostController.index);
routes.post("/posts", upload.single("image"), PostController.store);
routes.post("/posts/:id/like", LikeController.store);

module.exports = routes;
