import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import HeaderCartButton from "../Layout-shop/HeaderCartButton";
import mealsImage from "../../assets-shop/meals.jpg";
// import classes from "./Header.module.css";
import classes from "./MainNavigation.module.css";

const MainNavigation: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authCtx.isLoggedIn;
  const logOutHandler: any = () => {
    authCtx.logout();
    history.replace("/");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>GroupBuying App</div>
      </Link>

      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/HeaderCartButton">
                {/* <HeaderCartButton onClick={props.onShowCart} /> */}
                HeaderCartButton
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
