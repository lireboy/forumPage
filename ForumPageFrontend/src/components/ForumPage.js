import React, {Component} from 'react';
import '../components/ForumPage.css';
import * as postActions from '../actions/PostActions'
import * as routingActions from '../actions/RoutingActions'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import AddPostDialog from './AddPost';
import PostComponent from './PostComponent';


const mapStateToProps = state => {
  return state;
}

class ForumPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.posts._id
    };
    this.handleBackToPrivatePage = this.handleBackToPrivatePage.bind(this);
    this.handleShowPostMessagePage = this.handleShowPostMessagePage.bind(this);
    this.handleForum = this.handleForum.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }
 

  componentDidUpdate(){
    console.log("did update")
    if(this.props.addPostPending || this.props.editPostPending || this.props.deletePostPending){
    this.handleForum();
    }
  }
  handleForum(){
    console.log("Pushed Forum button")
    const {showForumPageAction} = this.props;
    showForumPageAction();
  }

  handleBackToPrivatePage(){
    console.log("Pushed back button")
    const {showPrivatePageAction} = this.props;
    showPrivatePageAction();
  }
  
  handleDeletePost(){
    console.log("Delete Post button pressed")
    const {deletePostAction} = this.props;
    const _id = this.state
    const token = this.props.accessToken;
    deletePostAction(_id, token);
}
handleShowPostMessagePage(){
    console.log("Clicked on a post")
    const _id = this.state
    const token = this.props.accessToken;
    console.log(_id + token)
    const {handleShowPostMessagePage} = this.props;
    handleShowPostMessagePage(_id, token);
  }
  render() {

    const posts = this.props.posts
    console.log("These are the posts: ")
    console.log(posts);
    return (
      <div>
        <div className="container-forumpage">
        <div className="forum">
            <h1>Forum</h1>
        </div>
        <div className="forum-button-container">
            <button className=" btn-back" onClick={this.handleBackToPrivatePage} >zurück</button>
            <AddPostDialog/>
          </div>
        <table>
            <thead className="table-header">
                <tr className="table-header-tr">
                    <th className="author">Author</th>
                    <th className="title">Titel</th>
                    <th className="description">Description</th>
                    <th className="date">Erstellt am</th>
                </tr>
            </thead>
            <tbody className="table-body">
              {posts.map(post =>(
                <tr className="body-row">
                    <td>{post.ownerID}</td>
                    <td>{post.forumName}</td>
                    <th>{post.forumDescription}</th>
                    <td>{formatDate(post.createdAt)}</td>
                    <PostComponent id={"UserItem" + post._id} key={post._id} post={post}/>
                </tr>
              ))}
            </tbody>
        </table>
        </div>
      </div>
    )
  }
}
const formatDate = date => {
  const d = new Date(date);
  return d.toLocaleDateString("de-DE")
}
//Verknüpft Aktion mit der Dispatch-Methode
const mapDispatchToProps = dispatch => bindActionCreators({
  showPrivatePageAction: routingActions.getShowPrivatePageAction,
  handleShowPostMessagePage: routingActions.loadPostMessages,
  showForumPageAction: routingActions.loadForumPosts,
  deletePostAction: postActions.deleteCurrentPost
}, dispatch)

const ConnectedForumPage = connect(mapStateToProps, mapDispatchToProps)(ForumPage);
export default ConnectedForumPage
