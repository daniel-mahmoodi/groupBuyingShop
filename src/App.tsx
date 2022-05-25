import React, { useContext, useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import Header from "./components/Layout-shop/Header";
import Meals from "./components/Meals-shop/Meals";
import Cart from "./components/Cart-shop/Cart";
// import CartProvider from './store/CartProvider';

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";

// interface ConfirmationModalProps {
//   onClose: () => void;
//   onShowCart: () => void;
//   showCartHandler: () => void;
//   hideCartHandler: () => void;
// }

const App: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Layout>
      {/* Why? */}
      {cartIsShown && <Cart onClose={hideCartHandler} onConfirm={function (): void {
        throw new Error("Function not implemented.");
      } } onCancel={function (): void {
        throw new Error("Function not implemented.");
      } } name={function (): void {
        throw new Error("Function not implemented.");
      } } amount={function (): void {
        throw new Error("Function not implemented.");
      } } price={function (): void {
        throw new Error("Function not implemented.");
      } } onRemove={function (): void {
        throw new Error("Function not implemented.");
      } } onAdd={function (): void {
        throw new Error("Function not implemented.");
      } } submitOrderHandler={function (): void {
        throw new Error("Function not implemented.");
      } } />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
      {/* </CartProvider> */}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
