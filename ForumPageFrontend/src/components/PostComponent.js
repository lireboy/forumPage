import React, {Component} from 'react';
import '../components/UserManagement.css';
import plus from './icons/plus.svg'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import * as routingActions from '../actions/RoutingActions'
import * as postActions from '../actions/PostActions'
import * as userActions from '../actions/UserActions'
import { ListGroup, Card } from 'react-bootstrap';
import AddUserDialog from './AddUser';
import EditPostDialog from './EditPostDialog';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";


const mapStateToProps = state => {
    return state;
  }

class PostComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          pageToShow: null,
          
          _id: this.props.post._id
        };
        console.log(this.props.post)
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleShowPostMessagePage = this.handleShowPostMessagePage.bind(this);
    };
    handleDeletePost(){
        console.log("Delete Post button pressed")
        const {deletePostAction} = this.props;
        const {_id} = this.state
        console.log("This is the id after button pressed: " + _id)
        const token = this.props.accessToken;
        deletePostAction(_id, token);
    }
    handleShowPostMessagePage(){
      console.log("Clicked on a post")
      const {_id} = this.state
      const token = this.props.accessToken;
      console.log(_id + token)
      const {handleShowPostMessagePage} = this.props;
      handleShowPostMessagePage(_id, token);
    }

    render(){
        const post = this.props.post
        return(
            <div>
                <Button  variant="primary" id={"OpenPstMessages" + post._id} onClick={this.handleShowPostMessagePage}>Open</Button>
                <EditPostDialog post={post}/>
                <Button  variant="danger" id={"DeleteButtonPost" + post._id} onClick={this.handleDeletePost}>Delete</Button>
            </div>

        )}






}
//Verknüpft Aktion mit der Dispatch-Methode
const mapDispatchToProps = dispatch => bindActionCreators({
  handleShowPostMessagePage: routingActions.loadPostMessages,
    deletePostAction: postActions.deleteCurrentPost
  }, dispatch)
const ConnectedPostComponent = connect(mapStateToProps, mapDispatchToProps)(PostComponent);
export default ConnectedPostComponent;
