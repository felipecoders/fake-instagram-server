const multer = require('multer');
const path = require('path');

// configuração para o multer
module.exports = {
  storage: multer.diskStorage({
    // informando onde ele deve salvar a imagem
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    // campo que permite trabalhar algumas informações da imagem
    filename(req, file, callback) {
      const filename = file.originalname.replace(/ /g, '_').toLowerCase();
      callback(null, filename);
    },
  }),
};
