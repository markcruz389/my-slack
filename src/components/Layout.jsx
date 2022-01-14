import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./common/Header";
import {
  ChannelsContext,
  DirectMessagesContext,
  UserLoginContext,
  UsersContext,
} from "./context";
import { getAuth, getReceiverIds } from "../services/localStorage";
import { getUsers } from "../api/usersApi";
import { getChannels } from "../api/channelsApi";
import { retrieveMessages } from "../api/messagesApi";

function Layout() {
  const [users, setUsers] = useState([]);
  const [channelsContext, setChannelsContext] = useState({ data: [] });
  const [directMessagesContext, setDirectMessagesContext] = useState([]);
  const [userLoginContext, setUserLoginContext] = useState({
    email: "",
    id: null,
    uid: "",
  });

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
        setChannelsContext(response?.data);
      })();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const receiverIds = getReceiverIds(auth.userId);
      receiverIds.forEach((id) => {
        (async () => {
          const params = {
            receiverId: id,
            receiverClass: "User",
          };
          const response = await retrieveMessages(params);

          if (response.status === 200) {
            setDirectMessagesContext([...directMessagesContext, response.data]);
          }
        })();
      });
    }
  }, [isLoggedIn, auth.userId]);

  return (
    /* A "layout route" is a good place to put markup you want to
       share across all the pages on your site, like navigation. */
    <div>
      {console.log("users:")}
      {console.log(users)}
      {console.log("userLogin:")}
      {console.log(userLoginContext)}
      {console.log("channels:")}
      {console.log(channelsContext)}
      {console.log("dms:")}
      {console.log(directMessagesContext)}

      <UserLoginContext.Provider
        value={[userLoginContext, setUserLoginContext]}
      >
        <ChannelsContext.Provider value={[channelsContext, setChannelsContext]}>
          <DirectMessagesContext.Provider
            value={[directMessagesContext, setDirectMessagesContext]}
          >
            <UsersContext.Provider value={users}>
              <Header />
              <Outlet />
            </UsersContext.Provider>
          </DirectMessagesContext.Provider>
        </ChannelsContext.Provider>
      </UserLoginContext.Provider>
    </div>
  );
}

export default Layout;
