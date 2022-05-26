import React, { useEffect, useState } from "react";

import Card from "../UI-shop/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { type } from "os";

const AvailableMeals: React.FC = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      console.log('fetch');
      const response = await fetch(
        'https://fakestoreapi.com/products'
      );

      if (!response.ok) {
        console.log("wrong response is not ok");
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
console.log('responseData',responseData);
      const loadedMeals: any = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].title,
          image: responseData[key].image,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    console.log("error");
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  type Props = {
    id: any;
    name: any;
    image: any;
    description: any;
    price: any;
  };
  const mealsList = meals.map((meal: Props) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      image={meal.image}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
