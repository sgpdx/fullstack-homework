// Initial code outline from https://github.com/caterinasworld/fullstack-examples/tree/main/express/09-pug
// Edits and additional code by Serena Glick, February 2026

const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const { getCapitalsData } = require("./back-end.js");

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
// app.use(express.static('/public'));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Main",
    heading: "Welcome to the Main Page to learn about the World",
  });
});

app.get("/capitals", async (req, res) => {
  const capitalsData = await getCapitalsData();
  res.render("page", {
    title: "Capitals",
    heading: "Countries and Capitals",
    subheading: "You may be surprised at what you learn!",
    data: capitalsData,
  });
});

app.get("/populous", (req, res) => {
  res.render("page", {
    title: "Populous",
    heading: "Most Populous Countries",
    subheading: "Countries with a population of at least 50 million people",
  });
});

app.get("/regions", (req, res) => {
  res.render("page", {
    title: "Regions",
    heading: "Regions of the World",
    subheading: "Number of countries in each region",
  });
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
