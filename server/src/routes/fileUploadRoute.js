import { Router } from "express";
import multer from "multer";
import path from "path";

const uploadRouter = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const checkFyleType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = filetypes.test(file.mimeType);
  if (extname && mimeType) return cb(null, true);
  cb("Image Only!");
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFyleType(file, cb);
  },
});

uploadRouter.post("/", upload.single("image"),(req,res)=>{
    res.send(`/${req.file.page}`)
});

export default uploadRouter;
