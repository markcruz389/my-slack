/* 
  Summary: 
    Initialize local storage keys needed 
  Params:
    account - account object that will be added/created
*/
export function initLocalStorage() {
  localStorage.setItem("auth", JSON.stringify({}));
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
