const multer = require('multer');
const fs = require('fs');
const path = require('path');

module.exports = {
  uploadFiles: (req, res, next) => {
    const uploadDir = 'uploads/students';
    const dirs = uploadDir.split("/");

    dirs.forEach((dir, index) => {
      const parentDir = dirs.slice(0, index).join("/");
      const dirPath = `${parentDir}/${dir}`;

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    });

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
