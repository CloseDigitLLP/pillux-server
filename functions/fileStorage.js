const multer = require('multer');
const fs = require('fs');
const path = require('path');

module.exports = {
  uploadFiles: (req, res, next) => {
    const uploadDir = 'uploads/students';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
      }
    });

    const upload = multer({ storage });

    return upload.any()
  }
};
