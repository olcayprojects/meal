import { useNavigate } from "react-router-dom";
import React from "react";
import { MealItemIngredients } from "./MealItemIngredients";
import useIntersectionObserver from "./useIntersectionObserver"; // Hook'u buradan import ediyoruz

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
  const visibleCards = useIntersectionObserver(); // Hook'u kullanıyoruz

  let navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {!data
        ? "bulunamadı"
        : data.map((item, index) => {
            //const id =Math.floor(Math.random()*1000)
            return (
              <div key={item.idMeal} className="m-1">
                <div
                  className={`h-100 bg-dark bg-opacity-75 cardS ${
                    visibleCards.includes(
                      document.querySelector(`#cardS-${item.idMeal}`)
                    )
                      ? "visible"
                      : ""
                  }`}
                  style={{
                    border: "dashed",
                    borderColor: "orange",
                    borderWidth: "5px",
                  }}
                  id={`cardS-${item.idMeal}`}
                >
                  <div className="mealImg overflow-hidden">
                    <img
                      onClick={() => {
                        navigate(`/recipeinfo/${item.idMeal}`);
                      }}
                      className="card-img-top transform hover:scale-[1.9] transition-all duration-1000"
                      // src={item.strMealThumb + "/preview"}
                      src={item.strMealThumb + "/medium"}
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
                      className="px-2 fs-3 border-dark border-4 fw-bold bg-warning text-dark rounded-4"
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
