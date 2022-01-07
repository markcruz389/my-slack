import React from "react";
import PropTypes from "prop-types";
import EmailInput from "../common/EmailInput";
import PasswordInput from "../common/PasswordInput";

const LoginForm = ({ user, onChange, onSubmit, errors }) => {
  return (
    <>
      <form onSubmit={onSubmit} autoComplete='off'>
        <div className='row mb-2'>
          <div className='col'>
            <EmailInput
              id='email'
              label='Email'
              name='email'
              value={user.email || ""}
              placeholder='Enter Email Address'
              onChange={onChange}
              error={errors.email}
            />
          </div>
        </div>

        <div className='row mb-2'>
          <div className='col'>
            <PasswordInput
              id='password'
              label='Password'
              name='password'
              value={user.password || ""}
              placeholder='Enter Password'
              onChange={onChange}
              error={errors.password}
            />
          </div>
        </div>

        <div className='row text-center mt-3'>
          <div className='col'>
            <input
              type='submit'
              value='Login'
              className='btn btn-primary w-100'
            />
          </div>
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default LoginForm;
