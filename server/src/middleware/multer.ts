import multer from "multer";

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

export const Upload = multer({ storage });
