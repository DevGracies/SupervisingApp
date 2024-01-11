import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formPic from "../../images/form.jpg";
import { createUserAction, loginUserAction } from "../../redux/actions";
import { toast } from "react-toastify";
import { LOGIN_USER_RESET } from "../../redux/constants";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isLogIn, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useSelector((state) => state);
  const { error, success, user } = loginUser;

  function changeHandler(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "firstname") {
      setFirstName(value);
    }
    if (name === "lastname") {
      setLastName(value);
    }
    if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  }
  console.log(user, "user");
  useEffect(() => {
    if (isLogIn && success) {
      toast.success(`${user.firstName} Welcome back`);
      setTimeout(() => {
        navigate("/Join");
      }, 5000);
    }
    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: LOGIN_USER_RESET });
      }, 5000);
    }
  }, [success, error]);
  const siginHandler = (event) => {
    event.preventDefault();
    console.log(email, password, "email and password");
    dispatch(loginUserAction(email, password));
    setEmail("");
    setPassword("");
  };

  function registerHandler() {
    dispatch(
      createUserAction({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      })
    );
    setTimeout(() => {
      toast.success(`${email} registered`);
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }, 5000);
    setIsLoading(true);
    setIsLogin(true);
  }

  function signIn(e) {
    e.preventDefault();
    setIsLogin(true);
  }
  function signUp(e) {
    e.preventDefault();
    setIsLogin(false);
  }
  return (
    <React.Fragment>
      <h2 style={{ color: "#ff5102", textAlign: "center" }}>SECURE DIARY</h2>
      <LoginContainer>
        <img src={formPic} alt="" style={{ width: "50%" }} />
        <FormContainer>
          <div>
            <h1 style={{ textAlign: "center" }}>
              {isLogIn
                ? "SignIn to create your diary"
                : "SignUp to create your diary"}
            </h1>
            {isLogIn ? (
              <>
                <Label>Email</Label>
                <Input
                  type="text"
                  value={email}
                  name="email"
                  onChange={changeHandler}
                  placeholder="your@email.com"
                />

                <Label>Password</Label>

                <Input
                  placeholder="enter password"
                  type="text"
                  name="password"
                  onChange={changeHandler}
                  value={password}
                />
              </>
            ) : (
              <>
                <Label>First Name</Label>
                <Input
                  type="text"
                  value={firstName}
                  name="firstname"
                  onChange={changeHandler}
                  placeholder="FirstName"
                />

                <Label>Last Name </Label>

                <Input
                  placeholder="Lastname"
                  type="text"
                  name="lastname"
                  onChange={changeHandler}
                  value={lastName}
                />

                <Label>Email</Label>
                <Input
                  type="text"
                  value={email}
                  name="email"
                  onChange={changeHandler}
                  placeholder="your@email.com"
                />

                <Label>Phone Number</Label>
                <Input
                  type="text"
                  value={phoneNumber}
                  name="phoneNumber"
                  onChange={changeHandler}
                  placeholder="phoneNumber"
                />

                <Label>Password</Label>

                <Input
                  placeholder="enter password"
                  type="text"
                  name="password"
                  onChange={changeHandler}
                  value={password}
                />
              </>
            )}

            {isLoading ? (
              <h2>Loading.....</h2>
            ) : isLogIn ? (
              <Button onClick={siginHandler}>Sign in</Button>
            ) : (
              <Button onClick={registerHandler}>Sign Up</Button>
            )}
            <div style={{ fontSize: "30px" }}>
              {isLogIn ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <h4>Do you have an account?</h4>

                  <button
                    style={{
                      backgroundColor: "#ffff",
                      borderColor: "#fff",
                      borderRadius: "10%",
                      border: "5px",
                      fontSize: "30px",
                      color: "#ff5102",
                    }}
                    onClick={signUp}
                  >
                    SignUp
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <h4>Already have an account?</h4>

                  <button
                    style={{
                      backgroundColor: "#ffff",
                      borderColor: "#fff",
                      borderRadius: "10%",
                      border: "5px",
                      fontSize: "30px",
                      color: "#ff5102",
                    }}
                    onClick={signIn}
                  >
                    SignIn
                  </button>
                </div>
              )}
            </div>
          </div>
        </FormContainer>
      </LoginContainer>
    </React.Fragment>
  );
}

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const FormContainer = styled.form`
  width: 50%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ff5102;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  background-color: #fff;
  color: #ff5102;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: #fffff;
  }
`;
//using styled component, design a header component in react that has
