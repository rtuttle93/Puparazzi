//Added by Logan

const multer = require("multer");

var maxSize = 1000000000

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
  
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: maxSize } }
  
);

module.exports = uploadFile;
