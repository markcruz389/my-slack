import React from "react";
import { Outlet } from "react-router";
import Header from "./common/Header";
import { getAuth } from "../services/localStorage";

const auth = getAuth();

function Layout() {
  return (
    /* A "layout route" is a good place to put markup you want to
       share across all the pages on your site, like navigation. */

    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
