import React, {Component} from 'react';
import '../components/UserManagement.css';
import plus from './icons/plus.svg'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import * as routingActions from '../actions/RoutingActions'
import { ListGroup, Card } from 'react-bootstrap';
import AddUserDialog from './AddUser';
import UserComponent from './UserComponent';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return state;
  }

class UserManagementPage extends Component {



    constructor(props) {
        super(props);
        this.state = {
          pageToShow: null,
        };
        this.handleBackToPrivatePage = this.handleBackToPrivatePage.bind(this);
        this.handleUserManagement = this.handleUserManagement.bind(this);
    };

    handleBackToPrivatePage(){
        console.log("Pushed back button")
        const {backToPrivatePageAction} = this.props;
        backToPrivatePageAction();
      }
      componentDidUpdate(){
          console.log("did update")
          console.log(this.state)
        if(this.props.addUserPending || this.props.editUserPending || this.props.deleteUserPending){
          this.handleUserManagement();
        }
      }
      handleUserManagement(){
        console.log("pushed UserManagement Button")
        const {showUserManagementAction} = this.props;
        showUserManagementAction(this.props.accessToken);
      }

    
    render() {

        const users = this.props.users
        return (
            <div className="main" id="UserManagementPage">
                <div className="backButton">
                    <Button  variant="secondary" onClick={this.handleBackToPrivatePage}>zur Private Page</Button>  
                    <AddUserDialog/>
                </div>
                    <h1>UserManagement</h1>
                <div className="userCards">
                    {users.map(user =>(
                        <UserComponent id={"UserItem" + user.userID} key={user.userID} user={user}/>
                    ))}
                </div>

            
            </div>
        )
      }

}

const mapDispatchToProps = dispatch => bindActionCreators({
    backToPrivatePageAction: routingActions.backToPrivatePageAction,
    showUserManagementAction: routingActions.loadUserManagement
  }, dispatch)
const ConnectedUserManagementPage = connect(mapStateToProps,mapDispatchToProps)(UserManagementPage);
export default ConnectedUserManagementPage;
