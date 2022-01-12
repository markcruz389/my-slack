import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getUsers } from "../../api/usersApi";

const UserDashboardPage = () => {
  return (
    <div className='container-fluid w-100 vh-100'>
      <div className='row h-100'>
        <div className='col-2 bg-white'>
          <Sidebar />
        </div>
        <div className='col-10 bg-dark'>test</div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
