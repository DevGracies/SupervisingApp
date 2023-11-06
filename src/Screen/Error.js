import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  background-color: #fff;
  color: #ff5102;
  border-radius: 10px;
  height: 50px;
  width: 100px;
`;
const Error = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white" }}> 404 Page not found </h2>
      <br />
      <Link to="/">
        <Button>Go back</Button>
      </Link>
    </div>
  );
};

export default Error;
