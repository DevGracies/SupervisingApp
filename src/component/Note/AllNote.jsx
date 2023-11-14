import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDiaryAction,
  getDiariesAction,
  updateDiaryAction,
} from "../../redux/actions";
import styles from "./all.module.css";

import styled from "styled-components";

const Overall = styled.div`
  width: 100%;
  top: 0;
  buttom: 0;
  left: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  backdrop-filter: blur(10px);
`;
const AllNote = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState();
  const [edit, setEdit] = useState(null);
  const [editNote, setEditNote] = useState("");
  const { createDiary, getDiaries } = useSelector((state) => state);
  const { diaries } = getDiaries;
  console.log(createDiary, "createDiary");
  const editHandler = (id, currNote) => {
    console.log(currNote, "current note");
    setEdit(id);
    setEditNote(currNote);
  };
  console.log(edit, "edit");
  const deleteHandler = (id) => {
    dispatch(deleteDiaryAction(id));
    setEdit(null);
    //i am suppose to call a function here to make single id disappear
  };
  const updateHandler = (e) => {
    e.preventDefault();
    if (editNote.trim() !== "") {
      dispatch(updateDiaryAction(edit, editNote));
      setEdit(null);
      setEditNote("");
      console.log(editNote, "updated");
    }
  };
  useEffect(
    (id) => {
      dispatch(getDiariesAction());
      dispatch(updateDiaryAction(edit, editNote));
      dispatch(deleteDiaryAction(id));
    },
    [dispatch, edit, editNote, createDiary]
  );
  return (
    <div className={styles.all}>
      <ul>
        {diaries.map((note) => {
          return (
            <div
              key={note.id}
              // onClick={() => (Overall.style.visibility = "visible")}
            >
              <div id={styles.paste}>
                <div id={styles.mary}>
                  <h3>{note.time} </h3>
                  <h6> {note.date} </h6>
                </div>

                <div>
                  {note.id === edit ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Edit note"
                        value={editNote}
                        style={{ outline: "none", border: "none" }}
                        onChange={(e) => setEditNote(e.target.value)}
                      />
                      <button className={styles.button} onClick={updateHandler}>
                        Update
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h4
                        dangerouslySetInnerHTML={{
                          __html: note.desc.slice(0, 20),
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                          gap: "20px",
                        }}
                      >
                        <button
                          className={styles.button}
                          onClick={() => editHandler(note.id, note.desc)}
                        >
                          Edit Diary
                        </button>
                        <button
                          className={styles.button}
                          onClick={() => deleteHandler(note.id)}
                        >
                          Delete Diary
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h2
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(!open)}
                  >
                    readmore...
                  </h2>
                  {open && (
                    <Overall>
                      <div
                        style={{
                          width: "800px",
                          height: "600px",
                          borderRadius: "50px 50px 50px 50px",
                          backgroundColor: "#ff5102",
                          color: "#fff",
                          padding: "20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <h1>Date:{note.time}</h1>
                            <h3>{note.date}</h3>
                          </div>
                          <button
                            onClick={() => setOpen(false)}
                            style={{
                              fontSize: "50px",
                              font: "bold",
                              cursor: "pointer",
                              backgroundColor: "#fff",
                              border: "none",
                              color: "#ff5102",
                              width: "50px",
                              height: "50px",
                              borderRadius: "1000%",
                            }}
                          >
                            &times;
                          </button>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: note.desc,
                          }}
                        />
                      </div>
                    </Overall>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AllNote;
