const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)

// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });
const sequelize = new Sequelize("hoidanit", "root", null, {
  host: "localhost",
  dialect: "mysql",
  // not show sql query on terminal 
  // add here + file config.json
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
