import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import AuthContext from "../../../store/auth-context";

type addToCartHandlerType = (amount: any) => void;
interface confirmEalItemType {
  price: any;
  id: any;
  name: any;
  image: any;
  description: any;
}
const MealItem: React.FC<confirmEalItemType> = (props) => {
  const cartCtx = useContext(AuthContext);

  const price: any = `$${props.price.toFixed(2)}`;
  const addToCartHandler: addToCartHandlerType = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      image: props.image,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <img src={props.image} alt="" className={classes.image}/>
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
