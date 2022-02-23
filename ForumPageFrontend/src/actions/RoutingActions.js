export const SHOW_FORUM_PAGE = "SHOW_FORUM_PAGE";
export const SHOW_PRIVATE_PAGE = "SHOW_PRIVATE_PAGE";
export const SHOW_POST_PAGE = "SHOW_POST_PAGE";
export const SHOW_USERMANAGEMENT_PAGE = "SHOW_USERMANAGEMENT_PAGE";

export function getShowUserManagementAction(userList){
    return{
        type:SHOW_USERMANAGEMENT_PAGE,
        users: userList.users
    }
}

export function getShowForumPageAction(postList){
  return {
    type: SHOW_FORUM_PAGE,
    posts: postList.posts
  }
}
export function getShowPrivatePageAction(){
    return {
      type: SHOW_PRIVATE_PAGE
    }
}
export function backToPrivatePageAction(){
    return {
      type: SHOW_PRIVATE_PAGE
    }
}
export function getShowPostMessagePageAction(_id, allMessages){
    return {
      type: SHOW_POST_PAGE,
      messages: allMessages.messages,
      _id: _id
    }
}

export function loadUserManagement(token){
    console.log("Loading User Management")
    return dispatch => {
        loadUsers(token)
          .then(
            userList => {
                console.log("übergeben an dispatcher")
                console.log(userList)
                const action = getShowUserManagementAction(userList);
                dispatch(action);
            }
          )
          .catch(error =>{
              console.log(error)
              dispatch(getShowPrivatePageAction())
          })
    }
}

function loadUsers(token){
    const requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token
          }
    };
    return fetch('https://localhost/user', requestOptions)
    .then(handleUserResponse).then(userList =>{
        return userList;
    }); 

}
function handleUserResponse(response){
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log("returned from User Response:")
        console.log(data);

        if(!response.ok) {
            if(response.status === 401) {
                // logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        else {
            let userList = {
                users: data,
            }
            return userList;
        }
    })
}
//-----------------Forum---------------------------------------------------
export function loadForumPosts(){
    console.log("Loading posts");
    return dispatch => {
        loadForum()
          .then(
              postList => {
                  const action = getShowForumPageAction(postList);
                  dispatch(action);
              }
          )
          .catch(error =>{
              console.log(error)
              dispatch(getShowPrivatePageAction())
          })
    }
}

function loadForum(){
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json' },
    };
    return fetch('https://localhost/forum', requestOptions)
    .then(handleForumResponse).then(postList =>{
        return postList;
    }); 
}
function handleForumResponse(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if(!response.ok) {
            if(response.status === 401) {
                // logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        else {
            let postList = {
                posts: data,
            }
            console.log("Received from server")
            console.log(postList)
            return postList;
        }
    })
}

export function addNewForumPost(){
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
    };
    return fetch('https://localhost/forum', requestOptions)
    .then(handlePostResponse).then(postList =>{
        return postList;
    }); 
}
function handlePostResponse(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);

        if(!response.ok) {
            if(response.status === 401) {
                // logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        else {
            let postList = {
                posts: data,
            }
            return postList;
        }
    })
}
//----------------User----------------------------
export function updateUser(userID,updatedUser) {
    console.log("this is the updated user " + userID + updatedUser);
    return dispatch => {
        update(userID,updatedUser)
            .then(
                userData => {
                    const action = getShowPrivatePageAction(userData);
                    dispatch(action);
                }
            )
            .catch(error =>{
                console.log(error)
                dispatch(getShowPrivatePageAction())
            })
    }
}
function update(userID,updatedUser){
    console.log("updated user: ")
    console.log(JSON.stringify(updatedUser));
    const requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({userID,updatedUser})
    };
    return fetch('https://localhost/user', requestOptions)
    .then(handleUpdateResponse).then(userData =>{
        return userData;
    }); 
}
function handleUpdateResponse(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);

        if(!response.ok) {
            if(response.status === 401) {
                // logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        else {
            let userData = {
                user: data,
            }
            return userData;
        }
    })
}

//----------------PostMessage------------------
export function loadPostMessages(_id, token){
    console.log("Loading Post Messages")
    return dispatch => {
        load(_id, token)
          .then(
            allMessages => {
                console.log("übergeben an dispatcher")
                console.log(allMessages)
                const action = getShowPostMessagePageAction(_id, allMessages);
                dispatch(action);
            }
          )
          .catch(error =>{
              console.log(error)
              dispatch(getShowForumPageAction())
          })
    }
}

function load(_id, token) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "Content-Type": "application/json",
            "forumID": _id,

        }) 
        
    };
    return fetch('https://localhost/forumMessage/getByForumID', requestOptions)
    .then(handleLoadPostMessagesResponse).then(allMessages =>{
        return allMessages;
    });
} 

function handleLoadPostMessagesResponse(response){
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if(!response.ok) {
            if(response.status === 401) {
                // logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        else {
            let allMessages = {
                messages: data,
            }
            console.log("Received from server")
            console.log(allMessages)
            return allMessages;
        }
    })
}

