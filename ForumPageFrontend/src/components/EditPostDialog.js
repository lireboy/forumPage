import React, {Component} from "react";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import * as authenticationActions from '../actions/AuthenticationActions'
import * as userActions from '../actions/UserActions'
import * as postActions from '../actions/PostActions'
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
            showEditPostDialog: false,
            _id: this.props.post._id

        };
        // this.handleCloseEdit = this.handleCloseEdit.bind(this);
        // this.handleShowEdit = this.handleShowEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        // console.log(this.props.post);
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
    handleEditPost(){
        console.log("Pushed editieren button")
        this.setState({
            showEditPostDialog: false
        })
        const {_id, forumDescription} = this.state;
        const token = this.props.accessToken
        console.log("Editierte Eingaben von: " + _id + " Text: "  + forumDescription)
        console.log(token)
        const {editPostAction} = this.props;
        editPostAction(_id, forumDescription, token);
    }
    handleShowEdit = () => {
        this.setState({
            showEditPostDialog: true
        })
    }
    handleCloseEdit = () => {
        this.setState({
            showEditPostDialog: false
        })
    }





    render(){
        const post = this.props.post;
        // var showEditDialog = this.props.showEditUserDialog;
        // if (showEditDialog === undefined) {
        //   showEditDialog = false;
        // }
        const showEditPostDialog = this.state.showEditPostDialog;

        return(
    
        <div>
            <Button  variant="success" id={"EditButtonPost" + post._id} onClick={this.handleShowEdit}>Edit</Button>
            <Modal className="login-modal" show={showEditPostDialog} onHide={this.handleCloseEdit}>
                    
                    {/* <Toast className='toast bg-danger position-relative top-0 mx-auto' show={loginFailed}>
                        <Toast.Header closeButton={false}>
                        <strong className="me-auto mx-auto">Login fehlgeschlagen</strong>
                        </Toast.Header>
                    </Toast> */}
                    <Modal.Header closeButton>
                        <Modal.Title>Post Editieren</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Titel:</Form.Label>
                            <Form.Control disabled id="PostTitleInput" className="text" type="text" placeholder={post.forumName} name="forumName"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Forum Description:</Form.Label>
                            <Form.Control id="forumDescriptionInput" className="text" type="text" placeholder={post.forumDescription} name="forumDescription" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button id="SaveUserButton" variant="success" onClick={this.handleEditPost}>Editieren</Button>
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
    editPostAction: postActions.editCurrentPost
  }, dispatch)
  
  const ConnectedEditPost = connect(mapStateToProps, mapDispatchToProps)(EditPost);
  export default ConnectedEditPost