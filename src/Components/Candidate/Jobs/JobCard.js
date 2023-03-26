import React from "react";
import { Button, Grid } from "@mui/material";
import moment from "moment";

const JobCard = ({ job,applyForJob }) => {
  const {
    company_logo,
    createdAt,
    employerName,
    jobId,
    jobLocation,
    jobTitle,
    jobType,
    salary,
    yearsOfExperience,
    company_tag = "hello",
    company_size = "100-500",
  } = job;
  return (
    <div className="job-card-container">
      <Grid
      marginTop={1}
      marginBottom={1}
      container rowSpacing={1}>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          item
          xs={3}
          md={2}
        >
          <img width="100%" src={company_logo} alt="company logo" />
        </Grid>
        <Grid
          className="job-card-container_title"
          sx={{ textAlign: "left" }}
          item
          xs={8}
          md={10}
        >
          <h2>{employerName}</h2>
          <h5>{company_tag}</h5>
          <h6>{company_size}</h6>
        </Grid>
      </Grid>
      <Grid className="job-card-container_details" container>
        <Grid className="job-card-container_details_title" item xs={7} md={3}>
          {jobTitle}
        </Grid>
        <Grid
          className="job-card-container_details_location"
          item
          xs={5}
          md={2}
        >
          {jobLocation}
        </Grid>
        <Grid
          className="job-card-container_details_location"
          item
          xs={8}
          md={3}
        >
          {salary.currency} {salary.min} - {salary.max}
        </Grid>
        <Grid className="job-card-container_details_time" item xs={4} md={2}>
          {moment(createdAt).startOf("hour").fromNow()}
        </Grid>
        <Grid item xs={12} md={2}>
          <button 
          onClick={()=>applyForJob(job)}
          className="apply-btn">Apply</button>
        </Grid>
      </Grid>
    </div>
  );
}

export default JobCard;
