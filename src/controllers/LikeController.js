const Post = require('../models/Post');

module.exports = {
  async store(req, res) {
    // pega o post pelo id
    const post = await Post.findById(req.params.id);
    // incrementa no documento a quantidade de likes
    // sem nenhum tipo de validação
    post.likes += 1;
    // manda salvar com a alteração
    await post.save();

    // emitindo o evento like via websocket
    req.io.emit('like', post);
    // retorna
    return res.json(post);
  },
};
