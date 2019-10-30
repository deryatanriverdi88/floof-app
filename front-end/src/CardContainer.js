import React from "react";
import Card from "./Card";

const CardContainer = (props) => {
  // console.log(props.foxes)
  return <div className="card-container">
    {props.foxes.map((fox => {
      return <Card handleShowClick={props.handleShowClick} fox={fox} key={fox.id} />
    }))}
  </div>;
};

export default CardContainer;
