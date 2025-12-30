import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Loader from "../Components/Loader";
import Ingredientlist from "./Ingredientlist";

let url = "";

const RecipeInfo = () => {
  const [item, setItem] = useState();
  const { MealId } = useParams();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  //const { MealName } = useParams();
  // const mystyle = {
  //    width: 1400,
  // };

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
            <div>
              <div className="d-flex fs-1 my-1 text-warning justify-content-center align-items-center">
                <i
                  className="bi bi-arrow-left-square-fill point mt-1"
                  onClick={() => {
                    navigate(`/recipeinfo/${--item.idMeal}`);
                    navigate(0);
                  }}
                ></i>
                <span
                  className="fw-bold px-1 py-0 lh-1 bg-warning text-dark"
                  style={{
                    border: "dashed",
                    borderColor: "dimgrey",
                    borderWidth: "4px",
                  }}
                >
                  {item["strMeal"].toUpperCase()}
                </span>
                <i
                  className="bi bi-arrow-right-square-fill point mt-1"
                  onClick={() => {
                    navigate(`/recipeinfo/${++item.idMeal}`);
                    navigate(0);
                  }}
                ></i>
              </div>

              <img
                key={item.idMeal}
                className="mx-auto border-4 border-dashed border-orange-500 d-block rounded"
                src={item.strMealThumb + "/large"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = item.strMealThumb;
                }}
                alt={item.strMeal}
                title={item.strMeal}
              />
              <div className="text-center mt-1">
                {item.strTags ? (
                  <span className="text-center text-black fw-bolder rounded-pill px-2 bg-warning fs-4">
                    {item.strTags.toUpperCase()}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              key={item.idMeal}
              style={{
                display: "inline-block",
                textAlign: "center",
                borderWidth: "2px",
                border: "dashed",
                borderColor: "orange",
              }}
              className="text-center bg-dark"
            >
              <span
                className="btn btn-outline-success lh-1 fs-4 fw-bold border-2"
                onClick={() => {
                  navigate(`/fg/${item.strCategory}`);
                }}
              >
                {item.strCategory} Meals
              </span>

              <span
                className="btn btn-outline-info lh-1 fs-4 fw-bold border-2"
                onClick={(e) => {
                  navigate(`/area/${item.strArea}`);
                }}
              >
                {item.strArea} Cuisine
              </span>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row d-flex justify-content-center p-1">
              <div
                className="IngredientList my-1  p-0 py-1"
                style={{
                  border: "dashed",
                  borderColor: "orange",
                  borderWidth: "5px",
                }}
              >
                <Ingredientlist item={item} />
              </div>
              <div
                className=" p-1 bg-dark ms-1"
                style={{
                  border: "dashed",
                  borderColor: "orange",
                  borderWidth: "5px",
                }}
              >
                <h4 className="text-center m-0">
                  <pre className="text-black fw-bolder bg-warning text-center p-0 m-0  fs-4">
                    Instructions
                  </pre>
                  <hr className="my-1 border-orange-500 border-4" />
                </h4>

                <pre className="text-warning bg-dark px-1 fs-5 lh-sm m-0 italic">
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
