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
    <div className="row row-cols-1 row-cols-md-3 justify-content-md-center">
      {!data
        ? "bulunamadı"
        : data.map((item, index) => {
            //const id =Math.floor(Math.random()*1000)
            return (
              <div key={item.idMeal} className="p-1">
                <div className="h-100 border border-light border-4 justify-content-md-center">
                  <div className="mealImg">
                    <img
                      onClick={() => {
                        navigate(`/recipeinfo/${item.idMeal}`);
                      }}
                      className="img-thumbnail  p-0 m-0 mb-2"
                      // src={item.strMealThumb + "/preview"}
                      src={item.strMealThumb}
                      onError={(e) => {
                        e.currentTarget.src = item.strMealThumb;
                      }}
                      alt="aa"
                      title={
                        "Click go to '" +
                        item.strMeal.toUpperCase() +
                        "' details"
                      }
                    />
                  </div>
                  <div className="mealName">
                    <h1 className="" style={{ color: "orange" }}>
                      <span className="px-2 fw-bold" style={{}}>
                        {toTitleCase(item.strMeal)}
                      </span>
                    </h1>
                    <div className="my-2">
                      <button
                        type="button"
                        className="btn btn-outline-success me-1 fw-bold fs-5"
                        onClick={() => {
                          navigate(`/area/${item.strArea}`);
                        }}
                      >
                        {item["strArea"]} Cuisine
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-warning fw-bold fs-5"
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
                          className="fs-5 badge rounded-pill bg-info text-black my-2"
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
                            className="btn btn-dark me-1 mb-1 p-0"
                          >
                            <img
                              className="img-fluid"
                              src={ingredientURL + item[items] + "-small.png"}
                              alt=""
                              title={
                                "Click go to '" +
                                item[items].toUpperCase() +
                                "' integrated meals."
                              }
                            />
                            <h6 className="text-secondary">{item[items]}</h6>
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
