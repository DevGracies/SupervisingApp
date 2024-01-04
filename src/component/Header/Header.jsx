import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction } from "../../redux/actions";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUser } = useSelector((state) => state);
  const { user } = getUser;
  console.log(user, "mk1");

  const deleteAccount = (User) =>
    dispatch(deleteUserAction(User.id, User), navigate("/"));
  // console.log(logout, "userrrr");

  useEffect(() => {
    console.log(user, "delete user");
  }, [user]);

  const logout = () => {
    console.log("logout");
  };
  return (
    <NavigationContainer>
      <Logo>Diary</Logo>
      <NavigationItems>
        <NavigationItem onClick={logout}>Logout</NavigationItem>
        <NavigationItem onClick={deleteAccount}>Delete Account</NavigationItem>
      </NavigationItems>
    </NavigationContainer>
  );
}

export default Header;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ff5102;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const NavigationItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavigationItem = styled.div`
  margin-left: 20px;
  cursor: pointer;
  color: #fff;

  &:hover {
    text-decoration: underline;
  }
`;
