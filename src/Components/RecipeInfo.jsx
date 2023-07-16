import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Loader from "../Components/Loader";

let url = "";
let ingredientURL = "https://www.themealdb.com/images/ingredients/";

const RecipeInfo = () => {
  const [item, setItem] = useState();
  const { MealId } = useParams();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  //const { MealName } = useParams();
  let imageyemek = [];
  const mystyle = {
    // width: 1400,
  };

  url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`;

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.meals[0]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        navigate(`/recipeinfo/${52768}`);
        navigate(0);
      });
  }, []);

  if (loading) return <Loader />;
  return (
    <>
      {!item ? (
        ""
      ) : (
        <>
          <Nav />
          <div className="">
            {(() => {
              imageyemek.push(
                <img
                  key={item.idMeal}
                  className="img-thumbnail mx-auto d-block"
                  src={item.strMealThumb + ""}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = item.strMealThumb;
                  }}
                  alt=""
                  title={item.strMeal}
                />
              );
            })()}

            <div className="">
              <h1 className="text-center text-light border border-5 border-dark">
                <i
                  className="bi bi-arrow-left-square point"
                  onClick={() => {
                    navigate(`/recipeinfo/${--item.idMeal}`);
                    navigate(0);
                  }}
                ></i>
                {" " + item["strMeal"].toUpperCase() + " "}
                <i
                  className="bi bi-arrow-right-square point"
                  onClick={() => {
                    navigate(`/recipeinfo/${++item.idMeal}`);
                    navigate(0);
                  }}
                ></i>
              </h1>
              <div style={mystyle}>{imageyemek}</div>
            </div>
            <div key={item.idMeal} className="text-center">
              <h3>Area: {item.strArea} Food</h3>
              <h4>Category: {item.strCategory}</h4>
              {item.strTags ? (
                <h4>Tags: {item.strTags}</h4>
              ) : (
                <h4>Tags: ???</h4>
              )}
            </div>
          </div>
          <div className="recipe-details">
            <div className="ingredients">
              <ol className="list-group list-group-numbered fs-5">
                {(() => {
                  let li = [];
                  for (let i = 1; i <= 20; i++) {
                    if (item["strIngredient" + i]) {
                      li.push(
                        <li
                          className="point list-group-item list-group-item-action bg-black text-light border-dark border border-2"
                          key={item.idMeal + i}
                          onClick={(ef) => {
                            navigate(
                              `/ingredientsfilter/${ef.target.innerText
                                .split("=>")[0]
                                .trim()}`
                            );
                          }}
                        >
                          <img
                            src={
                              ingredientURL +
                              item["strIngredient" + i] +
                              "-Small.png"
                            }
                            alt=""
                            title={item["strIngredient" + i]}
                          />{" "}
                          {item["strIngredient" + i]} ={">"}{" "}
                          {item["strMeasure" + i]}
                        </li>
                      );
                    }
                  }

                  return li;
                })()}
              </ol>
            </div>
            <div className="instructions pt-3">
              <pre className="px-2 h5">{item["strInstructions"]}</pre>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RecipeInfo;
