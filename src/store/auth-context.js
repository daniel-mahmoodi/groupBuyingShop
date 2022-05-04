import React, { useCallback, useEffect, useState } from "react";
let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateTimeRemaining = (expectedTime) => {
  const currentTime = new Date().getTime();
  const addExpectedTime = new Date(expectedTime).getTime();
  const remainingDuration = addExpectedTime - currentTime;
  return remainingDuration;
};
const retriveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedexpectedTime = localStorage.getItem("expectedTime");
  const remainingTime = calculateTimeRemaining(storedexpectedTime);
  if (remainingTime <= 6000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expectedTime");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};
export const AuthContextProvider = (props) => {
  const tokenData = retriveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expectedTime");
    clearTimeout(logoutTimer);
  }, []);
  const loginHandler = (token, expectedTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expectedTime", expectedTime);
    const expectedTimeRemaining = calculateTimeRemaining(expectedTime);
    logoutTimer = setTimeout(logoutHandler, expectedTimeRemaining);
  };
  useEffect(() => {
    if (tokenData) {
      console.log("tokendata time:", tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
