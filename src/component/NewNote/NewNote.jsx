import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createDiaryAction, userDaries } from "../../redux/actions";

const NewNote = () => {
  const [value, setValue] = useState("");
  const [note, setNote] = useState();
  const dispatch = useDispatch();
  const { getUser } = useSelector((state) => state);
  const { user } = getUser;
  const submitHandler = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      dispatch(createDiaryAction(value));
    }
    console.log(value, "this is the value written");
    setValue("");
    setNote(!note);
  };

  // const handleAddDiaryEntry = (diaryEntry) => {
  // dispatch(userDaries(userId, diaryEntry));
  // };
  //
  var toolbarOptions = [
    [{ header: 1 }, { header: 2 }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ list: [] }],
    [{ align: [] }],
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Top onSubmit={submitHandler}>
        {/* <h2>{user.email.slice(0, 6)}</h2> */}
        <Note onClick={() => setNote(!note)}>
          Write <FaPlus />
        </Note>
        {note && (
          <Overall>
            <Fold onSubmit={submitHandler}>
              <Task>
                <h2>New Diary</h2>
                <button
                  onClick={() => setNote(false)}
                  style={{
                    fontSize: "50px",
                    font: "bold",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    border: "none",
                    color: "#ff5102",
                  }}
                >
                  &times;
                </button>
              </Task>
              <h1>Write about how you feel?</h1>

              <ReactQuill
                modules={module}
                theme="snow"
                name="value"
                value={value}
                onChange={setValue}
                placeholder="Let's talk about how you feel....."
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                <button
                  type="submit"
                  style={{
                    color: "#ffff",
                    backgroundColor: "#ff5102",
                    border: "none",
                    width: "100px",
                    borderRadius: "5px",
                    height: "50px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  Create <FaPlus />
                </button>
              </div>
            </Fold>
          </Overall>
        )}
      </Top>
    </div>
  );
};

export default NewNote;
//npm install react-quill --save

const Top = styled.section`
  background-color: #fff;
  height: 90px;
  align-items: center;
  width: 390px;
  display: flex;
  border-radius: 20px;
  color: #ff5102;
  padding: 20px;
`;

const Note = styled.button`
  cursor: pointer;
  background-color: #ff5102;
  color: #ffff;
  border: none;
  font-size: 30px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
  width: 100px;
  height: 50px;
  margin: 5px;
`;
const Fold = styled.form`
  background-color: #ffff;
  border-radius: 15px;
  width: 80vh;
  height: 80vh;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
const Task = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
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
