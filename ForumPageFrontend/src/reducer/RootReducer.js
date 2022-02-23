import * as authenticationActions from '../actions/AuthenticationActions'
import * as routingActions from '../actions/RoutingActions'
import * as userActions from '../actions/UserActions'
import * as postActions from '../actions/PostActions'
import * as postMessageActions from '../actions/PostMessageActions'

const initialState = {
  loggedInUser: null,
  user: null,
  loginPending: false,
  showLoginDialog: false,
  isLoggedInDialog: false,
  loginFailedDialog: false,
  error: null,
  pageToShow:null,
  posts: null,
};
function rootReducer(state = initialState, action) {
    console.log("Bin im Reducer: " + action.type)

    switch(action.type){
      case authenticationActions.SHOW_LOGIN_DIALOG:
        return{
          ...state,
          showLoginDialog: true,
          loginFailedDialog: false,
          error: null
        }
        case authenticationActions.HIDE_LOGIN_DIALOG:
        return{
          ...state,
          showLoginDialog: false,
          error: null
        }
        case authenticationActions.SHOW_ADDUSER_DIALOG:
        return{
          ...state,
          showAddUserDialog: true,
          error: null
        }
        case authenticationActions.HIDE_ADDUSER_DIALOG:
          return{
            ...state,
            showAddUserDialog: false,
            error: null
        }
        case authenticationActions.SHOW_ADDPOST_DIALOG:
          return{
            ...state,
            showAddPostDialog: true,
            error: null
        }
        case authenticationActions.HIDE_ADDPOST_DIALOG:
            return{
              ...state,
              showAddPostDialog: false,
              error: null
        }
        case authenticationActions.SHOW_ADDPOSTMESSAGE_DIALOG:
          return{
            ...state,
            showAddPostMessageDialog: true,
            error: null
        }
        case authenticationActions.HIDE_ADDPOSTMESSAGE_DIALOG:
            return{
              ...state,
              showAddPostMessageDialog: false,
              error: null
        }
        case userActions.SHOW_EDITUSER_DIALOG:
          return{
            ...state,
            showEditUserDialog: true,
            error: null
        }
        case userActions.HIDE_EDITUSER_DIALOG:
          return{
            ...state,
            showEditUserDialog: false,
            error: null
        }
        case authenticationActions.AUTHENTICATION_PENDING:
          return{
            ...state,
            loginPending: true,
            error: null
          }
        case authenticationActions.AUTHENTICATION_SUCCESS:
          return{
            ...state,
            loginPending: false,
            showLoginDialog: false,
            isLoggedInDialog: true,
            loginFailedDialog: false,
            loggedInUser: action.loggedInUser,
            accessToken: action.accessToken,
            error: null
          }
        case authenticationActions.AUTHENTICATION_ERROR:
          return{
            ...state,
            loginPending: false,
            isLoggedInDialog: false,
            loginFailedDialog: true,
            error: 'Authentication failed!'
          }
          //Add Post----------------------------------------------------------
          case postActions.ADDPOST_PENDING:
            return{
              ...state,
              addPostPending: true,
              error: null
            }
          case postActions.ADDPOST_SUCCESS:
            return{
              ...state,
              addPostPending: false,
              showAddPostDialog: false,
              addPostFailedDialog: false,
              // user: action.user,
              error: null
            }
          case postActions.ADDPOST_ERROR:
            return{
              ...state,
              addPostPending: false,
              addPostFailedDialog: true,
              error: 'Adding Post failed!'
            }
          //Add PostMessage----------------------------------------------------------
          case postMessageActions.ADDPOSTMESSAGE_PENDING:
            return{
              ...state,
              addPostMessagePending: true,
              error: null
            }
          case postMessageActions.ADDPOSTMESSAGE_SUCCESS:
            return{
              ...state,
              addPostMessagePending: false,
              showAddPostMessageDialog: false,
              addPostMessageFailedDialog: false,
              // user: action.user,
              error: null
            }
          case postMessageActions.ADDPOSTMESSAGE_ERROR:
            return{
              ...state,
              addPostMessagePending: false,
              addPostMessageFailedDialog: true,
              error: 'Adding PostMessage failed!'
            }
          //Add User-------------------------------------------------------------------------
          case userActions.ADDUSER_PENDING:
            return{
              ...state,
              addUserPending: true,
              error: null
            }
          case userActions.ADDUSER_SUCCESS:
            return{
              ...state,
              addUserPending: false,
              showAddUserDialog: false,
              addUserFailedDialog: false,
              posts: action.post,
              error: null
            }
          case userActions.ADDUSER_ERROR:
            return{
              ...state,
              addUserPending: false,
              addUserFailedDialog: true,
              error: 'Adding User failed!'
            }
          // edit user ------------------------------------------------------------------
          case userActions.EDITUSER_PENDING:
            return{
              ...state,
              editUserPending: true,
              error: null
            }
          case userActions.EDITUSER_SUCCESS:
            return{
              ...state,
              editUserPending: false,
              // user: action.user,
              error: null
            }
          case userActions.EDITUSER_ERROR:
            return{
              ...state,
              editUserPending: false,
              error: 'Adding User failed!'
            }
            // delete user ----------------------------------------------------------------
          case userActions.DELETEUSER_PENDING:
            return{
              ...state,
              deleteUserPending: true,
              error: null
            }
          case userActions.DELETEUSER_SUCCESS:
            return{
              ...state,
              deleteUserPending: false,
              // user: action.user,
              error: null
            }
          case userActions.DELETEUSER_ERROR:
            return{
              ...state,
              deleteUserPending: false,
              error: 'Deleting User failed!'
            }


          // edit post ------------------------------------------------------------------
          case postActions.EDITPOST_PENDING:
            return{
              ...state,
              editPostPending: true,
              error: null
            }
          case postActions.EDITPOST_SUCCESS:
            return{
              ...state,
              editPostPending: false,

              error: null
            }
          case postActions.EDITPOST_ERROR:
            return{
              ...state,
              editPostPending: false,
              error: 'Editing post failed!'
            }  
          // edit postMessage ------------------------------------------------------------------
          case postMessageActions.EDITPOSTMESSAGE_PENDING:
            return{
              ...state,
              editPostMessagePending: true,
              error: null
            }
          case postMessageActions.EDITPOSTMESSAGE_SUCCESS:
            return{
              ...state,
              editPostMessagePending: false,

              error: null
            }
          case postMessageActions.EDITPOSTMESSAGE_ERROR:
            return{
              ...state,
              editPostMessagePending: false,
              error: 'Editing postMessage failed!'
            }    
        case authenticationActions.SHOW_PUBLIC_PAGE:
          return{
            ...state,
            pageToShow: null,
            loggedInUser: null,
            isLoggedInDialog: false,
            accessToken: null,
            error: null
          }  
        case routingActions.SHOW_FORUM_PAGE:
          return{
          ...state,
            pageToShow: "forum",
            error: null,
            posts: action.posts
          }
        case routingActions.SHOW_PRIVATE_PAGE:
          return{
            ...state,
            pageToShow: null,
            error: null
          }
        case routingActions.SHOW_POST_PAGE:
          return{
            ...state,
            pageToShow: "post",
            messages: action.messages,
            error: null,
            _id: action._id
          }
        case routingActions.SHOW_USERMANAGEMENT_PAGE:
          return{
            ...state,
            pageToShow: "UserManagement",
            error: null,
            users: action.users
          }
      default:
        return state;
    }
};
export default rootReducer;