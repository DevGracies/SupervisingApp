import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteDiaryAction,
  getDiariesAction,
  updateDiaryAction,
} from "../../redux/actions";

const Paste = styled.div`
  background-color: #fff;
  color: #ff5102;
  border-radius: 10px;
  height: max-content;
  width: 300px;
  max-height: 300px;
  margin: 10px;
  padding: 5px;
`;
const Button = styled.button`
  border: none;
  background-color: #ff5102;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;
const Overall = styled.div`
  display: none;
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
const H2 = styled.h3`
  position: relative;
  display: inline-block;
`;

const AllNote = () => {
  const dispatch = useDispatch();
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
  };
  const updateHandler = (e) => {
    e.preventDefault();
    if (editNote.trim() !== "") {
      dispatch(updateDiaryAction(edit, editNote));
      // setEdit(null);
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

  const time = new Date();
  const showTime = ` ${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()}`;

  const dateDay = [time.getDate(), time.getDay(), time.getFullYear()].join("/");
  useEffect(() => {
    dispatch(getDiariesAction());
  }, [dispatch]);
  return (
    <div>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: " auto auto ",
          alignItems: "center",
        }}
      >
        {diaries.map((note) => {
          return (
            <div
              key={note.id}
              // onClick={() => (Overall.style.visibility = "visible")}
            >
              <Paste>
                <h3>{answer} </h3>
                <h6> {dateDay} </h6>
                {note.id === edit ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Edit note"
                      value={editNote}
                      style={{ outline: "none", border: "none" }}
                      onChange={(e) => setEditNote(e.target.value)}
                    />
                    <Button onClick={updateHandler}>Update</Button>
                  </div>
                ) : (
                  <div>
                    <h4
                      dangerouslySetInnerHTML={{
                        __html: note.desc.slice(0, 20),
                      }}
                    />
                    {/* <Overall
                      dangerouslySetInnerHTML={{
                        __html: note.desc,
                      }}
                    /> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button onClick={() => editHandler(note.id, note.desc)}>
                        Edit Diary
                      </Button>
                      <Button onClick={() => deleteHandler(note.id)}>
                        Delete Diary
                      </Button>
                    </div>
                  </div>
                )}
              </Paste>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AllNote;
