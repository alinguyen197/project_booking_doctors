import bcryptjs from "bcryptjs";
import db from "../models";
import { where } from "sequelize";
import { hashUserPassword } from "../services/crudService";
const { QueryTypes } = require("sequelize");
const salt = bcryptjs.genSaltSync(10);

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      // check email already exists in database
      const isExist = await checkUserEmail(email);
      if (isExist) {
        // check user already exists in database ?
        const user = await db.Users.findOne({
          where: { email: email },
          // thuộc tính lấy ra những column trong table mình muốn
          attributes: ["email", "password", "roleId"],
          raw: true,
        });
        if (user) {
          // compare password
          const isMatch = bcryptjs.compareSync(password, user.password);
          if (isMatch) {
            userData.errorCode = 0;
            userData.errorMessage = "Login success";
            userData.user = user;
            delete userData?.user["password"];
          } else {
            userData.errorCode = 3;
            userData.errorMessage = "Wrong password";
          }
        } else {
          userData.errorCode = 2;
          userData.errorMessage = "User not found";
        }
      } else {
        // return error
        userData.errorCode = 1;
        userData.errorMessage = "Yours email is not exist in database";
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.Users.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.Users.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
        // Viết query bằng tay
        // users = await db.sequelize.query("SELECT * FROM `users`", {
        //   type: QueryTypes.SELECT,
        //   where: { id: userId }
        // })
      }
      if (userId && userId !== "ALL") {
        users = await db.Users.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email exist
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errorCode: 1,
          message: " Email đã tồn tại ",
        });
      }
      let hashPassword = await hashUserPassword(data.password);
      console.log(hashPassword);
      await db.Users.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        positionId: data.positionId,
        phoneNumber: data.phoneNumber,
        image: data.image,
      });
      resolve({
        errorCode: 0,
        message: "Succesfully !",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (userId) => {
  // lúc nào tương tác với database đều bất đồng bộ
  // try catch để bắt lỗi
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({ where: { id: userId } });
      if (!user) {
        // ko tìm thấy người dùng quăng lỗi return ko chạy bên dưới
        return reject({
          errorCode: 2,
          message: "Không tìm thấy người dùng",
        });
      }
      // có người dùng chạy tiếp
      await db.sequelize.query("DELETE FROM users WHERE id = :id", {
        replacements: { id: userId },
        type: db.QueryTypes.DELETE,
      });
      // thông báo thành công
      resolve({
        errorCode: 0,
        message: "Delete success",
      });
    } catch (error) {
      // có lỗi khi tương tác với database thì sẽ chạy xuống đây trả lỗi về
      reject({
        errorCode: -1,
        message: error.message || "Có lỗi xảy ra",
      });
    }
  });
};

module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
};
