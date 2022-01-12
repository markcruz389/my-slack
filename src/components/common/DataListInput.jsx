import React from "react";

const DataListInput = ({
  id,
  label,
  name,
  value,
  dataList,
  onChange,
  error,
}) => {
  return (
    <>
      <div className='form-floating'>
        <input
          className='form-control'
          list='users'
          id={id}
          name={name}
          placeholder='Type to search...'
          value={value}
          onChange={onChange}
        />
        <div className='valid-feedback'>{error}</div>
        {error && <div className='text-danger'>{error}</div>}
        <label htmlFor={id}>{label}</label>
      </div>
      <datalist id='users'>
        {dataList.map((data) => (
          <option value={`${data.id} - ${data.uid}`}></option>
        ))}
      </datalist>
    </>
  );
};

export default DataListInput;
