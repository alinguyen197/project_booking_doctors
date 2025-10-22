import { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import CreateUserModal from '../../components/userManagement/CreateUserModal';
import UpdateUserModal from '../../components/userManagement/UpdateUserModal';
import userService from '../../services/userService';
import { emitter } from '../../utils';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUsers: [],
      show: false,
      updateShow: false,
      userUpdate: {},
    };
  }

  async componentDidMount() {
    await this.handleGetAllUser();
  }

  handleAddNewUser = async (data) => {
    try {
      const response = await userService.createNewUser(data);
      if (response && response.data && response.data.errorCode !== 0) {
        alert(response.data.message);
      } else {
        await this.handleGetAllUser();
        this.setState({
          show: false,
        });

        // EventBus để clear modal ở child component, vì child đang giữ state
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
      }
    } catch (error) {}
  };

  handleDelete = async (userId) => {
    try {
      const response = await userService.deleteUser(userId);
      if (response && response.data && response.data.errorCode !== 0) {
        alert(response.data.message);
      } else {
        await this.handleGetAllUser();
        this.setState({
          show: false,
        });
      }
    } catch (error) {}
  };

  handleGetAllUser = async () => {
    try {
      const resp = await userService.getAllUser('ALL');
      if (resp.data && resp.data.errorCode === 0) {
        this.setState(
          {
            dataUsers: resp.data.users,
          },
          () => {
            // kiểm tra đã setState xong chưa
            console.log(this.state.dataUsers);
          }
        );
      }
    } catch (error) {}
  };

  handleUpdateUser = async (data) => {
    try {
      const response = await userService.updateUser(data);
      if (response.success === false) {
        alert(response.data.message);
      } else {
        await this.handleGetAllUser();
        this.setState({
          updateShow: false,
        });
      }
    } catch (error) {}
  };

  toggleUserModal = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  toggleUpdateUserModal = (user) => {
    this.setState({
      updateShow: !this.state.updateShow,
    });
  };

  handleEditUser = (user) => {
    this.setState({
      userUpdate: user,
      updateShow: true,
    });
  };

  getValueFromChild = (data, type) => {
    if (type === 'update') {
      this.handleUpdateUser(data);
    } else {
      this.handleAddNewUser(data);
    }
  };

  render() {
    const { dataUsers, show, updateShow, userUpdate } = this.state;

    return (
      <>
        <div>
          <Button color="danger" onClick={() => this.toggleUserModal()}>
            Click Me
          </Button>
          <div className="text-center">Manage users</div>

          <CreateUserModal
            toggleUserModal={this.toggleUserModal}
            modal={show}
            centered
            size="md"
            emit={this.getValueFromChild}
          />

          {updateShow && (
            <UpdateUserModal
              toggleUserModal={this.toggleUpdateUserModal}
              modal={updateShow}
              centered
              size="md"
              emit={this.getValueFromChild}
              userUpdate={userUpdate}
            />
          )}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {dataUsers &&
                dataUsers.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index++}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary px-1"
                          onClick={() => this.handleEditUser(item)}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger px-1"
                          onClick={() => this.handleDelete(item.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
