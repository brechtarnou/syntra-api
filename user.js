const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Define User model
class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM(["viewer", "admin"]),
  },
  { sequelize, modelName: "user" }
);

// Sync models with database
sequelize.sync();

const router = express.Router();
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/:email", async (req, res) => {
  const user = await User.findByPk(req.params.email);
  res.json(user);
});
router.post("/login", async (req, res) => {
  const user = await User.findByPk(req.body.email);
  if (user.password === req.body.password) {
    return res.status(200).json(user);
  }
  return res.status(401).json("Incorrect password.");
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
