const express = require("express");
var exphbs = require("express-handlebars");

const port = 3000;
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.use(function (req, res) {
  res.send("Not Found");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
