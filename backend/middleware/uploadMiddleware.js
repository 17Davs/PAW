const multer = require("multer");

// storage multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    // define name of file to timestamp atual + original name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// filter type of data
const fileFilter = (req, file, cb) => {
  // accept only image type
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed."), false);
  }
};

// multer config
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
