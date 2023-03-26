import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";

import Dropdown from "../../Common/Dropdown";
import FileUpload from "../../Common/FileUplode";
import { UserContext } from "../../../context/userContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import toastMessage from "../../../Util/toastMsg";
import SearchDropDown from "../../Common/SearchDropDown";
import { v4 as uuiv4 } from "uuid";
import {
  jobType,
  yearsOfExperience,
  salaryCurrency,
  skills,
} from "../../../contents";

const initalState = {
  jobType: "", //
  jobLocation: "", //
  jobTitle: "", //
  yearsOfExperience: "", //
  salary: {
    min: "",
    max: "",
    currency: "",
  },
  jobDescription: "",
  skills: [],
};
function Form({ setShowFormInMobile, selectedJob }) {
  const [userData, dispatch] = React.useContext(UserContext);
  const [jobData, setJobData] = React.useState({
    ...initalState,
  });
  useEffect(() => {
    if (selectedJob) {
      setJobData({ ...selectedJob });
    } else {
      setJobData({
        ...initalState,
      });
    }
  }, [selectedJob]);
  const [loading, setLoading] = React.useState(false);
  const handleSkills = (data, type) => {
    if (type === "delete") {
      let new_data = jobData.skills.filter((skill) => skill !== data);
      setJobData({ ...jobData, skills: new_data });
    } else {
      if (jobData.skills.find((skill) => skill === data)) {
      } else {
        let new_data = [...jobData.skills, data];
        setJobData({ ...jobData, skills: new_data });
      }
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    console.log(jobData);
    const jobId = selectedJob ? selectedJob.jobId : uuiv4();
    // post this data to firebase in jobs collection
    setLoading(true);
    try {
      await setDoc(doc(db, "jobs", jobId), {
        ...jobData,
        jobId,
        createdAt: new Date().toISOString(),
        employerId: userData.user.email,
        employerName: userData.userInfo.company_name,
        company_logo: userData.userInfo.company_logo,
      });
      if (selectedJob) {
        toastMessage("Job updated successfully", "success");
      } else {
        toastMessage("Job posted successfully", "success");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toastMessage("Something went wrong", "danger");
      setLoading(false);
    }
  };
  return (
    <div>
      <Button
        onClick={() => setShowFormInMobile(false)}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        back
      </Button>
      <form onSubmit={(e) => submit(e)}>
        <Grid container spacing={2} className="jobfrom-container">
          <Grid item xs={12} md={6}>
            <label className="form-label"> job Title</label>
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              fullWidth
              size="small"
              value={jobData.jobTitle}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  jobTitle: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className="form-label">Job Location</label>
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              fullWidth
              size="small"
              value={jobData.jobLocation}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  jobLocation: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="form-label">job Type</label>

            <Dropdown
              required={true}
              options={jobType}
              onChange={(data) => setJobData({ ...jobData, jobType: data })}
              value={jobData.jobType}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="form-label">years Of Experience</label>

            <Dropdown
              required={true}
              options={yearsOfExperience}
              onChange={(data) =>
                setJobData({ ...jobData, yearsOfExperience: data })
              }
              value={jobData.yearsOfExperience}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="form-label">salary</label>
            <Grid container columnSpacing={1}>
              <Grid item xs={4}>
                <Dropdown
                  required={true}
                  options={salaryCurrency}
                  onChange={(data) =>
                    setJobData({
                      ...jobData,
                      salary: {
                        ...jobData.salary,
                        currency: data,
                      },
                    })
                  }
                  value={jobData.salary.currency}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={jobData.salary.min}
                  onChange={(e) =>
                    setJobData({
                      ...jobData,
                      salary: {
                        ...jobData.salary,
                        min: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={jobData.salary.max}
                  onChange={(e) =>
                    setJobData({
                      ...jobData,
                      salary: {
                        ...jobData.salary,
                        max: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <label className="form-label">job Description</label>
            <TextField
              multiline
              minRows={4}
              id="outlined-basic"
              variant="outlined"
              fullWidth
              size="small"
              value={jobData.jobDescription}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  jobDescription: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="onboarding-label">skills</label>
            <SearchDropDown
              required={true}
              options={skills}
              onChange={(data) => handleSkills(data, "add")}
              values={jobData.skills}
              onDelete={(data) => handleSkills(data, "delete")}
            />
          </Grid>

          <Grid item xs={12} className="submit-btn">
            {loading ? (
              <button type="button">
                <CircularProgress />
              </button>
            ) : (
              <Button disabled={jobData.resume === ""} type="submit">
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Form;
