/* 
  Summary: 
    Initialize local storage keys needed 
  Params:
    account - account object that will be added/created
*/
export function initLocalStorage() {
  if (localStorage.getItem("auth") === null) {
    localStorage.setItem("auth", JSON.stringify({}));
  }

  if (localStorage.getItem("userReceiverIds") === null) {
    localStorage.setItem("userReceiverIds", JSON.stringify([]));
  }
}

/* 
  Summary: 
    Saves authentication details after user login
  Params:
    account - account object that will be added/created
*/
export function saveAuth(data) {
  localStorage.setItem("auth", JSON.stringify(data));
}

/* 
  Summary: 
    Retrieves auth data
  Params:
    account - account object that will be added/created
*/
export function getAuth() {
  return JSON.parse(localStorage.getItem("auth"));
}

/* 
  Summary: 
    Sets auth to empty object
  Params:
    account - account object that will be added/created
*/
export function deleteAuth() {
  localStorage.setItem("auth", JSON.stringify({}));
}

/* 
  Summary: 
    Sets auth to empty object
  Params:
    account - account object that will be added/created
*/
export function saveReceiverId(userId, receiverId) {
  let userReceiverIds = JSON.parse(localStorage.getItem("userReceiverIds"));
  debugger;
  const user = userReceiverIds.find((x) => x.userId === userId);

  if (!user) {
    userReceiverIds.push({ userId: userId, receiverIds: [receiverId] });
    localStorage.setItem("userReceiverIds", JSON.stringify(userReceiverIds));
  } else {
    const updatedUserReceiverIds = userReceiverIds.find(
      (user) => user.userId === userId
    );

    updatedUserReceiverIds.receiverIds.push(receiverId);

    localStorage.setItem(
      "userReceiverIds",
      JSON.stringify(updatedUserReceiverIds)
    );
  }
  debugger;
}

/* 
  Summary: 
    Sets auth to empty object
  Params:
    account - account object that will be added/created
*/
export function getReceiverIds(userId) {
  let userReceiverIds = JSON.parse(localStorage.getItem("userReceiverIds"));
  const receiverIds = userReceiverIds.receiverIds.map((x) =>
    x.userId === userId ? [...userReceiverIds.receiverIds] : x
  );
  return receiverIds;
}
