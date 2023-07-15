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
                  <h1>{toTitleCase(item.strMeal)}</h1>
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
                  style={{ gridTemplateColumns: "2fr 4fr 2fr" }}
                  onClick={() => {
                    navigate(`/recipeinfo/${item.idMeal}`);
                  }}
                >
                  <div className="Innstructions">
                    <div className="malzemePng2">
                      {(() => {
                        let p = [];
                        for (let i = 1; i <= 20; i++) {
                          if (item["strIngredient" + i]) {
                            p.push(
                              <p
                                style={{ textAlign: "center" }}
                                key={Math.random(0, 1)}
                              >
                                <img
                                  style={{ width: "20%", height: "auto" }}
                                  className="malzemeimg "
                                  src={
                                    ingredientURL +
                                    item["strIngredient" + i] +
                                    "-small.png"
                                  }
                                  alt=""
                                  title={item["strIngredient" + i]}
                                />
                              </p>
                            );
                          }
                        }

                        var filtered = p.filter(function (el) {
                          //  console.log(el);
                          return el !== [];
                        });
                        // console.log(filtered);
                        return filtered;
                      })()}
                    </div>
                  </div>

                  <div className="yemekresim">
                    <img
                      className="img-thumbnail"
                      src={item.strMealThumb + "/preview"}
                      onError={(e) => {
                        e.currentTarget.src = item.strMealThumb;
                      }}
                      alt=""
                    />
                  </div>

                  <div className="Innstructions">
                    <div className="malzemePng2 ">
                      {(() => {
                        let p = [];
                        for (let i = 1; i <= 20; i++) {
                          if (item["strIngredient" + i]) {
                            p.push(
                              <p
                                style={{ textAlign: "center" }}
                                key={Math.random(1, 2)}
                              >
                                <img
                                  style={{ width: "20%", height: "auto" }}
                                  className="malzemeimg "
                                  src={
                                    ingredientURL +
                                    item["strIngredient" + i] +
                                    "-small.png"
                                  }
                                  alt=""
                                  title={item["strIngredient" + i]}
                                />
                              </p>
                            );
                          }
                        }

                        var filtered = p.filter(function (el) {
                          //  console.log(el);
                          return el !== [];
                        });
                        // console.log(filtered);
                        return filtered;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};

export default MealItem2;
