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
