import React from "react";

const ShowDetails = props => {
  return (
    <div className="show">
      <h3>{props.fox.name}</h3>
      <img src={props.fox.img_url} alt={props.fox.name} />
    </div>
  );
};

export default ShowDetails;
