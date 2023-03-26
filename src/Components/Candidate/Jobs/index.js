import React, { useContext, useEffect, useState } from "react";
import "./job.css";

import { db } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../../context/userContext";
import JobCard from "./JobCard";
import toastMessage from "../../../Util/toastMsg";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const CandidateJobs = () => {
  const [userData, dispatch] = useContext(UserContext);
  const [jobs, setJobs] = useState(null);

  const fetchAllJobs = async () => {
    // fetch all jobs from firebase
    try {
      const q = query(collection(db, "jobs"));

      const data = await getDocs(q);
      let j = [];
      data.forEach((doc) => {
        console.log(doc.data());
        j.push(doc.data());
      });
      setJobs(j);
    } catch (err) {
      console.log(err);
    }
  };
  const applyForJob = async (job) => {
    console.log(job);

    // create a doc which will contain the job details the candidate details and employer details
    // we will call this doc as application
    //if i have already applied for this job then i should not be able to apply again
    // -->algo for this
    // fetch all the applications from the database where the candidateId is equal to the current user id
    // if the jobId of the application is equal to the jobId of the job that i am trying to apply for then
    // i should not be able to apply for the job

    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", userData.user.email)
    );
    const data = await getDocs(q);
    let applications = [];
    data.forEach((doc) => {
      applications.push(doc.data());
    });
    let alreadyApplied = applications.find((application) => {
      return application.jobId === job.jobId;
    });
    if (alreadyApplied) {
      toastMessage("You have already applied for this job", "warning");
      return;
    }
    try {
      const applicationId = uuidv4();
      await setDoc(doc(db, "applications", applicationId), {
        applicationId,
        candidateId: userData.user.email,
        candidateName: userData.user.displayName,
        employerId: job.employerId,
        employerName: job.employerName,
        jobId: job.jobId,
        jobTitle: job.jobTitle,
        jobLocation: job.jobLocation,
        jobType: job.jobType,
        resume: userData.userInfo.resume,
        status: "applied",
        createdAt: new Date().toISOString(),
      });
      toastMessage("Applied for job successfully", "success");
    } catch (err) {
      console.log(err);
      toastMessage("Error while applying for job", "danger");
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return jobs && jobs.length === 0 ? (
    <div>no job</div>
  ) : jobs && jobs.length > 0 ? (
    <div>
      {" "}
      {jobs.map((job) => {
        return <JobCard applyForJob={applyForJob} key={job.jobId} job={job} />;
      })}
    </div>
  ) : (
    <div>loading</div>
  );
};

export default CandidateJobs;
