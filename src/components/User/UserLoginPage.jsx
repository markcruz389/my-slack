import React, { useContext, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import { toast } from "react-toastify";
import LoginForm from "./LoginForm";
import { loginUser } from "../../api/usersApi";
import { saveAuth } from "../../services/localStorage";
import { useNavigate } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { UserLoginContext } from "../context";

const UserLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [userLoginContext, setUserLoginContext] = useContext(UserLoginContext);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  });

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid()) {
      toast.error("Some fields are not valid");
      return;
    }

    setIsLoading(true);
    (async () => {
      const response = await loginUser(user);

      if (response.status === 200) {
        saveAuth(response.headers);
        setUserLoginContext({
          ...userLoginContext,
          email: response.data.data.email,
          id: response.data.data.id,
          uid: response.data.data.uid,
        });
        navigate("users/user-dashboard", {
          replace: true,
        });
      }

      setIsLoading(false);
    })();
    console.log(userLoginContext);
  };

  const formIsValid = () => {
    const _errors = {};

    if (!user.email) {
      _errors.email = "Email is required";
    }

    if (!user.password) {
      _errors.password = "Password is required";
    }

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };

  return (
    <div className=' d-flex justify-content-center align-items-center w-100 vh-100'>
      {isLoading ? (
        <div>
          <SpinnerDotted size={75} />
        </div>
      ) : (
        <div className='container-md border py-4 w-50'>
          <div className='row text-center mb-4'>
            <div className='col'>
              <h1>Login</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <LoginForm
                user={user}
                onChange={handleChange}
                onSubmit={handleSubmit}
                errors={errors}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLoginPage;
