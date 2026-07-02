import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, "uploads/");
  },

  filename(_, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;