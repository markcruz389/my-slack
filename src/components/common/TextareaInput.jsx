import React from "react";

const TextareaInput = ({ id, label, name, value, onChange, style }) => {
  return (
    <div className='form-floating'>
      <textarea
        className='form-control'
        placeholder='Leave a comment here'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        style={style}
      ></textarea>
      <label for='floatingTextarea'>{label}</label>
    </div>
  );
};

export default TextareaInput;
