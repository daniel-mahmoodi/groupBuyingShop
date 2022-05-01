import React, { useRef, useState } from "react";

import { Form, Button } from "react-bootstrap";

const AuthForm = () => {
  const [isLoginForm, setIsLogiForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogiForm(() => !isLoginForm);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const loginEmailValue = loginEmailRef.current.value;
    const loginPasswordValue = loginPasswordRef.current.value;
    if (loginPasswordValue.length <= 6) console.log("error");
    setIsLoading(true);
    let url;
    if (isLoginForm) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkkYMw5FEWtgta88nSsg-l64wiPxGOuCY";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkkYMw5FEWtgta88nSsg-l64wiPxGOuCY";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: loginEmailValue,
        password: loginPasswordValue,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(() => {
            let errorMessage = "Authentication faild";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("data:", data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Form
      onSubmit={submitHandler}
      className="mx-auto my-3 w-25 bg-light rounded"
    >
      <h1 className="d-flex flex-column align-items-center">
        {isLoginForm ? "Log In" : "Sign Up"}
      </h1>
      <Form.Group
        className="m-3 d-flex flex-column align-items-center"
        controlId="formBasicEmail"
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          ref={loginEmailRef}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group
        className="m-3 d-flex flex-column align-items-center"
        controlId="formBasicPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          ref={loginPasswordRef}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="d-flex flex-column flex-item-center">
        {!isLoading && (
          <Button className="mx-auto" variant="primary" type="submit">
            {isLoginForm ? "Log in" : "Create new account"}
          </Button>
        )}

        {isLoading && <p>Loading...</p>}
        <button
          className="btn mx-auto border-0 text-danger my-3"
          onClick={switchAuthModeHandler}
        >
          {isLoginForm ? "create new account" : "login with existing account"}
        </button>
      </Form.Group>
    </Form>
  );
};

export default AuthForm;
