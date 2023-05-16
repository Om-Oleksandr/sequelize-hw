const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 100) + '-';
    cb(null, uniquePreffix + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
