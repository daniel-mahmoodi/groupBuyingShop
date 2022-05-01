import React from "react";
import "./App.css";
import Header from "./components/Header";
import AuthForm from "./components/Auth/AuthForm";
function App() {
  return (
    <React.Fragment>
      <Header />
      <AuthForm />
    </React.Fragment>
  );
}

export default App;
