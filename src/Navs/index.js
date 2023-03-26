import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Topbar from "../Components/Common/Topbar";

import Landingpage from "../Components/Landingpage";
import Auth from "../Components/Auth";

import CandidateJobs from "../Components/Candidate/Jobs";
import CandidateProfile from "../Components/Candidate/Profile";
import CandidateOnboarding from "../Components/Candidate/Onboarding";
import CandidateApplications from "../Components/Candidate/Applications";
import CandidateConversation from "../Components/Candidate/Conversation";

import EmployerJobs from "../Components/Employer/Jobs";
import EmployerProfile from "../Components/Employer/Profile";
import EmployerOnboarding from "../Components/Employer/Onboarding";
import EmployerApplications from "../Components/Employer/Applicants";
import EmployerConversation from "../Components/Employer/Conversation";

const Navs = () => {
  const CandidateProtected = () => {
    const pages = [
      {
        title: "Jobs",
        path: "/candidate/jobs",
      },
      {
        title: "Profile",
        path: "/candidate/profile",
      },
      {
        title: "Applications",
        path: "/candidate/applications",
      },
      {
        title: "Conversation",
        path: "/candidate/conversation",
      },
    ];
    return (
      <div>
        <Topbar pages={pages} />
        <div style={{ marginBottom: "100px" }}> </div>
        <Outlet />
      </div>
    );
  };

  const EmployerProtected = () => {
    const pages = [
      {
        title: "Jobs",
        path: "/employer/jobs",
      },
      {
        title: "Profile",
        path: "/employer/profile",
      },
      {
        title: "Applicants",
        path: "/employer/applicants",
      },
      {
        title: "Conversation",
        path: "/employer/conversation",
      },
    ];
    return (
      <div>
        <Topbar pages={pages} />
        <div style={{ marginBottom: "100px" }}></div>
        <Outlet />
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/employer/auth" element={<Auth userType={"employer"} />} />

        <Route
          path="/candidate/auth"
          element={<Auth userType={"candidate"} />}
        />
        <Route path="/candidate/onboarding" element={<CandidateOnboarding />} />

        <Route element={<CandidateProtected />}>
          <Route path="/candidate/jobs" element={<CandidateJobs />} />
          <Route path="/candidate/profile" element={<CandidateProfile />} />

          <Route
            path="/candidate/applications"
            element={<CandidateApplications />}
          />
          <Route
            path="/candidate/conversation"
            element={<CandidateConversation />}
          />
        </Route>

        <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
        <Route element={<EmployerProtected />}>
          <Route path="/employer/jobs" element={<EmployerJobs />} />
          <Route path="/employer/profile" element={<EmployerProfile />} />
          <Route
            path="/employer/applicants"
            element={<EmployerApplications />}
          />
          <Route
            path="/employer/conversation"
            element={<EmployerConversation />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navs;
