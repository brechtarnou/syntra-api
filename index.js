const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./user");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
