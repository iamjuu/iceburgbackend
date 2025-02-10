const multer = require('multer'); 
const Path = require ('path')
const picpath = Path.join(__dirname,"..","public")

const storage = multer.diskStorage({
    destination:picpath, // Directory to save uploaded files
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
      
      if (extname && mimeType) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed!'));
      }
    }
  });
  
  module.exports = upload;
  