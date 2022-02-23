import React, {Component} from "react";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button'
import plus from './icons/plus.svg'
import Modal from 'react-bootstrap/Modal';
import * as authenticationActions from '../actions/AuthenticationActions'
import * as userActions from '../actions/UserActions'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'

import './Styleguide.css'
import {bindActionCreators} from "redux";

const mapStateToProps = state => {
    return state;
}

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID:'',
            userName: '',
            password: '',

        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        // console.log(this.props.user);
    }

    //Handler
    handleShow() {
        const {showAddUserAction} = this.props;
        showAddUserAction();
      }
    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value});
    }
    handleClose() {
        const {hideAddUserAction} = this.props;
        hideAddUserAction();
    }
    handleAddUser(){
        console.log("Pushed login button")
        const {userID, userName, password} = this.state;
        const token = this.props.accessToken
        console.log(userID + userName + password)
        console.log(token)
        const {addUserAction} = this.props;
        addUserAction(userID, userName, password, token);
    }


    render(){
        var showDialog = this.props.showAddUserDialog;
        if (showDialog === undefined) {
          showDialog = false;
        }
        console.log("Add User Dialog opened")

        return(
    
        <div>
            <img id="OpenCreateUserDialogButton" src={plus} alt="add user" onClick={this.handleShow}></img>  
            <Modal className="login-modal" show={showDialog} onHide={this.handleClose}>                    
                    {/* <Toast className='toast bg-danger position-relative top-0 mx-auto' show={loginFailed}>
                        <Toast.Header closeButton={false}>
                        <strong className="me-auto mx-auto">Login fehlgeschlagen</strong>
                        </Toast.Header>
                    </Toast> */}
                    <Modal.Header closeButton>
                        <Modal.Title>Neuen User anlegen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>UserID:</Form.Label>
                            <Form.Control id="UserIDInput" className="text" type="text" placeholder="Maxmustermann" name="userID" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control id="UserNameInput" className="text" type="text" placeholder="Max Mustermann" name="userName" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control id="PasswordInput" type="password" placeholder="Password123" name="password" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button id="CreateUserButton" variant="success" onClick={this.handleAddUser}>
                            Erstellen
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
    showAddUserAction: authenticationActions.getShowAddUserDialogAction,
    hideAddUserAction: authenticationActions.getHideAddUserDialogAction,
    addUserAction: userActions.addNewUser
  }, dispatch)
  
  const ConnectedAddUser = connect(mapStateToProps, mapDispatchToProps)(AddUser);
  export default ConnectedAddUser