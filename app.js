const express = require("express");
var exphbs = require("express-handlebars");

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

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
