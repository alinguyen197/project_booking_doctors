import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import userService from '../../services/userService'
class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataUsers: [],
    }
  }

  async componentDidMount() {
    const resp = await userService.getAllUser('ALL')
    if (resp.data && resp.data.errorCode === 0) {
      this.setState(
        {
          dataUsers: resp.data.users,
        },
        () => {
          // kiểm tra đã setState xong chưa
          console.log(this.state.dataUsers)
        }
      )
    } else {
    }
  }

  render() {
    const handleCreateUser = () => {}
    const { dataUsers } = this.state
    return (
      <>
        <div>
          <div className="text-center">Manage users</div>
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
                  <tr>
                    <td>{index++}</td>
                    <td>{item.email}</td>
                    <td>
                      {item.firstName} {item.lastName}
                    </td>
                    <td>
                      <button type="button" class="btn btn-primary ">
                        Primary
                      </button>
                      <button type="button" class="btn btn-danger ">
                        Danger
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
