import React from "react";
import TextareaInput from "../common/TextareaInput";

const style = {
  height: "100px",
};

const MessageBox = ({ message, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='row'>
        <div className='col-11'>
          <TextareaInput
            id='body'
            label='Message'
            name='body'
            value={message.body}
            onChange={onChange}
            style={style}
          />
        </div>
        <div className='col-1'>
          <button className='btn btn-primary h-100 w-100'>Send</button>
        </div>
      </div>
    </form>
  );
};

export default MessageBox;
