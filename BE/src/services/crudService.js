import bcryptjs from "bcryptjs";
import db from "../models";
const salt = bcryptjs.genSaltSync(10);

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.Users.create({
        ...data,
        password: hashPasswordFromBcrypt,
        gender: data.gender === "1" ? true : false,
      });
      resolve("Create user successfully !");
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.Users.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const hashPassword = bcryptjs.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Users.update(user, { where: { id: user.id } });
      let getAllUsers = await db.Users.findAll();
      resolve(getAllUsers);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUserData = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Users.destroy({ where: { id: userId } });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserInfoById,
  updateUserData,
  deleteUserData,
  hashUserPassword,
};
