import bcryptjs from "bcryptjs";
import db from "../models";
import { where } from "sequelize";
const { QueryTypes } = require('sequelize');
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
        console.log(user)
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
      let users = ''
      if (userId === 'ALL') {
        users = await db.Users.findAll({
          attributes: {
            exclude: ['password']
          }
        })
        // Viết query bằng tay
        // users = await db.sequelize.query("SELECT * FROM `users`", {
        //   type: QueryTypes.SELECT,
        //   where: { id: userId }
        // })
      }
      if (userId && userId !== 'ALL') {
        users = await db.Users.findOne({
          where: { id: userId },
          attributes: {
            exclude: ['password']
          }
        })
      }
      resolve(users)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  handleUserLogin,
  getAllUsers
};
