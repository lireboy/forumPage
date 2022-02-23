import React, {Component} from "react";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button'
import plus from './icons/plus.svg'
import Modal from 'react-bootstrap/Modal';
import * as authenticationActions from '../actions/AuthenticationActions'
import * as postMessageActions from '../actions/PostMessageActions'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'

import './Styleguide.css'
import {bindActionCreators} from "redux";

const mapStateToProps = state => {
    return state;
}

class AddPostMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // userID:'',
            // userName: '',
            // password: '',

        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddPostMessage = this.handleAddPostMessage.bind(this);
        
    }

    //Handler
    handleShow() {
        const {showAddMessageAction} = this.props;
        showAddMessageAction();
      }
    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value});
    }
    handleClose() {
        const {hideAddMessageAction} = this.props;
        hideAddMessageAction();
    }
    handleAddPostMessage(){
        console.log("Pushed AddPostMessage button")
        const {messageTitle, messageText} = this.state;
        const token = this.props.accessToken
        const _id = this.props._id
        console.log(_id + messageTitle + messageText)
        console.log(token)
        const {addPostMessageAction} = this.props;
        addPostMessageAction(_id, messageTitle, messageText, token);
    }


    render(){
        
        var showDialog = this.props.showAddPostMessageDialog;
        if (showDialog === undefined) {
            showDialog = false;
            console.log("reload");
        }
        console.log("Add Post Dialog opened")

        return(
    
        <div>
            <img id="OpenCreatePostDialogButton" src={plus} alt="add message" onClick={this.handleShow}></img>  
            <Modal className="login-modal" show={showDialog} onHide={this.handleClose}>
                    
                    {/* <Toast className='toast bg-danger position-relative top-0 mx-auto' show={loginFailed}>
                        <Toast.Header closeButton={false}>
                        <strong className="me-auto mx-auto">Login fehlgeschlagen</strong>
                        </Toast.Header>
                    </Toast> */}
                    <Modal.Header closeButton>
                        <Modal.Title>Neue Message anlegen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Message Titel:</Form.Label>
                            <Form.Control id="MessageTitleInput" className="text" type="text" placeholder="Titel..." name="messageTitle" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Text:</Form.Label>
                            <Form.Control id="MessageTextInput" type="text" placeholder="Nachricht..." name="messageText" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button id="CreateMessageButton" variant="success" onClick={this.handleAddPostMessage}>
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
    showAddMessageAction: authenticationActions.getShowAddPostMessageDialogAction,
    hideAddMessageAction: authenticationActions.getHideAddPostMessageDialogAction,
    addPostMessageAction: postMessageActions.addNewPostMessage
  }, dispatch)
  
  const ConnectedAddPostMessage = connect(mapStateToProps, mapDispatchToProps)(AddPostMessage);
  export default ConnectedAddPostMessage