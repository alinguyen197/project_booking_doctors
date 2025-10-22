import React from 'react';
import { injectIntl } from 'react-intl';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

class UpdateUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      gender: '',
      roleId: '',
      positionId: '',
      phoneNumber: '',
      image: '',
      password: '',
    };
  }

  handleOnChangeInput = (event, id) => {
    const copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ['email', 'firstName', 'lastName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert('This input is required: ' + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  onUpdateUser = async () => {
    if (!this.checkValidateInput()) return;
    this.props.emit(this.state, 'update');
    this.props.toggleUserModal();
  };
  componentDidMount() {
    const { userUpdate } = this.props;
    if (userUpdate && Object.keys(userUpdate).length > 0) {
      this.setState({
        ...userUpdate,
      });
    }
  }
  render() {
    const { modal, toggleUserModal, ...rest } = this.props;
    return (
      <div>
        <Modal isOpen={modal}>
          <ModalHeader toggle={toggleUserModal}>Update User</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Address</Label>
                <Input
                  name="address"
                  type="text"
                  onChange={(event) => this.handleOnChangeInput(event, 'address')}
                  value={this.state.address}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">First Name</Label>
                <Input
                  name="firstName"
                  type="text"
                  onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                  value={this.state.firstName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Last Name</Label>
                <Input
                  name="lastName"
                  type="text"
                  onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                  value={this.state.lastName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  name="email"
                  type="text"
                  onChange={(event) => this.handleOnChangeInput(event, 'email')}
                  value={this.state.email}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onUpdateUser}>
              Update
            </Button>{' '}
            <Button color="secondary" onClick={toggleUserModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default injectIntl(UpdateUserModal);
