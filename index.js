const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const cors = require("cors");
const initDb = require("./database");
const defineModels = require("./models/index");
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const db = initDb();
defineModels(db);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
