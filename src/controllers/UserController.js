const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashPassword
      });

      user.password = undefined;

      return res.json(user);
    } catch (e) {
      console.error("Um erro ocorreu ao cadastrar o usuario", e);
      return res
        .status(401)
        .send({ message: "Usuario e/ou email ja esta em uso" });
    }
  }
};
