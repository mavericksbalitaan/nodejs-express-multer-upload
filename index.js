const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Multer configuration for single file upload to disk
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

app.post("/single", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("Hello World");
});

// Multer configuration for multiple files upload to memory
const storageMultiple = multer.memoryStorage();
const uploadMultiple = multer({ storage: storageMultiple });
const uploadFile = require("./services/s3upload");

app.post("/multiple", uploadMultiple.array("files"), async (req, res) => {
  console.log(req.files);
  const files = req.files;

  files.map(async (file) => {
    await uploadFile(file);
  });

  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
