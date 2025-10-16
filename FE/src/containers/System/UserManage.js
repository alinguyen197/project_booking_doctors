import { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import CreateUserModal from '../../components/userManagement/CreateUserModal';
import userService from '../../services/userService';

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUsers: [],
      show: false,
    };
  }

  async componentDidMount() {
    await this.handleGetAllUser();
  }

  handleAddNewUser = async (data) => {
    const response = await userService.createNewUser(data);
    await this.handleGetAllUser();
    this.setState({
      show: false,
    });
  };

  toggleUserModal = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  getValueFromChild = (data) => {
    console.log('check data from child', data);
    this.handleAddNewUser(data);
  };

  handleGetAllUser = async () => {
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
  };

  render() {
    const { dataUsers, show } = this.state;

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
              {dataUsers.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index++}</td>
                    <td>{item.email}</td>
                    <td>
                      {item.firstName} {item.lastName}
                    </td>
                    <td>
                      <button type="button" className="btn btn-primary px-1">
                        Primary
                      </button>
                      <button type="button" className="btn btn-danger px-1">
                        Danger
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
