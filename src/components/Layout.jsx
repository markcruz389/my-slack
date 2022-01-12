import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./common/Header";
import { ChannelsContext, UserLoginContext, UsersContext } from "./context";
import { getAuth } from "../services/localStorage";
import { getUsers } from "../api/usersApi";
import { getChannels } from "../api/channelsApi";

function Layout() {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [userLoginContext, setUserLoginContext] = useState({
    email: "",
    id: null,
    uid: "",
  });
  // const [userLogin, setUserLogin] = useState({});
  // const userLogin = {
  //   data: { email: "", id: null, uid: "" },
  //   setData: () => {},
  // };

  const auth = getAuth();
  const isLoggedIn = Object.keys(auth).length > 0 ? true : false;

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getUsers();
        setUsers(response?.data);
      })();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getChannels();
        setChannels(response?.data);
      })();
    }
  }, [isLoggedIn]);

  return (
    /* A "layout route" is a good place to put markup you want to
       share across all the pages on your site, like navigation. */
    <div>
      {console.log(users)}
      <UserLoginContext.Provider
        value={[userLoginContext, setUserLoginContext]}
      >
        <ChannelsContext.Provider value={channels}>
          <UsersContext.Provider value={users}>
            <Header />
            <Outlet />
          </UsersContext.Provider>
        </ChannelsContext.Provider>
      </UserLoginContext.Provider>
    </div>
  );
}

export default Layout;
