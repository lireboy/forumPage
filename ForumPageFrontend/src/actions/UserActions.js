export const ADDUSER_PENDING = 'ADDUSER_PENDING';
export const ADDUSER_SUCCESS = 'ADDUSER_SUCCESS';
export const ADDUSER_ERROR = 'ADDUSER_ERROR';

export const SHOW_EDITUSER_DIALOG = 'SHOW_EDITUSER_DIALOG ';
export const HIDE_EDITUSER_DIALOG = 'HIDE_EDITUSER_DIALOG';
export const EDITUSER_PENDING = 'EDITUSER_PENDING';
export const EDITUSER_SUCCESS = 'EDITUSER_SUCCESS';
export const EDITUSER_ERROR = 'EDITUSER_ERROR';

export const DELETEUSER_PENDING = 'DELETEUSER_PENDING';
export const DELETEUSER_SUCCESS = 'DELETEUSER_SUCCESS';
export const DELETEUSER_ERROR = 'DELETEUSER_ERROR';

export function getAddUserPendingAction(){
    return {
        type: ADDUSER_PENDING
    }
}
export function getAddUserSuccessAction(newUser){
    return {
        type: ADDUSER_SUCCESS,
        newUser: newUser 
    }
}
export function getAddUserErrorAction(error){
    return {
        type: ADDUSER_ERROR,
        error: error
    }
}

// Edit user Actions --------------------------------

export function getShowEditUserDialogAction(){
    return {
        type: SHOW_EDITUSER_DIALOG
    }
}
export function getHideEditUserDialogAction() {
    return {
        type: HIDE_EDITUSER_DIALOG
      }
  }

  export function getEditUserPendingAction(){
    return {
        type: EDITUSER_PENDING
    }
}
export function getEditUserSuccessAction(editedUser){
    return {
        type: EDITUSER_SUCCESS,
        editedUser: editedUser 
    }
}
export function getEditUserErrorAction(error){
    return {
        type: EDITUSER_ERROR,
        error: error
    }
}

// Delete user Actions --------------------------------

export function getDeleteUserPendingAction(){
    return {
        type: DELETEUSER_PENDING
    }
}
export function getDeleteUserSuccessAction(deletedUser){
    return {
        type: DELETEUSER_SUCCESS,
        deletedUser: deletedUser 
    }
}
export function getDeleteUserErrorAction(error){
    return {
        type: DELETEUSER_ERROR,
        error: error
    }
}


//Add User----------------------------------------------------------
export function addNewUser(userID, userName, password, token) {
    console.log("Add User");
    return dispatch => {
        dispatch(getAddUserPendingAction());
        addUser(userID, userName,password, token)
            .then(
                newUser => {
                    const action = getAddUserSuccessAction(newUser);
                    dispatch(action);
                },
                error => {
                    dispatch.getAddUserErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getAddUserErrorAction(error));
            })
    }
}
function addUser(userID, userName, password, token) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "Content-Type": "application/json",
            "userID": userID,
            "userName": userName,
            "password": password
        }) 
        
    };
    return fetch('https://localhost/user', requestOptions)
    .then(handleAddUserResponse).then(newUser =>{
        return newUser;
    });
} 

function handleAddUserResponse(response){
    return response.text().then(text => {
        const data = text; //&& JSON.parse(text);
        console.log("returned from Server Response:")
        console.log(data);

        if(!response.ok) {
            if(response.status === 401) {
                // logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        else {
            let newUser = {
                users: data,
            }
            return newUser;
        }
    })
}

// Edit user ----------------------------------------------

export function editCurrentUser(userID, userName, password, token) {
    console.log("Edit User");
    return dispatch => {
        dispatch(getEditUserPendingAction());
        editUser(userID, userName,password, token)
            .then(
                editedUser => {
                    const action = getEditUserSuccessAction(editedUser);
                    dispatch(action);
                },
                error => {
                    dispatch.getEditUserErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getEditUserErrorAction(error));
            })
    }
}
function editUser(userID, userName, password, token) {
    console.log("Test")
    console.log(userID + userName + password + token);
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "userID": userID,
            "userName": userName,
            "password": password
        }) 
        
    };
    return fetch('https://localhost/user', requestOptions)
    .then(handleEditUserResponse).then(editedUser =>{
        return editedUser;
    });
}
function handleEditUserResponse(response){
    return response.text().then(text => {
        const data = text; //&& JSON.parse(text);
        console.log("returned from Server Response:")
        console.log(data);

        if(!response.ok) {
            if(response.status === 401) {
                // logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        else {
            let editedUser = {
                user: data,
            }
            return editedUser;
        }
    })
}

// Delete user ----------------------------------------------
export function deleteCurrentUser(userID, userName, password, token) {
    console.log("Edit User");
    return dispatch => {
        dispatch(getDeleteUserPendingAction());
        deleteUser(userID, userName, password, token)
            .then(
                deletedUser => {
                    const action = getDeleteUserSuccessAction(deletedUser);
                    dispatch(action);
                },
                error => {
                    dispatch.getDeleteUserErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getDeleteUserErrorAction(error));
            })
    }
}
function deleteUser(userID, userName, password, token) {
    console.log("Test")
    console.log(userID + userName + password + token);
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "userID": userID,
            "userName": userName,
            "password": password
        }) 
        
    };
    return fetch('https://localhost/user', requestOptions)
    .then(handleDeleteUserResponse).then(deletedUser =>{
        return deletedUser;
    });
}
function handleDeleteUserResponse(response){
    return response.text().then(text => {
        const data = text; //&& JSON.parse(text);
        console.log("returned from Server Response:")
        console.log(data);

        if(!response.ok) {
            if(response.status === 401) {
                // logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        else {
            let deletedUser = {
                user: data,
            }
            return deletedUser;
        }
    })
}
