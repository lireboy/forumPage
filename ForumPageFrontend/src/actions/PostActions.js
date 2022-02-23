export const ADDPOST_PENDING = 'ADDPOST_PENDING';
export const ADDPOST_SUCCESS = 'ADDPOST_SUCCESS';
export const ADDPOST_ERROR = 'ADDPOST_ERROR';

export const DELETEPOST_PENDING = 'DELETEPOST_PENDING';
export const DELETEPOST_SUCCESS = 'DELETEPOST_SUCCESS';
export const DELETEPOST_ERROR = 'DELETEPOST_ERROR';

export const EDITPOST_PENDING = 'EDITPOST_PENDING';
export const EDITPOST_SUCCESS = 'EDITPOST_SUCCESS';
export const EDITPOST_ERROR = 'EDITPOST_ERROR';

export function getAddPostPendingAction(){
    return {
        type: ADDPOST_PENDING
    }
}
export function getAddPostSuccessAction(newPost){
    return {
        type: ADDPOST_SUCCESS,
        post: newPost 
    }
}
export function getAddPostErrorAction(error){
    return {
        type: ADDPOST_ERROR,
        error: error
    }
}
//Delete Post --------------------------------------------------
export function getDeletePostPendingAction(){
    return {
        type: DELETEPOST_PENDING
    }
}
export function getDeletePostSuccessAction(deletedPost){
    return {
        type: DELETEPOST_SUCCESS,
        deletedPost: deletedPost 
    }
}
export function getDeletePostErrorAction(error){
    return {
        type: DELETEPOST_ERROR,
        error: error
    }
}

//Edit Post --------------------------------------------------
export function getEditPostPendingAction(){
    return {
        type: EDITPOST_PENDING
    }
}
export function getEditPostSuccessAction(editedPost){
    return {
        type: EDITPOST_SUCCESS,
        editedPost: editedPost 
    }
}
export function getEditPostErrorAction(error){
    return {
        type: EDITPOST_ERROR,
        error: error
    }
}

//Add Post----------------------------------------------------------
export function addNewPost(forumName, forumDescription, token) {
    console.log("Add Post");
    return dispatch => {
        dispatch(getAddPostPendingAction());
        addPost(forumName, forumDescription, token)
            .then(
                newPost => {
                    const action = getAddPostSuccessAction(newPost);
                    dispatch(action);
                },
                error => {
                    dispatch.getAddPostErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getAddPostErrorAction(error));
            })
    }
}
function addPost(forumName, forumDescription, token) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "Content-Type": "application/json",
            "forumName": forumName,
            "forumDescription": forumDescription,
        }) 
        
    };
    return fetch('https://localhost/forum', requestOptions)
    .then(handleAddPostResponse).then(newPost =>{
        return newPost;
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
            let newPost = {
                post: data,
            }
            return newPost;
        }
    })
}

// Delete Post ----------------------------------------------
export function deleteCurrentPost(_id, token) {
    console.log("Delete Post");
    return dispatch => {
        dispatch(getDeletePostPendingAction());
        deletePost(_id, token)
            .then(
                deletedPost => {
                    const action = getDeletePostSuccessAction(deletedPost);
                    dispatch(action);
                },
                error => {
                    dispatch.getDeletePostErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getDeletePostErrorAction(error));
            })
    }
}
function deletePost(_id, token) {
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
    return fetch('https://localhost/forum', requestOptions)
    .then(handleDeletePostResponse).then(deletedPost =>{
        return deletedPost;
    });
}
function handleDeletePostResponse(response){
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
            let deletedPost = {
                post: data,
            }
            return deletedPost;
        }
    })
}

// Edit user ----------------------------------------------
export function editCurrentPost(_id, forumDescription, token) {
    console.log("Edit Post");
    return dispatch => {
        dispatch(getEditPostPendingAction());
        editUser(_id, forumDescription, token)
            .then(
                editedPost => {
                    const action = getEditPostSuccessAction(editedPost);
                    dispatch(action);
                },
                error => {
                    dispatch.getEditUserErrorAction(error);
                }
            )
            .catch(error => {
                dispatch(getEditPostErrorAction(error));
            })
    }
}
function editUser(_id, forumDescription, token) {
    console.log(_id, forumDescription, token);
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "_id": _id,
            "forumDescription": forumDescription
        }) 
        
    };
    return fetch('https://localhost/forum', requestOptions)
    .then(handleEditPostResponse).then(editedPost =>{
        return editedPost;
    });
}
function handleEditPostResponse(response){
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
            let editedPost = {
                post: data,
            }
            return editedPost;
        }
    })
}