import React, {Component} from 'react';
import '../components/UserManagement.css';
import plus from './icons/plus.svg'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import * as routingActions from '../actions/RoutingActions'
import * as userActions from '../actions/UserActions'
import { ListGroup, Card } from 'react-bootstrap';
import AddUserDialog from './AddUser';
import EditUserDialog from './EditUser';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";


const mapStateToProps = state => {
    return state;
  }

class UserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          pageToShow: null,
          userID: this.props.user.userID
        };
        this.handleDeleUser = this.handleDeleUser.bind(this);
    };

    handleDeleUser(){
        const {deleteUserAction} = this.props;
        const{userID, userName, password} = this.state;
        const token = this.props.accessToken;
        deleteUserAction(userID, userName, password, token);
    }

    render(){
        const user = this.props.user;
        console.log(user)
        let isAdmin = "";
        var showAdmin = false;
        if(user.isAdministrator){
            isAdmin = "true";
            showAdmin= true;
        }else{
            isAdmin = "false";
            showAdmin = false;
        }
        return(
            <Card className="userCard">
            <Card.Body>
            <ListGroup variant="flush">
                <Card.Header>{user.userName}</Card.Header>
                <div className="cardRow">
                <ListGroup.Item>userID:</ListGroup.Item>
                <ListGroup.Item>{user.userID}</ListGroup.Item>
                </div>
                <div className="cardRow">
                <ListGroup.Item>Authentifizierung:</ListGroup.Item>
                <ListGroup.Item>Default</ListGroup.Item>
                </div>
                <div className="cardRow">
                <ListGroup.Item>is Admin:</ListGroup.Item>
                <ListGroup.Item className="green" hidden={!showAdmin}>{isAdmin}</ListGroup.Item>
                <ListGroup.Item className="red" hidden={showAdmin} >{isAdmin}</ListGroup.Item>
                </div>
            </ListGroup>
                <Card.Footer className="cardButtons">
                {/* <Button  variant="success" id={"EditButton" + user.userID }>Edit</Button> */}
                <EditUserDialog user={user}/>
                <Button  variant="danger" id={"DeleteButton" + user.userID} onClick={this.handleDeleUser}>Delete</Button>
                </Card.Footer>
            </Card.Body>
        </Card> 
        )
    }






}
//Verknüpft Aktion mit der Dispatch-Methode
const mapDispatchToProps = dispatch => bindActionCreators({
    deleteUserAction: userActions.deleteCurrentUser
  }, dispatch)
const ConnectedUserComponent = connect(mapStateToProps, mapDispatchToProps)(UserComponent);
export default ConnectedUserComponent;
