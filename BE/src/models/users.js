"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here // định danh mối quan hệ với các bảng khác
    }
  }
  // here no need id because id autoincrement in migration
  Users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.BOOLEAN, // save 0  or 1 into db
      // typeRole: DataTypes.STRING,
      // keyRole: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
