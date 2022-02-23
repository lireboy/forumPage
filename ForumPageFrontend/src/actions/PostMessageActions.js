export const ADDPOSTMESSAGE_PENDING = 'ADDPOSTMESSAGE_PENDING';
export const ADDPOSTMESSAGE_SUCCESS = 'ADDPOSTMESSAGE_SUCCESS';
export const ADDPOSTMESSAGE_ERROR = 'ADDPOSTMESSAGE_ERROR';

export const DELETEPOSTMESSAGE_PENDING = 'DELETEPOSTMESSAGE_PENDING';
export const DELETEPOSTMESSAGE_SUCCESS = 'DELETEPOSTMESSAGE_SUCCESS';
export const DELETEPOSTMESSAGE_ERROR = 'DELETEPOSTMESSAGE_ERROR';

export const EDITPOSTMESSAGE_PENDING = 'EDITPOSTMESSAGE_PENDING';
export const EDITPOSTMESSAGE_SUCCESS = 'EDITPOSTMESSAGE_SUCCESS';
export const EDITPOSTMESSAGE_ERROR = 'EDITPOSTMESSAGE_ERROR';

export function getAddPostMessagePendingAction(){
    return {
        type: ADDPOSTMESSAGE_PENDING
    }
}
export function getAddPostMessageSuccessAction(newPostMessage){
    return {
        type: ADDPOSTMESSAGE_SUCCESS,
        newMessage: newPostMessage.postMessage 
    }
}
export function getAddPostMessageErrorAction(error){
    return {
        type: ADDPOSTMESSAGE_ERROR,
        error: error
    }
}
//Delete PostMessage --------------------------------------------------

export function getDeletePostMessagePendingAction(){
    return {
        type: DELETEPOSTMESSAGE_PENDING
    }
}
export function getDeletePostMessageSuccessAction(deletedPostMessage){
    return {
        type: DELETEPOSTMESSAGE_SUCCESS,
        deletedPostMessage: deletedPostMessage.postMessage 
    }
}
export function getDeletePostMessageErrorAction(error){
    return {
        type: DELETEPOSTMESSAGE_ERROR,
        error: error
    }
}

//Edit PostMessage --------------------------------------------------
export function getEditPostMessagePendingAction(){
    return {
        type: EDITPOSTMESSAGE_PENDING
    }
}
export function getEditPostMessageSuccessAction(editedPostMessage){
    return {
        type: EDITPOSTMESSAGE_SUCCESS,
        editedPostMessage: editedPostMessage.postMessage
    }
}
export function getEditPostMessageErrorAction(error){
    return {
        type: EDITPOSTMESSAGE_ERROR,
        error: error
    }
}

//Add PostMessage----------------------------------------------------------
export function addNewPostMessage(_id, messageTitle, messageText, token) {
    console.log("Add PostMessage");
    return dispatch => {
        dispatch(getAddPostMessagePendingAction());
        addPostMessage(_id, messageTitle, messageText, token)
            .then(
                newPostMessage => {
                    const action = getAddPostMessageSuccessAction(newPostMessage);
                    dispatch(action);
                },
                error => {
                    dispatch.getAddPostMessageErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getAddPostMessageErrorAction(error));
            })
    }
}
function addPostMessage(_id,messageTitle, messageText, token) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "Content-Type": "application/json",
            "forumID": _id,
            "messageTitle": messageTitle,
            "messageText": messageText,
        }) 
        
    };
    return fetch('https://localhost/forumMessage', requestOptions)
    .then(handleAddPostResponse).then(newPostMessage =>{
        return newPostMessage;
    });
} 

function handleAddPostResponse(response){
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
            let newPostMessage = {
                postMessage: data,
            }
            return newPostMessage;
        }
    })
}

// Delete Post ----------------------------------------------
export function deleteCurrentPostMessage(_id, token) {
    console.log("Delete PostMessage");
    return dispatch => {
        dispatch(getDeletePostMessagePendingAction());
        deletePostMessage(_id, token)
            .then(
                deletedPostMessage => {
                    const action = getDeletePostMessageSuccessAction(deletedPostMessage);
                    dispatch(action);
                },
                error => {
                    dispatch.getDeletePostMessageErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getDeletePostMessageErrorAction(error));
            })
    }
}
function deletePostMessage(_id, token) {
    console.log(_id, token);
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "_id": _id
        }) 
        
    };
    return fetch('https://localhost/forumMessage', requestOptions)
    .then(handleDeletePostMessageResponse).then(deletedPostMessage =>{
        return deletedPostMessage;
    });
}
function handleDeletePostMessageResponse(response){
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
            let deletedPostMessage = {
                postMessage: data,
            }
            return deletedPostMessage;
        }
    })
}

// Edit postMessage ----------------------------------------------
export function editCurrentPostMessage(_id, messageText, token) {
    console.log("Edit Post");
    return dispatch => {
        dispatch(getEditPostMessagePendingAction());
        editPostMessage(_id, messageText, token)
            .then(
                editedPostMessage => {
                    const action = getEditPostMessageSuccessAction(editedPostMessage);
                    dispatch(action);
                },
                error => {
                    dispatch.getEditPostMessageErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getEditPostMessageErrorAction(error));
            })
    }
}
function editPostMessage(_id, messageText, token) {
    console.log(_id, messageText, token);
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "_id": _id,
            "messageText": messageText
        }) 
        
    };
    return fetch('https://localhost/forumMessage', requestOptions)
    .then(handleEditPostMessageResponse).then(editedPostMessage =>{
        return editedPostMessage;
    });
}
function handleEditPostMessageResponse(response){
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
            let editedPostMessage = {
                postMessage: data,
            }
            return editedPostMessage;
        }
    })
}
