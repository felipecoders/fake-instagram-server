const jwt = require("jsonwebtoken");
const secretKey = require("../config/secret");
const Post = require("../models/Post");

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      const token = req.headers.authorization.replace(/(Bearer.|")/g, "");
      // pegamos o id do usuario que esta criando o post
      const { id } = jwt.verify(token, secretKey);
      // pega o post pelo id
      const post = await Post.findById(req.params.id);
      // valida se deve adicionar ou remover o like
      post.likes.includes(id)
        ? (post.likes = post.likes.filter(like => like.toString() !== id))
        : post.likes.push(id);
      // manda salvar com a alteração
      await post.save();

      // emitindo o evento like via websocket
      req.io.emit("like", post);
      // retorna
      return res.json(post);
    } catch (e) {}
  }
};
