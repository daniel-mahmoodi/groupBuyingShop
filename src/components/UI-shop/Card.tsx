import React from "react";
import classes from "./Card.module.css";

const Card: React.FC = (props: any) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
