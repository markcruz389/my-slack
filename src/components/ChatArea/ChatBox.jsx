import React from "react";
import ChatItem from "./ChatItem";

const ChatBox = ({ messages }) => {
  return (
    <div className='d-flex flex-column justify-content-end h-100'>
      {messages?.map((message) => (
        <ChatItem
          sender={message.sender.email}
          timeSent={message.created_at}
          messageBody={message.body}
        />
      ))}
    </div>
  );
};

export default ChatBox;
