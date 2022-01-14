import React from "react";

const ChatItem = ({ sender, timeSent, messageBody }) => {
  return (
    <div className='row'>
      <div className='col'></div>
      <p>
        <span className='fw-bold fs-5 me-2'>{sender}</span>
        <span className='fw-light fs-6'>{timeSent}</span>
      </p>
      <p>{messageBody}</p>
    </div>
  );
};

export default ChatItem;
