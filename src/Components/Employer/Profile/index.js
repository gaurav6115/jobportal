import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ".//profile.css";

import { Button, CircularProgress, Grid, TextField } from "@mui/material";

import Dropdown from "../../Common/Dropdown";
import FileUpload from "../../Common/FileUplode";

import { UserContext } from "../../../context/userContext";
import { industryType, companySize } from "../../../contents";

import { db } from "../../../firebase";

import { doc, setDoc, getDoc } from "firebase/firestore";

import toastMsg from "../../../Util/toastMsg";
import FormLoading from "../../Common/Loading";

const EmployerProfile = () => {
  const [userData, dispatch] = useContext(UserContext);

  const [loading, setLoading] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [screenLoading, setScreenLoading] = React.useState(true);

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

  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await setDoc(doc(db, "users", userData.user.email), {
        ...userInfo,
        userType: "employer",
      });
      toastMsg("Data Updated Successful", "success");
      // navigate("/employer/profile");
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
        <Grid item xs={12} className="employerBtn">
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
          <Button type="button" onClick={() => navigate("/")}>
            Logout
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="onBoardingLabel">Company Name*</label>
          <TextField
            disabled={!isEdit}
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
          <label className="onBoardingLabel">Industry Type*</label>
          <Dropdown
            disabled={!isEdit}
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
            disabled={!isEdit}
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
          <label className="onBoardingLabel">Your Role*</label>
          <TextField
            disabled={!isEdit}
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
          <label className="onBoardingLabel">Website*</label>
          <TextField
            disabled={!isEdit}
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
            disabled={!isEdit}
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
            disabled={!isEdit}
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
            disabled={!isEdit}
            required={true}
            fileType="image"
            onUpload={(url) => setUserInfo({ ...userInfo, company_logo: url })}
            value={userInfo.company_logo}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployerProfile;
