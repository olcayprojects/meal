import { useNavigate } from "react-router-dom";
import React from "react";
import { MealItemIngredients } from "./MealItemIngredients";

function toTitleCase(str) {
  const titleCase = str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return titleCase;
}

const MealItem2 = ({ data }) => {
  let navigate = useNavigate();

  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 justify-content-center">
      {!data
        ? "bulunamadı"
        : data.map((item, index) => {
            //const id =Math.floor(Math.random()*1000)
            return (
              <div key={item.idMeal} className="p-1">
                <div
                  className="h-100 bg-dark bg-opacity-75
                "
                  style={{
                    border: "dashed",
                    borderColor: "orange",
                    borderWidth: "5px",
                  }}
                >
                  <div className="mealImg">
                    <img
                      onClick={() => {
                        navigate(`/recipeinfo/${item.idMeal}`);
                      }}
                      className="img-fluid p-0 m-0 mb-2"
                      // src={item.strMealThumb + "/preview"}
                      src={item.strMealThumb}
                      onError={(e) => {
                        e.currentTarget.src = item.strMealThumb;
                      }}
                      alt={item.strMeal}
                      title={
                        "Click go to '" +
                        item.strMeal.toUpperCase() +
                        "' details"
                      }
                    />
                  </div>
                  <div className="mealName">
                    <span
                      className="px-2 fs-3 border border-dark border-4 fw-bold bg-warning text-dark rounded-4"
                      style={{}}
                    >
                      {toTitleCase(item.strMeal)}
                    </span>
                    <div className="my-2">
                      <button
                        type="button"
                        className="btn btn-outline-success me-1 fw-bold border-2"
                        onClick={() => {
                          navigate(`/area/${item.strArea}`);
                        }}
                      >
                        {item["strArea"]} Cuisine
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary fw-bold border-3"
                        onClick={() => {
                          navigate(`/fg/${item.strCategory}`);
                        }}
                      >
                        {item["strCategory"]} Meals
                      </button>
                    </div>

                    {item["strTags"]?.split(",").map((itemtag, i) => {
                      return (
                        <span
                          key={i}
                          className="fs-5 badge rounded-pill bg-info text-black mb-2 mx-1"
                        >
                          {itemtag}
                        </span>
                      );
                    })}
                  </div>
                  <MealItemIngredients key={item.idMeal} item={item} />
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default MealItem2;
