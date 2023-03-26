import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./onBoarding.css";

import { Button, CircularProgress, Grid, TextField } from "@mui/material";

import Dropdown from "../../Common/Dropdown";
import FileUpload from "../../Common/FileUplode";

import { UserContext } from "../../../context/userContext";
import { industryType, companySize } from "../../../contents";

import { db } from "../../../firebase";

import { doc, setDoc } from "firebase/firestore";

import toastMsg from "../../../Util/toastMsg";

const EmployerOnboarding = () => {
  const [userData, dispatch] = useContext(UserContext);

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = React.useState({
    name: userData.user.displayName,
    employer_email: userData.user.email,
    phone: "",
    location: "",
    industry_type: "",
    company_size: "",
    role: "",
    website: "",
    company_name: "",
    company_tag: "",
    company_bio: "",
    company_logo: "",
  });

  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await setDoc(doc(db, "users", userData.user.email), {
        ...userInfo,
        userType: "employer",
      });
      toastMsg("Successful Setup", "success");
      navigate("/employer/profile");
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
          <h2>Setup your Employer Profile</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Company Name*</label>
          <TextField
            required
            id="outliner-basic"
            variant="outlined"
            fullWidth
            size="small"
            value={userInfo.company_name}
            onChange={(e) =>
              setUserInfo({ ...userInfo, company_name: e.target.value })
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
          <label className="onBoardingLabel">Industry Type*</label>
          <Dropdown
            required={true}
            options={industryType}
            onChange={(data) =>
              setUserInfo({ ...userInfo, industry_type: data })
            }
            value={userInfo.industry_type}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Company Size*</label>
          <Dropdown
            required={true}
            options={companySize}
            onChange={(data) =>
              setUserInfo({ ...userInfo, company_size: data })
            }
            value={userInfo.company_size}
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
            value={userInfo.employer_email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, employer_email: e.target.value })
            }
          />
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
          <label className="onBoardingLabel">Your Role*</label>
          <TextField
            required
            id="outliner-basic"
            variant="outlined"
            fullWidth
            size="small"
            value={userInfo.role}
            onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
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
          <label className="onBoardingLabel">Website*</label>
          <TextField
            required
            id="outliner-basic"
            variant="outlined"
            fullWidth
            type={"url"}
            size="small"
            value={userInfo.website}
            onChange={(e) =>
              setUserInfo({ ...userInfo, website: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <label className="onBoardingLabel">Company Tagline</label>
          <TextField
            id="outliner-basic"
            variant="outlined"
            fullWidth
            size="small"
            value={userInfo.company_tag}
            onChange={(e) =>
              setUserInfo({ ...userInfo, company_tag: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <label className="onBoardingLabel">Company Bio*</label>
          <TextField
            required
            multiline
            minRows={4}
            id="outliner-basic"
            variant="outlined"
            fullWidth
            size="small"
            value={userInfo.company_bio}
            onChange={(e) =>
              setUserInfo({ ...userInfo, company_bio: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FileUpload
            required={true}
            fileType="image"
            onUpload={(url) => setUserInfo({ ...userInfo, company_logo: url })}
            value={userInfo.company_logo}
          />
        </Grid>
        <Grid item xs={12} className="employerSubmitFormBtn">
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              // disabled={userInfo.resume === ""}

              type="submit"
            >
              Complete Setup
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployerOnboarding;
