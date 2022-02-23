import React, {Component} from 'react';
import './PostMessagePage.css'
import '../components/ForumPage.css';

import * as routingActions from '../actions/RoutingActions'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import AddPostMessageDialog from './AddPostMessage';
import PostMessageComponent from './PostMessageComponent';

const mapStateToProps = state => {
  return state;
}

class PostMessagePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageToShow: null,
    };
    console.log(this.props)
    this.handleBacktoForumPage = this.handleBacktoForumPage.bind(this);
  }

  componentDidUpdate(){
    console.log("PostMessagePage did update")
    if(this.props.addPostMessagePending || this.props.editPostMessagePending || this.props.deletePostMessagePending){
    // this.handleShowPostMessagePage();
    }
  }
  // handleShowPostMessagePage(){
  //   console.log("Clicked on a post")
  //   const _id = this.state
  //   const token = this.props.accessToken;
  //   console.log(_id + token)
  //   const {handleShowPostMessagePage} = this.props;
  //   handleShowPostMessagePage(_id, token);
  // }


  handleBacktoForumPage(){
    console.log("Pushed back button")
    const {showForumPageAction} = this.props;
    showForumPageAction();
  }


  render() {
    const messages = this.props.messages
    const _id = this.props._id
    console.log("loaded Messages")
    console.log(messages);
    return (
      <div>
        <div className="container-forumpage">
        <div className="forum">
            <h1>Forum Messages</h1>
        </div>
        <div className="forum-button-container">
            <button className=" btn-back" onClick={this.handleBacktoForumPage}>zurück</button>
            <AddPostMessageDialog _id={_id}/>
          </div>
        <table>
            <thead className="table-header">
                <tr className="table-header-tr">
                    <th className="author">Author</th>
                    <th className="title">Titel</th>
                    <th className="description">Text</th>
                    {/* <th className="date">Erstellt am</th> */}
                </tr>
            </thead>
            <tbody className="table-body">
              {messages.map(message =>(
                <tr className="body-row">
                    <td>test</td>
                    <td>{message.messageTitle}</td>
                    <th>{message.messageText}</th>
                    {/* <th>test</th> */}
                    <PostMessageComponent id={"UserItem" + message._id} key={message._id} message={message}/>


                    {/* <td>{formatDate(post.createdAt)}</td> */}
                </tr>
              ))}
            </tbody>
        </table>
        </div>
      </div>
    )
  }
}

//Verknüpft Aktion mit der Dispatch-Methode
const mapDispatchToProps = dispatch => bindActionCreators({
  handleShowPostMessagePage: routingActions.loadPostMessages,
  showForumPageAction: routingActions.loadForumPosts
}, dispatch)

const ConnectedPostMessagePage = connect(mapStateToProps, mapDispatchToProps)(PostMessagePage);
export default ConnectedPostMessagePage
