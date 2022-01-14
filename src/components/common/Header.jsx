import React, { useState, useEffect, useContext } from "react";
import { getAuth, deleteAuth } from "../../services/localStorage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  UserLoginContext,
  ChannelsContext,
  DirectMessagesContext,
} from "../context";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoginContext, setUserLoginContext] = useContext(UserLoginContext);
  const [channelsContext, setChannelsContext] = useContext(ChannelsContext);
  const [directMessageContext, setDirectMessageContext] = useContext(
    DirectMessagesContext
  );
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    if (Object.keys(auth).length > 0) setIsLoggedIn(true);
  }, []);

  const logOut = () => {
    deleteAuth();
    setChannelsContext([]);
    setUserLoginContext({});
    setDirectMessageContext([]);
    navigate(`../users/user-login`, { replace: true });
  };

  const renderNav = () => {
    if (true) {
      return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
              {userLoginContext.uid}
            </a>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <a className='nav-link active' aria-current='page' href='#'>
                    {/* Home */}
                  </a>
                </li>
              </ul>
              <div className='d-flex'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                  <li className='nav-item'>
                    <Link
                      className='nav-link active'
                      aria-current='page'
                      onClick={logOut}
                      to=''
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      );
    } else {
      return <></>;
    }
  };

  return renderNav();
};

export default Header;
