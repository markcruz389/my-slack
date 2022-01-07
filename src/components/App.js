import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import ManageUserPage from "./User/ManageUserPage";
import UserLoginPage from "./User/UserLoginPage";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' exact element={<Layout />} />
        <Route index element={<UserLoginPage />} />
        <Route path='users/manage-user:id' element={<ManageUserPage />} />
        <Route path='users/manage-user' element={<ManageUserPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
