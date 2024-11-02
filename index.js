const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

app.post("/", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
