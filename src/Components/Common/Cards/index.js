import React from "react";

const Cards = ({ title, subtitle, icon }) => {
  return (
    <div className="cardContainer">
      <div className="cardIcon">
        <img src={icon} />
      </div>
      <div className="cardContent">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Cards;
