import React, { useContext } from "react";
import { UsersContext } from "../context";

const ChannelMembersList = ({ members }) => {
  const usersData = useContext(UsersContext);

  return (
    <ul class='list-group'>
      {members?.map((member) => (
        <li key={member.user_id} class='list-group-item'>
          {usersData.data?.map((user) =>
            user.id === member.user_id ? `${user.email}` : ""
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChannelMembersList;
