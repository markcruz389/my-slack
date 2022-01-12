import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UserForm from "./UserForm";
import { saveUser } from "../../api/usersApi";

const ManageUserPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {}, []);

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid()) {
      toast.error("Some fields are not valid");
      return;
    }

    (async () => {
      const data = await saveUser(user);
      console.log(data);
    })();
  };

  const formIsValid = () => {
    const _errors = {};

    if (!user.email) {
      _errors.email = "Email is required";
    }

    if (!user.password) {
      _errors.password = "Password is required";
    }

    if (user.confirmPassword !== user.password) {
      _errors.confirmPassword = "Passwords did not match";
    }

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };

  return (
    <div className=' d-flex align-items-center w-100 vh-100'>
      <div className='container-md border py-4'>
        <div className='row text-center mb-4'>
          <div className='col'>
            <h1>Register</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <UserForm
              user={user}
              onChange={handleChange}
              onSubmit={handleSubmit}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUserPage;
