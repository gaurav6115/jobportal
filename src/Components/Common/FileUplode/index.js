import React from "react";

import { TextField } from "@mui/material";

import pdfIcon from "../../../Assects/pdf-Icon.png";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "../../../firebase";


const FileUpload = ({ fileType, onUpload, value, required, disabled }) => {

  const upload = (e) => {

    const file = e.target.value[0];

    const storageRef = ref(storage, `${fileType}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error, "error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          onUpload(downloadURL);
        });
      }
    );
  };
  return (
    <div>
      <div>
        <label className="onBoardingLabel">Company Logo*</label>
        <TextField
        disabled={disabled}
          required={required}
          id="outliner-basic"
          variant="outlined"
          fullWidth
          InputProps={{
            accept: fileType === "doc" ? "application/pdf" : "image/*",
          }}
          size="small"
          type={"file"}
          onChange={(e) => upload(e)}
        />
      </div>
      {fileType === "doc" && value ? (
        <div style={{ margin: "20px" }}>
          <img width="100px" src={pdfIcon} alt="pdf_img" />
        </div>
      ) : fileType === "image" && value ? (
        <div style={{ margin: "20px" }}>
          <img src={value} width="100px" alt="img" />
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
