import React from "react";
import TextareaInput from "../common/TextareaInput";

const style = {
  height: "100px",
};

const MessageBox = ({ message, onChange }) => {
  return (
    <div className='row'>
      <div className='col-11'>
        <TextareaInput
          id='message'
          label='Message'
          name='message'
          value={message}
          onChange={onChange}
          style={style}
        />
      </div>
      <div className='col-1'>
        <button className='btn btn-primary h-100 w-100'>Send</button>
      </div>
    </div>
  );
};

export default MessageBox;
