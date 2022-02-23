import React, {Component} from "react";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button'
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

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID:'',
            userName: '',
            password: '',
            showEditDialog: false

        };
        // this.handleCloseEdit = this.handleCloseEdit.bind(this);
        // this.handleShowEdit = this.handleShowEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
        // console.log(this.props.user);
    }

    //Handler
    // handleShowEdit() {
    //     const {showEditUserAction} = this.props;
    //     showEditUserAction();
    //   }
    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value});
    }
    // handleCloseEdit() {
    //     const {hideEditUserAction} = this.props;
    //     hideEditUserAction();
    // }
    handleEditUser(){
        console.log("Pushed erstellen button")
        this.setState({
            showEditDialog: false
        })
        const {userName, password} = this.state;
        const userID = this.props.user.userID;
        const token = this.props.accessToken
        console.log("Editierte Eingaben: " + userName + password)
        console.log(token)
        const {editUserAction} = this.props;
        editUserAction(userID, userName, password, token);
    }
    handleShowEdit = () => {
        this.setState({
            showEditDialog: true
        })
    }
    handleCloseEdit = () => {
        this.setState({
            showEditDialog: false
        })
    }





    render(){
        const user = this.props.user;
        // var showEditDialog = this.props.showEditUserDialog;
        // if (showEditDialog === undefined) {
        //   showEditDialog = false;
        // }
        const showEditDialog = this.state.showEditDialog;

        return(
    
        <div>
            <Button  variant="success" id={"EditButton" + user.userID} onClick={this.handleShowEdit}>Edit</Button>
            <Modal className="login-modal" show={showEditDialog} onHide={this.handleCloseEdit}>
                    
                    {/* <Toast className='toast bg-danger position-relative top-0 mx-auto' show={loginFailed}>
                        <Toast.Header closeButton={false}>
                        <strong className="me-auto mx-auto">Login fehlgeschlagen</strong>
                        </Toast.Header>
                    </Toast> */}
                    <Modal.Header closeButton>
                        <Modal.Title>User Editieren</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>UserID:</Form.Label>
                            <Form.Control disabled id="UserIDInput" className="text" type="text" placeholder={user.userID} name="userID"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control id="UserNameInput" className="text" type="text" placeholder={user.userName} name="userName" onChange={this.handleChange} autoComplete="none"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control id="PasswordInput" type="password" placeholder="*******" name="password" onChange={this.handleChange} autoComplete="none"/>
                        </Form.Group>
                        <Button id="SaveUserButton" variant="success" onClick={this.handleEditUser}>Editieren</Button>
                        </Form>
                    </Modal.Body>
                    </Modal>
        
        </div>
        )
    }
}
//Verknüpft Aktion mit der Dispatch-Methode
const mapDispatchToProps = dispatch => bindActionCreators({
    showEditUserAction: userActions.getShowEditUserDialogAction,
    hideEditUserAction: userActions.getHideEditUserDialogAction,
    editUserAction: userActions.editCurrentUser
  }, dispatch)
  
  const ConnectedAddUser = connect(mapStateToProps, mapDispatchToProps)(EditUser);
  export default ConnectedAddUser