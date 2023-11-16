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
            <div className="">
              <h1 className="text-center mt-1 text-light">
                <i
                  className="bi bi-arrow-left-square-fill point"
                  onClick={() => {
                    navigate(`/recipeinfo/${--item.idMeal}`);
                    navigate(0);
                  }}
                ></i>
                <span
                  className="fw-bold px-2"
                  style={{ color: "orange", backgroundColor: "" }}
                >
                  {item["strMeal"].toUpperCase()}
                </span>
                <i
                  className="bi bi-arrow-right-square-fill point"
                  onClick={() => {
                    navigate(`/recipeinfo/${++item.idMeal}`);
                    navigate(0);
                  }}
                ></i>
              </h1>
              <img
                key={item.idMeal}
                className="img img-fluid mx-auto d-block"
                src={item.strMealThumb + ""}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = item.strMealThumb;
                }}
                alt=""
                title={item.strMeal}
              />
              <div className="text-center mt-1">
                {item?.strTags?.split(",").map((items, i) => {
                  return (
                    <h5 key={i} className="badge fs-5 bg-light text-black me-1">
                      {items}
                    </h5>
                  );
                })}
              </div>
            </div>
          </div>
          <div key={item.idMeal} style={{}} className="text-center m-1">
            <span
              className="btn btn-outline-success fs-4 fw-bold me-2"
              onClick={() => {
                navigate(`/fg/${item.strCategory}`);
              }}
            >
              {item.strCategory} Meals
            </span>

            <span
              className="btn btn-outline-info fs-4 fw-bold me-2"
              onClick={(e) => {
                navigate(`/area/${item.strArea}`);
              }}
            >
              {item.strArea} Cuisine
            </span>
          </div>

          <div className="container-fluid p-1">
            <div className="row m-1">
              <div
                className="col-auto py-2 me-2"
                style={{ border: "dashed", borderColor: "orange" }}
              >
                <ol className="list-group list-group-numbered fs-5">
                  {Object.keys(item).map((items, index) => {
                    return item["strIngredient" + index] ? (
                      <li
                        id={item["strIngredient" + index]}
                        key={index}
                        onClick={(ef) => {
                          navigate(
                            `/ingredientsfilter/${
                              item["strIngredient" + index]
                            }`
                          );
                        }}
                        title={
                          "Click go to " +
                          item["strIngredient" + index] +
                          " meals"
                        }
                        className="point list-group-item list-group-item-action bg-black text-light border-dark border border-2 p-1"
                      >
                        <span className="">{item["strMeasure" + index]}</span>
                        <img
                          className="img-fluid"
                          style={{ width: "10%" }}
                          src={
                            ingredientURL +
                            item["strIngredient" + index] +
                            "-Small.png"
                          }
                          alt=""
                          title=""
                        />
                        <span className="">
                          {item["strIngredient" + index]}
                        </span>
                      </li>
                    ) : (
                      ""
                    );
                  })}
                </ol>
              </div>
              <div
                className="col pt-2"
                style={{ border: "dashed", borderColor: "orange" }}
              >
                <pre className="text-light p-2 fs-5">
                  {item?.strInstructions}
                </pre>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RecipeInfo;
