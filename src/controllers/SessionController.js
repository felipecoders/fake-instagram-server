const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/secret");
const User = require("../models/User");

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      // pegando o email e senha da requisição
      const { email, password } = req.body;
      // procurando pelo usuario
      const user = await User.findOne({ email });
      // validando existencia do usuario
      if (!user) {
        return res.json({ message: "Usuário não cadastrado" });
      }
      // verificando se a senha esta correta
      const checkPassword = await bcrypt.compare(password, user.password);
      // retorno com base no resultado
      if (checkPassword) {
        const token = jwt.sign({ id: user._id }, secretKey);
        return res.json({ token });
      } else {
        return res.status(401).json({ message: "Falha ao logar" });
      }
    } catch (e) {
      console.log(e);
      return res.status(503).json({ error: "Um erro ocorreu ao tentar logar" });
    }
  }
};
