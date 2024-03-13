const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM(["viewer", "admin"]),
        },
      },
      {
        tableName: "users",
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: "email", as: "user" });
  }
}

module.exports = User;
