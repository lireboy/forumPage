import React, {Component} from 'react';
import { connect } from 'react-redux';
import './App.css';
import TopMenu from './components/TopMenu';
import PublicPage from './components/PublicPage';
import PrivatePage from './components/PrivatePage';
import ForumPage from './components/ForumPage';
import PostMessagePage from './components/PostMessagePage';
import UserManegementPage from './components/UserManagementPage'


const mapStateToProps = state => {
  return state;
}

class App extends Component {
  render() {
    const pageToShow = this.props.pageToShow;
    const user= this.props.loggedInUser;
    let workspace;
    if(user){
      switch(pageToShow){
          case "forum":
            workspace= <ForumPage/>;
            break;
          case "post":
            workspace= <PostMessagePage/>
            break;
          case "UserManagement":
            workspace= <UserManegementPage/>
            break;
          default: 
          workspace = <PrivatePage/>;
      }
    }else {
      workspace = <PublicPage/>;

    }

    return (

      <div className="App">
        <TopMenu/>
        {workspace}
        {/* <UserManegementPage/> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
