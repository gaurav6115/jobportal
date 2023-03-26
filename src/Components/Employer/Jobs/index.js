import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./jobs.css";

import Form from "./Form";
import Sidebar from "./Sidebar";

const EmployerJobs = () => {

  const [selectedJob, setSelectedJob] = useState(null);
  const [showFormInMobile, setShowFormInMobile] = useState(false);
  
  const postAjob = () => {
    setShowFormInMobile(true);
    setSelectedJob(null);
  };
  const selectedAjob = (job) => {
    setSelectedJob(job);
    setShowFormInMobile(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        sx={{
          display: { xs: showFormInMobile ? "none" : "block", md: "block" },
          background: "#fff",
        }}
        item
        xs={12}
        md={3}
      >
        <Sidebar
          postAjob={postAjob}
          selectedJob={selectedJob}
          selectedAjob={selectedAjob}
        />
      </Grid>
      <Grid
        sx={{
          display: { xs: showFormInMobile ? "block" : "none", md: "block" },
        }}
        item
        xs={12}
        md={9}
      >
        <Form
          selectedJob={selectedJob}
          setShowFormInMobile={setShowFormInMobile}
        />
      </Grid>
    </Grid>
  );
};

export default EmployerJobs;
