import React, {Component} from "react";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import * as authenticationActions from '../actions/AuthenticationActions'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'

import './Styleguide.css'
import {bindActionCreators} from "redux";

const mapStateToProps = state => {
  return state;
}

class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    console.log(this.props.user);
  }

  handleShow() {
    const {showLoginDialogAction} = this.props;
    showLoginDialogAction();
  }
  handleClose() {
    const {hideLoginDialogAction} = this.props;
    hideLoginDialogAction();
  }

  handleChange(e){
    const {name, value} = e.target
    this.setState({[name]: value});
  }

  handleLogin(){
      console.log("Pushed login button")
      const {userID, password} = this.state;
      const {authenticateUserAction} = this.props;
      authenticateUserAction(userID, password);
  }

  handleLogout(){
    console.log("Logout button pushed")
    const {logoutDialogAction} = this.props;
    logoutDialogAction();
  }

  render() {

    var showDialog = this.props.showLoginDialog;
    if (showDialog === undefined) {
      showDialog = false;
    }

    var isLoggedIn = this.props.isLoggedInDialog;
    var loginButtonName = "Login";
    if (isLoggedIn === true){
      loginButtonName = "Logout";
    } else if (isLoggedIn === false){
      loginButtonName = "Login";
    } else {
      loginButtonName = "Login";
      isLoggedIn = false;
    }

    var loginFailed = this.props.loginFailedDialog;

    return (
      <div>
        <Button variant="outline-success" hidden={isLoggedIn} id="LoginOpenDialogButton" onClick={this.handleShow}>
          {loginButtonName}
        </Button>
        <Button variant="outline-danger" hidden={!isLoggedIn} id="LogoutButton" onClick={this.handleLogout}>
          {loginButtonName}
        </Button>

        <Modal className="login-modal" show={showDialog} onHide={this.handleClose}>
          
          <Toast className='toast bg-danger position-relative top-0 mx-auto' show={loginFailed}>
            <Toast.Header closeButton={false}>
              <strong className="me-auto mx-auto">Login fehlgeschlagen</strong>
            </Toast.Header>
          </Toast>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
             <Form.Group className="mb-3">
                <Form.Label>UserID:</Form.Label>
                <Form.Control id="LoginUserIDInput" className="text" type="text" placeholder="Maxmustermann" name="userID" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control id="LoginPasswordInput" type="password" placeholder="Password123" name="password" onChange={this.handleChange}/>
              </Form.Group>
              <Button id="LoginButton" variant="success" onClick={this.handleLogin}>
                Login
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    )

  }
}
//Verknüpft Aktion mit der Dispatch-Methode
const mapDispatchToProps = dispatch => bindActionCreators({
  showLoginDialogAction: authenticationActions.getShowloginDialogAction,
  hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
  authenticateUserAction: authenticationActions.authenticateUser,
  logoutDialogAction: authenticationActions.getLogoutDialogAction
}, dispatch)

const ConnectedUserLogin = connect(mapStateToProps, mapDispatchToProps)(UserLogin);
export default ConnectedUserLogin