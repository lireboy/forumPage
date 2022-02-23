import React, {Component} from 'react';
import '../components/UserManagement.css';
import plus from './icons/plus.svg'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import * as routingActions from '../actions/RoutingActions'
import * as postMessageActions from '../actions/PostMessageActions'
import * as userActions from '../actions/UserActions'
import { ListGroup, Card } from 'react-bootstrap';
import AddUserDialog from './AddUser';
import EditPostMessageDialog from './EditpostMessageDialog';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";


const mapStateToProps = state => {
    return state;
  }

class PostMessageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          pageToShow: null,
          
          _id: this.props.message._id
        };
        console.log(this.props.post)
        this.handleDeletePostMessage = this.handleDeletePostMessage.bind(this);
    };
    handleDeletePostMessage(){
        console.log("Delete PostMessage button pressed")
        const {deletePostMessageAction} = this.props;
        const {_id} = this.state
        console.log("This is the id after delete button pressed: " + _id)
        const token = this.props.accessToken;
        deletePostMessageAction(_id, token);
    }

    render(){
        const message = this.props.message
        return(
            <div>
                <EditPostMessageDialog message={message}/>
                <Button  variant="danger" id={"DeleteButtonPostMessage" + message._id} onClick={this.handleDeletePostMessage}>Delete</Button>
            </div>

        )}






}
//Verknüpft Aktion mit der Dispatch-Methode
const mapDispatchToProps = dispatch => bindActionCreators({
  handleShowPostMessagePage: routingActions.loadPostMessages,
  deletePostMessageAction: postMessageActions.deleteCurrentPostMessage
  }, dispatch)
const ConnectedPostMessageComponent = connect(mapStateToProps, mapDispatchToProps)(PostMessageComponent);
export default ConnectedPostMessageComponent;
