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
    <div className="row row-cols-3 justify-content-md-center">
      {!data
        ? "bulunamadı"
        : data.map((item, index) => {
            //const id =Math.floor(Math.random()*1000)
            return (
              <div key={item.idMeal} className="p-1">
                <div className="h-100 border border-light border-4 justify-content-md-center">
                  <div className="mealName">
                    <h1 className="" style={{ color: "orange" }}>
                      <span className="px-2 fw-bold" style={{}}>
                        {toTitleCase(item.strMeal)}
                      </span>
                    </h1>
                    <h4>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          navigate(`/area/${item.strArea}`);
                        }}
                      >
                        {item["strArea"]} Food
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => {
                          navigate(`/fg/${item.strCategory}`);
                        }}
                      >
                        {item["strCategory"]}
                      </button>
                    </h4>

                    {item.strTags ? (
                      <button type="button" className="btn btn-danger">
                        Tags: {item["strTags"]}
                      </button>
                    ) : (
                      <button type="button" className="btn btn-danger">
                        Tags: ???
                      </button>
                    )}
                  </div>

                  <div className="mealImg">
                    <img
                      onClick={() => {
                        navigate(`/recipeinfo/${item.idMeal}`);
                      }}
                      className="img-thumbnail p-0 m-0"
                      // src={item.strMealThumb + "/preview"}
                      src={item.strMealThumb}
                      onError={(e) => {
                        e.currentTarget.src = item.strMealThumb;
                      }}
                      alt=""
                    />
                  </div>

                  <div className="">
                    {Object.keys(item).map((items, ind) => {
                      if (items.substring(0, 6) === "strIng") {
                        return item[items] ? (
                          <span key={ind} className="btn btn-dark p-0">
                            <img
                              onClick={(ef) => {
                                navigate(`/ingredientsfilter/${item[items]}`);
                              }}
                              className="img-fluid"
                              src={ingredientURL + item[items] + "-small.png"}
                              alt=""
                              title={item[items]}
                            />
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
