import React, {Component} from "react";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button'
import plus from './icons/plus.svg'
import Modal from 'react-bootstrap/Modal';
import * as authenticationActions from '../actions/AuthenticationActions'
import * as postActions from '../actions/PostActions'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'

import './Styleguide.css'
import {bindActionCreators} from "redux";

const mapStateToProps = state => {
    return state;
}

class AddPost extends Component {

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
        this.handleAddPost = this.handleAddPost.bind(this);
        
    }

    //Handler
    handleShow() {
        const {showAddPostAction} = this.props;
        showAddPostAction();
      }
    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value});
    }
    handleClose() {
        const {hideAddPostAction} = this.props;
        hideAddPostAction();
    }
    handleAddPost(){
        console.log("Pushed AddPost button")
        const {forumName, forumDescription} = this.state;
        const token = this.props.accessToken
        console.log(forumName + forumDescription)
        console.log(token)
        const {addPostAction} = this.props;
        addPostAction(forumName, forumDescription, token);
    }


    render(){
        
        var showDialog = this.props.showAddPostDialog;
        if (showDialog === undefined) {
            showDialog = false;
            console.log("reload");
        }
        console.log("Add Post Dialog opened")

        return(
    
        <div>
            <img id="OpenCreatePostDialogButton" src={plus} alt="add post" onClick={this.handleShow}></img>  
            <Modal className="login-modal" show={showDialog} onHide={this.handleClose}>
                    
                    {/* <Toast className='toast bg-danger position-relative top-0 mx-auto' show={loginFailed}>
                        <Toast.Header closeButton={false}>
                        <strong className="me-auto mx-auto">Login fehlgeschlagen</strong>
                        </Toast.Header>
                    </Toast> */}
                    <Modal.Header closeButton>
                        <Modal.Title>Neuen Post anlegen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Forum Name:</Form.Label>
                            <Form.Control id="UserNameInput" className="text" type="text" placeholder="Max Mustermann" name="forumName" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Text:</Form.Label>
                            <Form.Control id="PasswordInput" type="text" placeholder="Hallo" name="forumDescription" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button id="CreateUserButton" variant="success" onClick={this.handleAddPost}>
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
    showAddPostAction: authenticationActions.getShowAddPostDialogAction,
    hideAddPostAction: authenticationActions.getHideAddPostDialogAction,
    addPostAction: postActions.addNewPost
  }, dispatch)
  
  const ConnectedAddPost = connect(mapStateToProps, mapDispatchToProps)(AddPost);
  export default ConnectedAddPost