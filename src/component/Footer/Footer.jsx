import React from "react";
import styled from "styled-components";

const Copy = styled.section`
  background-color: #ff5102;
  color: #ffff;
  margin: 0;
  padding: 0;
  text-align: center;
  height: 90px;
`;
const Footer = () => {
  return (
    <Copy>
      <h2>&copy;Olori 2023 </h2>
    </Copy>
  );
};

export default Footer;
