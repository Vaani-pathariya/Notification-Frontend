import React, { useState } from 'react';

const ExcelReader = () => {
  const [subject,SetSubject]=useState("");
  const [text,setText]=useState("");
  const [fileData, setFileData] = useState(null);
  const handleSubject=(event)=>{
    SetSubject(event.target.value);
  }
  const handleText=(event)=>{
    setText(event.target.value);
  }
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
        return;
      }
      setFileData(file);
  };
  const sendExcelData = () => {
    if (!fileData){
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('excelFile', fileData);
    formData.append('subject', subject);
    formData.append('text', text);
    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <input type='text' placeholder='Enter the subject of Emails' onChange={handleSubject}></input>
      <input type='text' placeholder='Enter the content of the Emails' onChange={handleText}></input>
      <button onClick={sendExcelData}>Send</button>
    </div>
  );
};

export default ExcelReader;
