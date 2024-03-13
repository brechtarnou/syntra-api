const User = require("./user");
const Post = require("./post");

const init = (sequelize) => {
  User.init(sequelize);
  Post.init(sequelize);
};

const associate = (models) => {
  User.associate(models);
  Post.associate(models);
};

module.exports = defineModels = async (sequelize) => {
  init(sequelize);
  associate({ User, Post });

  await sequelize.sync({ force: false });
};
