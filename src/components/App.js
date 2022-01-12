import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import ManageUserPage from "./User/ManageUserPage";
import UserLoginPage from "./User/UserLoginPage";

import "react-toastify/dist/ReactToastify.css";
import UserDashboardPage from "./User/UserDashboardPage";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' exact element={<Layout />}>
          <Route index element={<UserLoginPage />} />
          <Route path='users/user-login' element={<UserLoginPage />} />
          <Route path='users/manage-user:id' element={<ManageUserPage />} />
          <Route path='users/manage-user' element={<ManageUserPage />} />
          <Route path='users/user-dashboard' element={<UserDashboardPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
