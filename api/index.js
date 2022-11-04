import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import postRoutes from "./routes/posts.js";
import multer from "multer";

const app = express();

app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
