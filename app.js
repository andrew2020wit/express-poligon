const express = require("express");
var exphbs = require("express-handlebars");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10000000 },
});

const port = 3000;
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Static Server
app.use(express.static(__dirname + "/public"));

// ============== Upload
app.post("/upload", upload.single("filedata"), function (req, res, next) {
  // req.file - info about file
  console.log("req.file:", req.file);

  console.log("req.body:", req.body);
  res.render("file-upload");
});

// ========== Start Standard pages
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/file-upload", function (req, res) {
  res.render("file-upload");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.use(function (req, res) {
  res.send("Not Found");
});
// ========== End Standard pages

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
