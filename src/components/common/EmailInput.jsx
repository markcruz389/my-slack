import React from "react";
import PropTypes from "prop-types";

const EmailInput = ({ id, label, name, value, onChange, error }) => {
  return (
    <div className='form-floating'>
      <input
        className={`form-control ${error && "is-invalid"}`}
        id={id}
        type='email'
        name={name}
        value={value}
        placeholder='x'
        onChange={onChange}
      />
      <div className='valid-feedback'>{error}</div>
      {error && <div className='text-danger'>{error}</div>}
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

EmailInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EmailInput;
