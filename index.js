const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const cors = require("cors");
const initDb = require("./database");
const defineModels = require("./models/index");
const app = express();
const port = 3000;
const multer = require("multer");
const path = require("path");

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // specify the upload directory
  },
  filename: function (req, file, cb) {
    // specify the filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer upload instance
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/file/upload", upload.single("file"), function (req, res, next) {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }

  // File upload successful
  res.send("File uploaded successfully!");
});

app.get("/file/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "uploads", fileName);
  res.sendFile(filePath);
});

const db = initDb();
defineModels(db);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
