import { useNavigate } from "react-router-dom";
import React from "react";

let ingredientURL = "https://www.themealdb.com/images/ingredients/";

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
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center">
      {!data
        ? "bulunamadı"
        : data.map((item, index) => {
            //const id =Math.floor(Math.random()*1000)
            return (
              <div key={item.idMeal} className="p-1">
                <div className="h-100 border border-warning border-1 bg-dark bg-opacity-50">
                  <div className="mealImg">
                    <img
                      onClick={() => {
                        navigate(`/recipeinfo/${item.idMeal}`);
                      }}
                      className="img-thumbnail p-1 m-0 mb-2"
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
                    <h2 className="" style={{}}>
                      <span
                        className="px-3 border border-dark border-4 fw-bold bg-warning text-dark rounded-4"
                        style={{}}
                      >
                        {toTitleCase(item.strMeal)}
                      </span>
                    </h2>
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

                  <div className="">
                    {Object.keys(item).map((items, ind) => {
                      if (items.substring(0, 6) === "strIng") {
                        return item[items] ? (
                          <span
                            onClick={(ef) => {
                              navigate(`/ingredientsfilter/${item[items]}`);
                            }}
                            key={ind}
                            className="btn btn-dark me-1 mb-1 p-0 border border-warning"
                          >
                            <img
                              className="img-fluid"
                              src={ingredientURL + item[items] + "-small.png"}
                              alt={item[items]}
                              title={
                                "Click go to '" +
                                item[items].toUpperCase() +
                                "' integrated meals."
                              }
                            />
                            <h6 className="text-warning bg-black p-1 m-0 border border-light">
                              {item[items].toUpperCase()}
                            </h6>
                          </span>
                        ) : (
                          ""
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default MealItem2;
