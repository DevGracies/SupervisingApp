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
          width: "50vw",
          minWidth: " 100vw",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
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
      <div style={{ height: " max-content", minHeight: "55vh" }}>
        <AllNote />
      </div>
    </div>
  );
}

export default UserDashboard;
