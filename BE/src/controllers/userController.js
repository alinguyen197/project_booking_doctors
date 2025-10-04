import userService from "../services/userService";
const handleLogin = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(500).json({
        errorCode: 1,
        message: "Missing email or password",
      });
    }
    // check email
    // compare password
    // return userInfor
    // access token : JWT token
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
      errorCode: userData.errorCode,
      message: userData.errorMessage,
      user: userData.user ? userData.user : {},
    });
  } catch (error) {}
};

const handleGetAllUser = async (req, res) => {
  try {
    // param : ALL / id
    let id = req.body.id;

    if (!id) {
      res.status(403).json({
        errorCode: 1,
        message: "Missing required parameters",
        users: [],
      });
    }

    let users = await userService.getAllUsers(id);

    return res.status(200).json({
      errorCode: 0,
      message: "OK",
      users,
    });
  } catch (error) {}
};

const handleCreateNewUser = async (req, res) => {
  try {
    let data = await userService.createNewUser(req.body);
    return res.status(200).json(data);
  } catch (error) {}
};

const handleDeleteUser = async (req, res) => {
  try {
    // controller sẽ sử lý data sau khi thằng service làm việc với database
    // báo các thông tin về cho client Frontend
    let data = await userService.deleteUser(req.body.userId);
    return res.status(200).json(data);
  } catch (error) {
    // Nếu mà có lỗi khi gọi thằng service thì trả lỗi ở đây
    return res.status(401).json({
      errorCode: error?.errorCode || -1,
      message: error?.message || "Delete failed",
    });
  }
};

module.exports = {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
  handleDeleteUser,
};
