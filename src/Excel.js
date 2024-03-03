import React, { useState } from "react";

const ExcelReader = () => {
  const [subject, SetSubject] = useState("");
  const [text, setText] = useState("");
  const [fileData, setFileData] = useState(null);
  const handleSubject = (event) => {
    SetSubject(event.target.value);
  };
  const handleText = (event) => {
    setText(event.target.value);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setFileData(file);
  };
  const sendExcelData = () => {
    if (!fileData) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("excelFile", fileData);
    formData.append("subject", subject);
    formData.append("text", text);
    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} id="file-input" />
      <br></br>
      <label id="file-input-label" className="setting" for="file-input">
        Select a File
      </label><br></br>
      <input
        type="text"
        placeholder="Enter the subject of Emails"
        onChange={handleSubject}
        className="setting first"
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="Enter the content of the Emails"
        onChange={handleText}
        className="setting"
      ></input>
      <br></br>
      <button onClick={sendExcelData} className="send">Send</button>
    </div>
  );
};

export default ExcelReader;
