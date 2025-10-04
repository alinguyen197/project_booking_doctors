import axios from "../axios";

let userService = {
  login(email, password) {
    return axios.post("/api/user/login", {
      email,
      password,
    });
  },

  getAllUser(userId) {
    return axios.post("/api/user/get-all-users", {
      id: userId,
    });
  },
};

export default userService;
