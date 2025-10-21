import { create } from 'lodash';
import axios from '../axios';

let userService = {
  login(email, password) {
    return axios.post('/api/user/login', {
      email,
      password,
    });
  },

  getAllUser(userId) {
    return axios.get(`/api/user/get-all-users?id=${userId}`);
  },

  createNewUser(data) {
    return axios.post('/api/user/create-new-user', data);
  },

  deleteUser(userId) {
    return axios.delete(`/api/user/delete-user`, {
      data: {
        userId,
      },
    });
  },
};

export default userService;
