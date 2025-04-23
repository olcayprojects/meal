import React from "react";
import { useNavigate } from "react-router-dom";

export const MealItemIngredients = ({ item }) => {
  let navigate = useNavigate();
  let ingredientURL = "https://www.themealdb.com/images/ingredients/";

  return (
    <div className="grid grid-cols-4 px-1">
      {Object.keys(item)
        .filter((key) => key.startsWith("strIng"))
        .map((key, ind) => {
          const ingredient = item[key];

          if (ingredient) {
            return (
              <span
                onClick={() => navigate(`/ingredientsfilter/${ingredient}`)}
                className="btn btn-outline-warning p-0"
                key={key}
              >
                <img
                  className="img-fluid w-12 d-inline m-0"
                  src={`${ingredientURL}${ingredient}-Small.png`}
                  alt={ingredient}
                  title={`Click to go to '${ingredient.toUpperCase()}' integrated meals.`}
                />
                <h6 className="tracking-tight px-1 m-0">{ingredient}</h6>
              </span>
            );
          }
          return null;
        })}
    </div>
  );
};
