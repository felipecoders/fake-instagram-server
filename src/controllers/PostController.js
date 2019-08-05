const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    // busca os arquivos ordenados de traz para frente
    const response = await Post.find().sort('-createdAt');

    return res.json(response);
  },

  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body;
    const { filename: image } = req.file;
    // muda o formato do arquivo
    const [name] = image.split('.');
    const fileName = `${name}.jpg`;
    // console.log(req.file)
    // trabalhando a imagem
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName),
      );
    // deletando o arquivo temporario
    fs.unlinkSync(req.file.path);
    // criando o documento no mongodb
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });
    // emite o event post via websocket
    req.io.emit('post', post);

    return res.json(post);
  },
};
