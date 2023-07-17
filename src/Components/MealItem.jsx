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
    <>
      {!data
        ? "bulunamadı"
        : data.map((item, index) => {
            //const id =Math.floor(Math.random()*1000)
            return (
              <div key={item.idMeal}>
                <img
                  src={require("../images/separator.jpg")}
                  style={{ width: "100%", objectFit: "contain" }}
                  alt="separator"
                />
                <div className="mealName">
                  <h1 className="bg-dark ">{toTitleCase(item.strMeal)}</h1>
                  <h4>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        navigate(`/area/${item.strArea}`);
                      }}
                    >
                      {" "}
                      {item["strArea"]} Food
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        navigate(`/fg/${item.strCategory}`);
                      }}
                    >
                      {" "}
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

                <div
                  className="container"
                  style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
                  onClick={() => {
                    navigate(`/recipeinfo/${item.idMeal}`);
                  }}
                >
                  <div className="malzemePng">
                    {Object.keys(item).map((items, ind) => {
                      if (items.substring(0, 6) === "strIng") {
                        return item[items] ? (
                          <pre key={ind}>
                            <img
                              style={{ width: "20%", height: "auto" }}
                              className="malzemeimg "
                              src={ingredientURL + item[items] + "-small.png"}
                              alt=""
                              title={item[items]}
                            />
                          </pre>
                        ) : (
                          ""
                        );
                      }
                    })}
                  </div>

                  <div className="mealImg">
                    <img
                      className="img-thumbnail"
                      src={item.strMealThumb + "/preview"}
                      onError={(e) => {
                        e.currentTarget.src = item.strMealThumb;
                      }}
                      alt=""
                    />
                  </div>

                  <div className="malzemePng">
                    {Object.keys(item).map((items, ind) => {
                      if (items.substring(0, 6) === "strIng") {
                        return item[items] ? (
                          <pre key={ind}>
                            <img
                              style={{ width: "20%", height: "auto" }}
                              className="malzemeimg "
                              src={ingredientURL + item[items] + "-small.png"}
                              alt=""
                              title={item[items]}
                            />
                          </pre>
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
    </>
  );
};

export default MealItem2;
