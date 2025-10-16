import userService from '../services/userService';
const handleLogin = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(500).json({
        errorCode: 1,
        message: 'Missing email or password',
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
    let id = req.query.id;

    if (!id) {
      res.status(403).json({
        errorCode: 1,
        message: 'Missing required parameters',
        users: [],
      });
    }

    let users = await userService.getAllUsers(id);

    return res.status(200).json({
      errorCode: 0,
      message: 'OK',
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
      message: error?.message || 'Delete failed',
    });
  }
};

const handleUpdateUser = async (req, res) => {
  const respExample = {
    success: null,
    message: '',
    errorCode: '',
    data: null,
    details: {
      field: '',
      reason: '',
    },
    meta: {
      total: null,
      page: null,
      limit: null,
      requestId: null,
      timestamp: new Date().toISOString(),
    },
  };
  try {
    const data = req.body;

    // Validation: kiểm tra các trường bắt buộc
    if (!data.id || !data.firstName || !data.lastName) {
      return res.status(400).json({
        ...respExample,
        success: false,
        errorCode: 'ERR001',
        details: {
          field: !data.id ? 'id' : !data.firstName ? 'firstName' : 'lastName',
          reason: 'This field is required',
        },
      });
    }

    let resp = await userService.updateUser(data);

    // Xử lý status code dựa vào errorCode trả về từ service khi tương tác database
    if (resp.errorCode === 0) {
      // Thành công
      return res.status(200).json({
        ...respExample,
        success: true,
        errorCode: 'SUC001',
        message: resp.message,
      });
    }

    // Không tìm thấy user
    if (resp.errorCode === 2) {
      return res.status(404).json({
        ...respExample,
        success: false,
        errorCode: 'ERR002',
        message: resp.message,
      });
    }
    // Các lỗi nghiệp vụ khác
    return res.status(400).json(resp);
  } catch (error) {
    console.log(error);
    // Lỗi hệ thống hoặc database
    return res.status(500).json({
      ...respExample,
      success: false,
      errorCode: error?.errorCode || -1,
      message: error?.message || 'Internal server error',
      details: error?.details || null,
    });
  }
};

module.exports = {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
};
