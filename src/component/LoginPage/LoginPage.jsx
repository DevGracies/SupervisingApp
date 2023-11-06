import React, { useState, useEffect } from "react";
import styled from "styled-components";
import style from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserAction, getUserAction } from "../../redux/actions";
import { toast } from "react-toastify";

const WelcomeForm = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isLogIn, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { createUser, getUser } = useSelector((state) => state);
  const { userCreated } = createUser;
  const { user } = getUser;
  useEffect(() => {
    if (user) {
      toast.success("welcome back");
      setTimeout(() => {
        navigate("/Join");
      }, 5000);
    }
  }, [user, navigate]);
  const siginHandler = () => {
    console.log(email, password, "email and password");
    dispatch(getUserAction(email, password));
    setEmail("");
    setPassword("");
  };
  // console.log(geUser);
  console.log(user, "loginpage");

  function changeHandler(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }
  function registerHandler() {
    setIsLoading(true);
    setIsLogin(true);

    // if (userCreated.find((user) => user.email === email)) {
    //   toast.error("Email already registered");
    // } else {
    //   dispatch(createUserAction({ email: email, password: password }));
    // }
    dispatch(createUserAction({ email: email, password: password }));
    setTimeout(() => {
      toast.success(`${email} registered`);
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }, 5000);
  }
  return (
    <React.Fragment>
      <div className={style.general}>
        <h2>SECURE DIARY</h2>
        <WelcomeForm>
          <div className={style.form}>
            <h1 className={style.h2}>
              {isLogIn
                ? "SignIn to create your diary"
                : "SignUp to create your diary"}{" "}
            </h1>
            <label className={style.label}>Email</label> <br />
            <input
              type="text"
              value={email}
              name="email"
              onChange={changeHandler}
              placeholder="your@email.com"
              className={style.input}
            />
            <br />
            <label className={style.label}>Password</label>
            <br />
            <input
              className={style.input}
              placeholder="enter password"
              type="text"
              name="password"
              onChange={changeHandler}
              value={password}
            />
            <br />
            {isLoading ? (
              <h2>Loading.....</h2>
            ) : isLogIn ? (
              <button className={style.button} onClick={() => siginHandler()}>
                Sign in
              </button>
            ) : (
              <button
                className={style.button}
                onClick={() => registerHandler()}
              >
                Sign Up
              </button>
            )}
            <div style={{ fontSize: "30px" }}>
              {isLogIn ? (
                <>
                  <h4>Do you have an account?</h4>

                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "30px",
                      textDecoration: "underline",
                    }}
                    onClick={() => setIsLogin(false)}
                  >
                    SignUp
                  </button>
                </>
              ) : (
                <>
                  <h4>Already have an account?</h4>

                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "30px",
                      textDecoration: "underline",
                    }}
                    onClick={() => setIsLogin(true)}
                  >
                    SignIn
                  </button>
                </>
              )}
            </div>
          </div>
        </WelcomeForm>
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
