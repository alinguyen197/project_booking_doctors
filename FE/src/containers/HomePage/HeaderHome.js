import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss';
class HeaderHome extends Component {
  render() {
    return <div className="header-home-container">Hello Header</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
