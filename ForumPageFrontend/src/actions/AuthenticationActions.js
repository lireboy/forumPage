export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';
export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const SHOW_PUBLIC_PAGE = 'SHOW_PUBLIC_PAGE';
export const SHOW_ADDUSER_DIALOG = 'SHOW_ADDUSER_DIALOG';
export const HIDE_ADDUSER_DIALOG = 'HIDE_ADDUSER_DIALOG';
export const SHOW_ADDPOST_DIALOG = 'SHOW_ADDPOST_DIALOG';
export const HIDE_ADDPOST_DIALOG = 'HIDE_ADDPOST_DIALOG';
export const SHOW_ADDPOSTMESSAGE_DIALOG = 'SHOW_ADDPOSTMESSAGE_DIALOG';
export const HIDE_ADDPOSTMESSAGE_DIALOG = 'HIDE_ADDPOSTMESSAGE_DIALOG';

export function getShowloginDialogAction() {
  return {
      type: SHOW_LOGIN_DIALOG
    }
}
export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGIN_DIALOG
      }
  }
export function getShowAddUserDialogAction(){
    return {
        type: SHOW_ADDUSER_DIALOG
    }
}
export function getHideAddUserDialogAction() {
    return {
        type: HIDE_ADDUSER_DIALOG
      }
  }
export function getShowAddPostDialogAction(){
    return {
        type: SHOW_ADDPOST_DIALOG
    }
}
export function getHideAddPostDialogAction() {
    return {
        type: HIDE_ADDPOST_DIALOG
      }
  }
export function getShowAddPostMessageDialogAction(){
    return {
        type: SHOW_ADDPOSTMESSAGE_DIALOG
    }
}
export function getHideAddPostMessageDialogAction() {
    return {
        type: HIDE_ADDPOSTMESSAGE_DIALOG
      }
  }
export function getAuthenticationPendingAction(){
    return {
        type: AUTHENTICATION_PENDING
    }
}
export function getAuthenticationSuccessAction(userSession){
    return {
        type: AUTHENTICATION_SUCCESS,
        loggedInUser: userSession.user,
        accessToken: userSession.accessToken
    }
}
export function getAuthenticationErrorAction(error){
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}
export function getLogoutDialogAction(error){
    return {
        type: SHOW_PUBLIC_PAGE,
    }
}

export function authenticateUser(userID, password) {
    console.log("Authenticate");
    return dispatch => {
        dispatch(getAuthenticationPendingAction());
        login(userID,password)
            .then(
                userSession => {
                    const action = getAuthenticationSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch.getAuthenticationErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error));
            })
    }
}
function login(userID, password) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + Buffer.from(userID + ":" + password).toString("base64")
        }
    };
    return fetch('https://localhost/authenticate', requestOptions)
    .then(handleResponse).then(userSession =>{
        return userSession;
    });
} 

function handleResponse(response) {
    const authorizationHeader = response.headers.get('Authorization');

    return response.text().then(text => {
        console.log(text);
        console.log('Received result: ' + authorizationHeader);
        const data = text; //&& JSON.parse(text);
        console.log(data);
        console.log("this is the user " + data);
        var token;
        if(authorizationHeader){
            token = authorizationHeader.split(" ")[1];
        }

        if(!response.ok) {
            if(response.status === 401) {
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        else {
            let userSession = {
                user: data,
                accessToken: token
            }
            console.log(userSession)
            return userSession;
        }
    })
}





function logout() {
    console.error('Should logout user');
}
