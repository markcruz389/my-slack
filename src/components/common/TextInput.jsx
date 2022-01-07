import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ id, label, name, value, onChange, error }) => {
  return (
    <div className='form-floating'>
      <input
        className={`form-control ${error && "is-invalid"}`}
        id={id}
        type='text'
        name={name}
        value={value}
        placeholder='x'
        onChange={onChange}
      />
      <label className='form-label' htmlFor={id}>
        {label}
      </label>
      {error && <div className='text-danger'>{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
