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
  }, [navigate]);

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
                  className="img img-thumbnail mx-auto d-block"
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
                  className="bi bi-arrow-left-square-fill point"
                  onClick={() => {
                    navigate(`/recipeinfo/${--item.idMeal}`);
                    navigate(0);
                  }}
                ></i>
                <span className="fw-bold mx-2 px-2"
                style={{color:"cyan",backgroundColor:"darkcyan"}}
                >{item["strMeal"].toUpperCase()}</span>
                <i
                  className="bi bi-arrow-right-square-fill point"
                  onClick={() => {
                    navigate(`/recipeinfo/${++item.idMeal}`);
                    navigate(0);
                  }}
                ></i>
              </h1>
              <div style={{}}>{imageyemek}</div>
            </div>
          </div>
          <div key={item.idMeal} style={{}} className="text-center m-1">
            <h3 style={{color:"darkcyan"}}>
              <span className="fw-bold">Category: </span> {item.strCategory}
            </h3>
            <h3 style={{color:"darkseagreen"}}>
              <span className="fw-bold">Area: </span>
              {item.strArea} Food
            </h3>
            <h4 className="text-center">
              <span className="fw-bold" style={{color:"greenyellow"}}>Tags:</span>
              {item?.strTags
                ? item?.strTags.split(",").map((items) => {
                    return (
                      <span className="border border-warning p-1 border-3 mx-2"
                      style={{backgroundColor:"darkcyan",color:"orange"}}
                      >
                        {items}
                      </span>
                    );
                  })
                : ""}
            </h4>
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
                          id={item["strIngredient" + i]}
                          className="point list-group-item list-group-item-action bg-black text-light border-dark border border-2"
                          key={item.idMeal + i}
                          onClick={(ef) => {
                            console.log(ef);
                            navigate(`/ingredientsfilter/${ef.target.id}`);
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
                          {item["strMeasure" + i] +
                            " " +
                            item["strIngredient" + i]}
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
