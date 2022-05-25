import React from "react";
import classes from "./Card.module.css";

const Card: React.FC<{ children: any }> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
