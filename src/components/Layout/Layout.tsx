import React from "react";
import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

const Layout: React.FC<{ children: any }> = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
