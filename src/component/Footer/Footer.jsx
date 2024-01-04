// Footer.js

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  padding: 10px;
  background-color: #ff5102;
  border-top: 1px solid #ddd;
`;

const CopyrightText = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <CopyrightText>©Olori 2023</CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
