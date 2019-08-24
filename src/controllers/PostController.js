const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/secret");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    try {
      const token = req.headers.authorization.replace(/(Bearer.|")/g, "");
      // se o token não for correto ele vai disparar um erro
      jwt.verify(token, secretKey);
      // busca os arquivos ordenados de traz para frente
      const response = await Post.find().sort("-createdAt");
      return res.json(response);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "Authenticação negada" });
    }
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      const token = req.headers.authorization.replace(/(Bearer.|")/g, "");
      // pegamos o id do usuario que esta criando o post
      const { id } = jwt.verify(token, secretKey);
      // procura pelo usuario do token
      const user = await User.findById(id);
      // valida se existe usuario, se não existe é porque o token esta errado
      if (!user) {
        return res.status(400).json({ message: "Token invalido" });
      }
      // pegando informações do corpo da requisição
      const { place, description, hashtags } = req.body;
      // pegando o nome da imagem enviado
      const { filename: image } = req.file;
      // muda o formato do arquivo
      const [name] = image.split(".");
      const fileName = `${name}.jpg`;
      // trabalhando a imagem
      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, "resized", fileName));
      // deletando o arquivo temporario
      fs.unlinkSync(req.file.path);
      // criando o documento no mongodb
      const post = await Post.create({
        author: user.name,
        place,
        description,
        hashtags,
        image: fileName,
        user: user._id
      });
      // emite o event post via websocket
      req.io.emit("post", post);

      return res.json(post);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "Authenticação negada" });
    }
  }
};
