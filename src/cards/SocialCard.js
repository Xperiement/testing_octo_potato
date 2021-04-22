import React from "react";

export default function SocialCard({
  logo,
  heading,
  subtext,
  expanded = false,
  color,
}) {
  return (
    <div className="socialCard">
      <div className="mContainer">
        <h1>{heading}</h1>
        <p>{subtext}</p>
        <div className="cardbtnContainer">
          <i className={`${logo} accM`}></i>
        </div>
      </div>
      <div className="lContainer">
        <i className={logo}></i>
      </div>
    </div>
  );
}
