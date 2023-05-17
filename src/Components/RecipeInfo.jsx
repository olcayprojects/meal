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
        // console.log(Array(data));
        setLoading(false);
      });
  }, []);

  if (loading)
    return <Loader />;
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
                <img  key={item.idMeal}
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
              <h1 className="text-center">{item["strMeal"].toUpperCase()}</h1>
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
              <h3 className="text-center">INGREDIENTS</h3>
             
              <ol style={{listStyleType:"upper-roman"}} className="point" 
  
              >
                {(() => {
                  let li = [];
                  for (let i = 1; i <= 20; i++) {
                    if (item["strIngredient" + i]) {
                      li.push(
                        <li className="mx-4"
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
            <div className="instructions">
              <h3 className="text-center">INSTRUCTIONS</h3>
              <pre style={{fontSize:"16px"}} className="px-2 ">{item["strInstructions"]}</pre>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RecipeInfo;
