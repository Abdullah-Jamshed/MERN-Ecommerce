// import { Router } from "express";
// import multer from "multer";
// import path from "path";

// const uploadRouter = Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "../uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const checkFileType = (file, cb) => {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = filetypes.test(file.mimetype);
//   if (extname && mimeType) {
//     return cb(null, true);
//   } else {
//     cb("Image Only!");
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// uploadRouter.post("/", upload.single("image"), (req, res) => {
//   console.log(req.file.page);
//   res.send(`/${req.file.page}`);
// });

// export default uploadRouter;

import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "/src/uploads"));
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  try {
    res.send(`/${req.file.path}`);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default router;
