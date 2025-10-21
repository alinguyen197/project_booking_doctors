import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { injectIntl } from 'react-intl';

import { emitter } from '../../utils';

class CreateUserModal extends React.Component {
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

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      this.setState({
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
      });
    });
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

  onAddUser = async () => {
    if (!this.checkValidateInput()) return;

    console.log('check data input', this.state);
    this.props.emit(this.state);
    this.props.toggleUserModal();
  };
  render() {
    const { modal, toggleUserModal, ...rest } = this.props;

    return (
      <div>
        <Modal isOpen={modal}>
          <ModalHeader toggle={toggleUserModal}>Create New User</ModalHeader>
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
            <Button color="primary" onClick={this.onAddUser}>
              Save
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

// injectIntl: HOC giúp lấy các props của react-intl vào component
// IntlProviderWrapper bọc ngoài App => tất cả component con đều có thể sử dụng
export default injectIntl(CreateUserModal);
