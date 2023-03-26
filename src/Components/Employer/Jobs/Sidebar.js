import React, { useEffect } from "react";
import { TextField } from "@mui/material";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebase";
import SideJobCard from "./SideJobCard";

const mockData = [
  {
    jobTitle: "Computer Engineer",
    jobLocation: "delhi",
    createdAt: "2021-09-10",
    jobType: "full time",
    jobId: "9099009",
  },
  {
    jobTitle: "Computer Engineer",
    jobLocation: "delhi",
    createdAt: "2021-09-10",
    jobType: "full time",
    jobId: "IOMI1",
  },
  {
    jobTitle: "Software Engineer",
    jobLocation: "delhi",
    createdAt: "2021-09-10",
    jobType: "full time",
    jobId: "MIO1",
  },
  {
    jobTitle: "UX/UI Designer",
    jobLocation: "delhi",
    createdAt: "2021-09-10",
    jobType: "full time",
    jobId: "19090",
  },
  {
    jobTitle: "SDE-5r",
    jobLocation: "delhi",
    createdAt: "2021-09-10",
    jobType: "full time",
    jobId: "901",
  },
  {
    jobTitle: "SDE-4",
    jobLocation: "delhi",
    createdAt: "2021-09-10",
    jobType: "full time",
    jobId: "190",
  },
  {
    jobTitle: "SDE-3",
    jobLocation: "delhi",
    createdAt: "2021-09-10",
    jobType: "full time",
    jobId: "4",
  },
  {
    jobTitle: "SDE-2",
    jobLocation: "delhi",
    createdAt: "2021-09-10",
    jobType: "full time",
    jobId: "3",
  },
  {
    jobTitle: "SDE",
    jobLocation: "delhi",
    createdAt: "2021-09-10",
    jobType: "full time",
    jobId: "2",
  },
];

const Sidebar = ({ postAjob, selectedJob, selectedAjob }) => {
  const [allJobs, setAllJobs] = React.useState(null);
  const [userData, dispatch] = React.useContext(UserContext);

  const fetchAllJobs = () => {
    const q = query(
      //collection ref
      collection(db, "jobs"),
      //condition
      where("employerId", "==", userData.user.email)
    );
    onSnapshot(q, (snapshot) => {
      let jobs = [];
      snapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      setAllJobs(jobs);
      console.log(jobs);
    });
  };
  useEffect(() => {
    fetchAllJobs();
  }, []);
  return (
    <div className="sidebar-container">
      <div onClick={postAjob} className="postbtn">
        <p>+ Post a job</p>
        <div>Post your requirements and hire candidates</div>
      </div>
      <div>
        <TextField
          sx={{
            fieldset: {
              borderRadius: "20px",
            },
          }}
          placeholder="Search Jobs"
          fullWidth
          size="small"
        />
      </div>
      <div>
        {allJobs && allJobs.length === 0 ? (
          <div>no job</div>
        ) : allJobs && allJobs.length > 0 ? (
          <div>
            {allJobs.map((data) => {
              return (
                <SideJobCard
                  selectedJob={selectedJob}
                  selectedAjob={selectedAjob}
                  key={data.jobId}
                  data={data}
                />
              );
            })}
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
