import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./profile.css";

import { Button, CircularProgress, Grid, TextField } from "@mui/material";

import Dropdown from "../../Common/Dropdown";
import SearchDropdown from "../../Common/SearchDropDown";
import FileUpload from "../../Common/FileUplode";
import FormLoading from "../../Common/Loading";

import { UserContext } from "../../../context/userContext";
import { skills, experience, primaryRole } from "../../../contents";

import { db } from "../../../firebase";

import { doc, setDoc, getDoc } from "firebase/firestore";

import toastMsg from "../../../Util/toastMsg";

const CandidateProfile = () => {
  const [userData, dispatch] = useContext(UserContext);

  const [loading, setLoading] = React.useState(false);
  const [screenLoading, setScreenLoading] = React.useState(true);
  const [isEdit, setIsEdit] = React.useState(false);

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = React.useState({
    name: userData.user.displayName,
    email: userData.user.email,
    phone: "",
    location: "",
    primaryRole: "",
    linkedIn: "",
    experience: "",
    bio: "",
    skills: [],
    resume: "",
  });

  const fetchData = async () => {
    const docRef = doc(db, "users", userData.user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data());
      setScreenLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setScreenLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSkills = (data, type) => {
    if (type === "delete") {
      let newData = userInfo.skills.filter((skill) => skill !== data);
      setUserInfo({ ...userInfo, skills: newData });
    } else {
      if (userInfo.skills.find((skill) => skill === data)) {
      } else {
        let newData = [...userInfo.skills, data];
        setUserInfo({ ...userInfo, skills: newData });
      }
    }
  };

  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await setDoc(doc(db, "users", userData.user.email), {
        ...userInfo,
        userType: "candidate",
      });
      toastMsg("Data Updated Successful", "success");
      // navigate("/candidate/profile");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toastMsg("Failed", "danger");
      setLoading(false);
    }
    setIsEdit(false);
  };

  return screenLoading ? (
    <FormLoading fields={10} height={100} />
  ) : (
    <form onSubmit={(e) => submit(e)}>
      <Grid container spacing={2} className="onBoardingContainer">
        <Grid item xs={12} className="candidateBtn">
          <div>
            {loading ? (
              <CircularProgress />
            ) : (
              <div>
                {isEdit ? (
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{
                        backgroundColor: "red",
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        setIsEdit(false);
                      }}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            )}
          </div>
          <Button type="button">Logout</Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Name*</label>
          <TextField
            disabled={!isEdit}
            required
            id="outliner-basic"
            variant="outlined"
            fullWidth
            size="small"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Email*</label>
          <TextField
            required
            disabled
            id="outliner-basic"
            variant="outlined"
            fullWidth
            type={"email"}
            size="small"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Phone Number*</label>
          <TextField
            disabled={!isEdit}
            required
            id="outliner-basic"
            variant="outlined"
            fullWidth
            size="small"
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Location*</label>
          <TextField
            disabled={!isEdit}
            required
            id="outliner-basic"
            variant="outlined"
            fullWidth
            size="small"
            value={userInfo.location}
            onChange={(e) =>
              setUserInfo({ ...userInfo, location: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Primary Role*</label>
          <Dropdown
            disabled={!isEdit}
            required={true}
            options={primaryRole}
            onChange={(data) => setUserInfo({ ...userInfo, primaryRole: data })}
            value={userInfo.primaryRole}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">LinkedIn*</label>
          <TextField
            disabled={!isEdit}
            required
            id="outliner-basic"
            variant="outlined"
            fullWidth
            type={"url"}
            size="small"
            value={userInfo.linkedIn}
            onChange={(e) =>
              setUserInfo({ ...userInfo, linkedIn: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Experience*</label>
          <Dropdown
            disabled={!isEdit}
            required={true}
            options={experience}
            onChange={(data) => setUserInfo({ ...userInfo, experience: data })}
            value={userInfo.experience}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Skills*</label>
          <SearchDropdown
            disabled={!isEdit}
            required={true}
            options={skills}
            onChange={(data) => handleSkills(data, "add")}
            values={userInfo.skills}
            onDelete={(data) => handleSkills(data, "delete")}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <label className="onBoardingLabel">Bio*</label>
          <TextField
            disabled={!isEdit}
            required
            multiline
            minRows={4}
            id="outliner-basic"
            variant="outlined"
            fullWidth
            size="small"
            value={userInfo.bio}
            onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FileUpload
            disabled={!isEdit}
            required={true}
            fileType="doc"
            onUpload={(url) => setUserInfo({ ...userInfo, resume: url })}
            value={userInfo.resume}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default CandidateProfile;
