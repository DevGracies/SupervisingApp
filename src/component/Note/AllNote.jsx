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
  margin: 10px;
  padding: 5px;
`;
const Button = styled.button`
  border: none;
  background-color: #ff5102;
  color: #fff;
  border-radius: 5px;
`;

const AllNote = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const [editNote, setEditNote] = useState("");
  const { createDiary, getDiaries} = useSelector((state) => state);
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
      setEdit(null);
      setEditNote("");
      console.log(editNote, "updated");
    }
  };
  // const realValue = () => {
  //   dispatch(getDiaryAction());
  // };
  useEffect(() => {
    dispatch(getDiariesAction());
  }, [dispatch]);

  return (
    <div>
   
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: " auto auto auto ",
          alignItems: "center",
        }}
      >
        {diaries.map((note) => {
          return (
            <div key={note.id}>
              <Paste>
                <h6>{Date()} </h6>
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
                    <p dangerouslySetInnerHTML={{ __html: note.desc }} />
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
