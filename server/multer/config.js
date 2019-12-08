const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "server/images",
    filename: function(req, file, cb) {
      cb(
        null,
        file.originalname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });

  const upload = multer({storage});

  export default upload