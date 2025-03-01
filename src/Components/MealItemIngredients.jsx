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
                  style={{ width: "50px" }}
                  className="img-fluid"
                  src={`${ingredientURL}${ingredient}-small.png`}
                  alt={ingredient}
                  title={`Click to go to '${ingredient.toUpperCase()}' integrated meals.`}
                />
                <h6
                  className="text-warning-emphasis px-1 m-0 fw-bold fs-5"
                  style={{
                    borderStyle: "dotted",
                    borderWidth: "2px",
                    borderColor: "orange",
                  }}
                >
                  {ingredient.toUpperCase()}
                </h6>
              </span>
            );
          }
          return null;
        })}
    </div>
  );
};
