import React, {Component} from "react";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import * as authenticationActions from '../actions/AuthenticationActions'
import * as userActions from '../actions/UserActions'
import * as postMessageActions from '../actions/PostMessageActions'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'

import './Styleguide.css'
import {bindActionCreators} from "redux";

const mapStateToProps = state => {
    return state;
}

class EditPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID:'',
            userName: '',
            password: '',
            showEditPostMessageDialog: false,
            _id: this.props.message._id

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEditPostMessage = this.handleEditPostMessage.bind(this);
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
    handleEditPostMessage(){
        console.log("Pushed editieren button")
        this.setState({
            showEditPostMessageDialog: false
        })
        const {_id, messageText} = this.state;
        const token = this.props.accessToken
        console.log("Editierte Eingaben von: " + _id + " Text: "  + messageText)
        console.log(token)
        const {editPostMessageAction} = this.props;
        editPostMessageAction(_id, messageText, token);
    }
    handleShowEdit = () => {
        this.setState({
            showEditPostMessageDialog: true
        })
    }
    handleCloseEdit = () => {
        this.setState({
            showEditPostMessageDialog: false
        })
    }





    render(){
        const message = this.props.message;
        // var showEditDialog = this.props.showEditUserDialog;
        // if (showEditDialog === undefined) {
        //   showEditDialog = false;
        // }
        const showEditPostMessageDialog = this.state.showEditPostMessageDialog;

        return(
    
        <div>
            <Button  variant="success" id={"EditButtonPostMessage" + message._id} onClick={this.handleShowEdit}>Edit</Button>
            <Modal className="login-modal" show={showEditPostMessageDialog} onHide={this.handleCloseEdit}>
                    
                    {/* <Toast className='toast bg-danger position-relative top-0 mx-auto' show={loginFailed}>
                        <Toast.Header closeButton={false}>
                        <strong className="me-auto mx-auto">Login fehlgeschlagen</strong>
                        </Toast.Header>
                    </Toast> */}
                    <Modal.Header closeButton>
                        <Modal.Title>Nachricht editieren</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label> Message Text:</Form.Label>
                            <Form.Control id="forumMessageInput" className="text" type="text" placeholder={message.messageText} name="messageText" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button id="SaveUserButton" variant="success" onClick={this.handleEditPostMessage}>Editieren</Button>
                        </Form>
                    </Modal.Body>
                    </Modal>
        
        </div>
        )
    }
}
//Verknüpft Aktion mit der Dispatch-Methode
const mapDispatchToProps = dispatch => bindActionCreators({
    // showEditPostAction: userActions.getShowEditPostDialogAction,
    // hideEditPostAction: userActions.getHideEditPostDialogAction,
    editPostMessageAction: postMessageActions.editCurrentPostMessage
  }, dispatch)
  
  const ConnectedEditPostMessage = connect(mapStateToProps, mapDispatchToProps)(EditPost);
  export default ConnectedEditPostMessage