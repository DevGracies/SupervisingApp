import React from "react";
import style from "./UserDashboard.module.css";
import NewNote from "../NewNote/NewNote";
import AllNote from "../Note/AllNote";

function UserDashboard() {
  return (
    <div className={style.dashboard}>
      <div
        style={{
          justifyContent: "center",
          display: " flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "max-content",
            padding: "5px",
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
      <div style={{ height: " max-content", minHeight: "500px" }}>
        <AllNote />
      </div>
    </div>
  );
}

export default UserDashboard;
