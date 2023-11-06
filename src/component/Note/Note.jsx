import React, { useState } from "react";
import styled from "styled-components";
import { buyCakeAction } from "../../redux/actions/buyCakeAction";
import { createUserAction } from "../../redux/actions/createUserAction";
import { getUserAction } from "../../redux/actions/createUserAction";
import { useDispatch, useSelector } from "react-redux";

const Paste = styled.div`
  background-color: #fff;
  color: #ff5102;
  border-radius: 10px;
  height: 500px;
  width: 500px;
`;
const Note = () => {
  //subscribe to store
  const { cakes, createUser, userReducer } = useSelector((state) => state);
  const { remainingItem, sold, numOfCakes } = cakes;
  const { loading, sucess: createUserSuccess, user, error } = createUser;
  const { loadings, users, errors } = userReducer;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paste>
        <div>
          <h2>Buy Car</h2>
          <p>Total item:{numOfCakes} </p>
          <p>Remaining Items:{remainingItem} </p>
          <p>Sold: {sold} </p>
          <input
            type="text"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <button onClick={() => dispatch(buyCakeAction(+qty))}>Buy Now</button>

          <div style={{ margin: "100px 0" }}>
            {loading && <h2>loading.....</h2>}
            {error && <h2 style={{ color: "blue" }}>Error:{error}</h2>}
            {user && (
              <>
                <p> Username:{user.username} </p>
                <p>Email:{user.email} </p>
              </>
            )}
            click the button to create user
            <button
              onClick={() =>
                dispatch(
                  createUserAction({
                    username: "lora Sean",
                    email: "lorasean@gmail.com",
                    password: "@lorasean",
                  })
                )
              }
            >
              Create User
            </button>
            <h2>Admin DashBoard</h2>
            <button onClick={() => dispatch(getUserAction())}>
              Show all users
            </button>
            {loadings && <h2>Loading....</h2>}
            {errors && <h2 style={{ color: "red" }}>Error: {error}</h2>}
            {users.map((user) => (
              <ol key={user.id}>
                <li> Username: {user.username} </li>
                <li>Email: {user.email} </li>
                <li>Password: {user.password} </li>
              </ol>
            ))}
          </div>
          <button>Edit Journal</button>
          <button>Delete Journal</button>
        </div>
      </Paste>
    </div>
  );
};

export default Note;
