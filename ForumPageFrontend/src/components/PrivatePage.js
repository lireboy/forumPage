import React, {Component} from 'react';
import '../components/PrivatePage.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import profilePic from './pictures/profile_pic.jpg'
import * as routingActions from '../actions/RoutingActions'

import {bindActionCreators} from "redux";
import {connect} from "react-redux";


const mapStateToProps = state => {
  return state;
}

class PrivatePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.loggedInUser.userName,
      age: this.props.loggedInUser.age,
      place: this.props.loggedInUser.place,
      motorcycle: this.props.loggedInUser.motorcycle,
      infoText: this.props.loggedInUser.infoText,
      drivingSince: this.props.loggedInUser.drivingSince,
    };
    this.handleForum = this.handleForum.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUserManagement = this.handleUserManagement.bind(this);
    // console.log("This is infoText: " + this.props.user.infoText);
    // console.log("This is drivingSince: " + this.props.user.drivingSince);
    console.log("Private page state")
    console.log(this.state);
  }

  handleUserManagement(){
    console.log("pushed UserManagement Button")
    const {showUserManagementAction} = this.props;
    showUserManagementAction(this.props.accessToken);
  }
  handleForum(){
    console.log("Pushed Forum button")
    const {showForumPageAction} = this.props;
    showForumPageAction();
  }
  handleChange(e){
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
  handleUpdate(){
    console.log("pushed update button");
    const {updateUserAction} = this.props;
    updateUserAction(this.props.user.userID,this.state);
  }

  render() {
    return (
      <div id="PrivatePage">
        <div className="container-flexbox">
          <div className="container-flex">
            <div className="top-container">
              <div className="userManagementButton" id="OpenUserManagementButton" onClick={this.handleUserManagement}>
                <h1>User Management</h1>
              </div>
              <div className="profil">
                <h1>Profil</h1>
              </div>
              <div className="nachrichten">
                <h1>Nachrichten</h1>
              </div>
              <div className="forum" onClick={this.handleForum}>
                <h1>Forum</h1>
              </div>
              <div className="touren">
                <h1>Touren</h1>
              </div>
            </div>
          </div>

          <div className="container-profile">
            <div className="container-profile-top">
              <div className="profile-picture">
                <Image className="profile-image" src={profilePic} roundedCircle fluid/>
              </div>
              <Form>
                <Form.Group>
                  <Form.File className="upload-picture" id="exampleFormControlFile1" label=""/>
                </Form.Group>
              </Form>
            </div>
            <div className="container-profile-info">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="name">Name</label>
                      <input type="text" class="form-control" id="fullName" placeholder="Name" value={this.state.userName} name="userName" onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="alter">Alter</label>
                      <input type="text" class="form-control" id="alter" placeholder="Alter" value={this.state.age} name="age" onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="wohnort">Wohnort</label>
                      <input type="text" class="form-control" id="wohnort" placeholder="Wohnort" value={this.state.place} name="place" onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="motorrad">Motorrad</label>
                      <input type="text" class="form-control" id="motorrad" placeholder="Motorrad" value={this.state.motorcycle} name="motorcycle" onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="faehrt-seit">Fährt seit</label>
                      <input type="text" class="form-control" id="faehrt-seit" placeholder="2010" value={this.state.drivingSince} name="drivingSince" onChange={this.handleChange}></input>
                    </div>
                  </div>
                </div>
                <div className="p-3 row gutters">
                  <div className="textarea">
                    <div className="form-group">
                      <label for="info">Info</label>
                      <InputGroup>
                        <Form.Control
                          as="textarea" rows={5}
                          value={this.state.infoText} name="infoText" onChange={this.handleChange}/>
                      </InputGroup>
                    </div>
                  </div>
                </div>
                <div className=" row gutters">
                  <div className="button">
                    <Button variant="success" type="submit" onClick={this.handleUpdate}>
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

//Verknüpft Aktion mit der Dispatch-Methode
const mapDispatchToProps = dispatch => bindActionCreators({
  showUserManagementAction: routingActions.loadUserManagement,
  showForumPageAction: routingActions.loadForumPosts,
  updateUserAction: routingActions.updateUser
}, dispatch)

const ConnectedPrivatePage = connect(mapStateToProps, mapDispatchToProps)(PrivatePage);
export default ConnectedPrivatePage
