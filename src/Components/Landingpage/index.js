import React from "react";

import Topbar from "../Common/Topbar";
import Rightjob from "./Rightjob";
import Oneplatform from "./Oneplatform";

import Img from "../../Assects/img1.png";

// import Allcandidate from "./Allcandidate";
// import Footer from "./Footer";

const Landingpage = () => {
  const pages = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Find Jobs",
      path: "/candidate/auth",
    },
    {
      title: "Find Candidates",
      path: "/employer/auth",
    },
  ];
  return (
    <div>
      <Topbar pages={pages} />
      <Rightjob />
      <Oneplatform />
      {/* <img src={Img} className="img1" /> */}
      {/* <Allcandidate />
      <Footer /> */}
    </div>
  );
};

export default Landingpage;
