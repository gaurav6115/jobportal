import React from "react";
import Cards from "../Common/Cards";
import './Landingpage.css';

import marketingLogo from "./../../Assects/marketingLogo.png";
import designLogo from "./../../Assects/designLogo.png";
import hrdLogo from "./../../Assects/hrdLogo.png";
import financeLogo from "./../../Assects/financeLogo.png";
import govJobLogo from "./../../Assects/govJobLogo.png";
import bussConLogo from "./../../Assects/bussConLogo.png";
import customerCareLogo from "./../../Assects/customerCareLogo.png";
import projectManagLogo from "./../../Assects/projectManagLogo.png";

const Oneplatform = () => {
  const data = [
    {
      title: "Marketing & Communication",
      subtitle: "237 Jobs Available",
      icon: marketingLogo,
    },
    {
      title: "Design & Development",
      subtitle: "237 Jobs Available",
      icon: designLogo,
    },
    {
      title: "Human Research & Development",
      subtitle: "237 Jobs Available",
      icon: hrdLogo,
    },
    {
      title: "Finance Management",
      subtitle: "237 Jobs Available",
      icon: financeLogo,
    },
    {
      title: "Government Jobs",
      subtitle: "237 Jobs Available",
      icon: govJobLogo,
    },
    {
      title: "Business & Consulting",
      subtitle: "237 Jobs Available",
      icon: bussConLogo,
    },
    {
      title: "Customer Support Care",
      subtitle: "237 Jobs Available",
      icon: customerCareLogo,
    },
    {
      title: "Project Management",
      subtitle: "237 Jobs Available",
      icon: projectManagLogo,
    },
  ];
  return (
    <div className="onePlatformContainer">
      <h1>
        One Platform Many <span>Solutions</span>
      </h1>
      <div className="allCards">
        {data.map((item, index) => {
          return (
            <Cards
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Oneplatform;
