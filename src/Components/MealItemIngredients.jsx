import React from "react";
import { useNavigate } from "react-router-dom";

export const MealItemIngredients = ({ item }) => {
  let navigate = useNavigate();
  let ingredientURL = "https://www.themealdb.com/images/ingredients/";

  return (
    <div className="">
      {Object.keys(item)
        .filter((key) => key.startsWith("strIng"))
        .map((key, ind) => {
          const ingredient = item[key];

          if (ingredient) {
            return (
              <span
                onClick={() => navigate(`/ingredientsfilter/${ingredient}`)}
                className="btn btn-outline-warning me-1 mb-1 p-0"
                key={key}
              >
                <img
                  className="img-fluid w-10 d-inline m-0"
                  src={`${ingredientURL}${ingredient}-Small.png`}
                  alt={ingredient}
                  title={`Click to go to '${ingredient.toUpperCase()}' integrated meals.`}
                />
                <span className="text-warning-emphasis px-1 m-0 fw-bold fs-5">
                  {ingredient.toUpperCase()}
                </span>
              </span>
            );
          }
          return null;
        })}
    </div>
  );
};
