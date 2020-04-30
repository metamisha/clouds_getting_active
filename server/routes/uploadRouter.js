const express = require('express');
const bodyParser = require('body-parser');
//const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/assets');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const imageFileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
    return cb(new Error("Only image files"), false);
  }
  cb(null, true);
};

const upload = multer({storage: storage, fileFilter: imageFileFilter});

const imageRouter = express.Router();

imageRouter.use(bodyParser.json());

imageRouter.route('/')
  .get((req, res, next) => {
    res.statusCode = 403;
    res.end('Get operation is not supported on /imageUpload');
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported on /imageUpload');
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation is not supported on /imageUpload');
  })
  .post(upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
  });

module.exports = imageRouter;
