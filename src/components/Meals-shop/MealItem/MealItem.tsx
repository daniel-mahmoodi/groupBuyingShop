import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import AuthContext from "../../../store/auth-context";

type addToCartHandlerType = (amount: any) => void;

const MealItem: React.FC = (props:any) => {
  const cartCtx = useContext(AuthContext);

  const price: any = `$${props.price.toFixed(2)}`;
  const addToCartHandler: addToCartHandlerType = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
