import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDiaryAction,
  getDiariesAction,
  updateDiaryAction,
} from "../../redux/actions";
import styles from "./all.module.css";

const AllNote = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const [editNote, setEditNote] = useState("");
  const { createDiary, getDiaries } = useSelector((state) => state);
  const { diaries } = getDiaries;
  const { time } = createDiary;
  console.log(createDiary, "createDiary");
  const editHandler = (id, currNote) => {
    console.log(currNote, "current note");
    setEdit(id);
    setEditNote(currNote);
  };
  console.log(edit, "edit");
  const deleteHandler = (id) => {
    dispatch(deleteDiaryAction(id));
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
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Check whether AM or PM
  let newformat = hours >= 12 ? "PM" : "AM";

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let answer = hours + ":" + minutes + " " + newformat;
  console.log(hours + ":" + minutes + " " + newformat);

  const timee = new Date();
  const showTime = ` ${timee.getHours()} : ${timee.getMinutes()} : ${timee.getSeconds()}`;

  const dateDay = [timee.getDate(), timee.getDay(), timee.getFullYear()].join(
    "/"
  );
  useEffect(
    (id) => {
      dispatch(getDiariesAction());
      dispatch(updateDiaryAction(edit, editNote));
      deleteDiaryAction(id);
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
                  <h3>{time} </h3>
                  <h6> {dateDay} </h6>
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
                  <h2>readmore....</h2>
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
