import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Loader from "./Loader";

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

const Ingredientsfilter = () => {
  let navigate = useNavigate();
  const { IngredientName = "Avocado" } = useParams();
  const [loading, setLoading] = useState(false);

  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientName}`;

  const [item, setItem] = useState([]);

  let imgUrl = `https://www.themealdb.com/images/ingredients/${IngredientName}.png`;

  const mystyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: "300px",
    objectFit: "fill",
    objectPosition: "1px 50%",
    animation: "mymove 10s",
  };

  useEffect(() => {
    setLoading(true);
    fetch(url).then((res) =>
      res.json().then((data) => {
        setItem(data.meals);
        setLoading(false);
      })
    );
  }, [url]);
  if (loading) return <Loader />;
  return (
    <div className="container-fluid">
      <Nav />
      <img className="imgRotate" style={mystyle} src={imgUrl} alt="" />
      <h1 style={{ color: "orange" }} className="text-center fw-bold">
        {toTitleCase(IngredientName)} Meals
      </h1>
      <div className="row row-cols-2 row-cols-md-6 g-1 justify-content-md-center">
        {!item ? (
          <h6>{IngredientName} Meals Not Found !!</h6>
        ) : (
          item.map((data, index) => (
            <div className="col" key={data.idMeal}>
              <div
                key={index}
                className="imgeffect card text-dark bg-white point"
                onClick={() => {
                  navigate(`/recipeinfo/${data.idMeal}`);
                }}
                title={"Click go to '" + data.strMeal + "' details"}
              >
                <img
                  className="image card-img-top"
                  key={index + 1}
                  src={data.strMealThumb + "/preview"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = data.strMealThumb;
                  }}
                  alt=""
                />
                <div className="card-img-overlay text-end">
                  <span className="card-title text-white fs-4 px-2" key={index + 2}>
                    {data.strMeal}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ingredientsfilter;
