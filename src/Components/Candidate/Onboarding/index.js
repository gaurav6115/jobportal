import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./onBoarding.css";

import { Button, CircularProgress, Grid, TextField } from "@mui/material";

import Dropdown from "../../Common/Dropdown";
import SearchDropdown from "../../Common/SearchDropDown";

import FileUpload from "../../Common/FileUplode";

import { UserContext } from "../../../context/userContext";
import { skills, experience, primaryRole } from "../../../contents";

import { db } from "../../../firebase";

import { doc, setDoc } from "firebase/firestore";

import toastMsg from "../../../Util/toastMsg";

const CandidateOnboarding = () => {

  const [userData, dispatch] = useContext(UserContext);

  const [loading, setLoading] = React.useState(false);

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
      toastMsg("Successful Setup", "success");
      navigate('/candidate/profile')
      setLoading(false);
    } catch (e) {
      console.log(e);
      toastMsg("Setup is Failed", "danger");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <Grid container spacing={2} className="onBoardingContainer">
        <Grid item xs={12} md={12}>
          <h2>Setup your profile</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Name*</label>
          <TextField
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
            required={true}
            options={primaryRole}
            onChange={(data) => setUserInfo({ ...userInfo, primaryRole: data })}
            value={userInfo.primaryRole}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">LinkedIn*</label>
          <TextField
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
            required={true}
            options={experience}
            onChange={(data) => setUserInfo({ ...userInfo, experience: data })}
            value={userInfo.experience}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Skills*</label>
          <SearchDropdown
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
            required={true}
            fileType="doc"
            onUpload={(url) => setUserInfo({ ...userInfo, resume: url })}
            value={userInfo.resume}
          />
        </Grid>
        <Grid item xs={12} className="candidateSubmitFormBtn">
          {
            loading ? (
              <CircularProgress />
            ) : (
              <Button
                // disabled={userInfo.resume === ""}
                
                type="submit"
              >
                Complete Setup
              </Button>
            )
          }
        </Grid>
      </Grid>
    </form>
  );
};

export default CandidateOnboarding;
