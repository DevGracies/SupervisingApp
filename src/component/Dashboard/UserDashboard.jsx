import React from "react";
import style from "./UserDashboard.module.css";
import NewNote from "../NewNote/NewNote";
import AllNote from "../Note/AllNote";

function UserDashboard() {
  return (
    <div className={style.dashboard}>
      <div
        style={{
          width: " max-content",
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "max-content",
          }}
        >
          <NewNote />
          <h1
            style={{ color: "#ff5102", textAlign: "center", fontSize: "40px" }}
          >
            Diary
          </h1>
        </div>
      </div>
      <div>
        <AllNote />
      </div>
    </div>
  );
}

export default UserDashboard;
