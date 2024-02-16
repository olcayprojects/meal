import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Loader from "./Loader";
import { IngredientsInfo } from "./Ingredients";
import Meallist from "./Meallist";

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
      <img
        className="imgRotate imgeffect"
        style={mystyle}
        src={imgUrl}
        alt={IngredientName}
      />
      <h1 style={{ color: "orange" }} className="text-center fw-bold">
        {toTitleCase(IngredientName)} Recipes
      </h1>
      <IngredientsInfo iName={IngredientName} />
      <Meallist item={item} />
    </div>
  );
};

export default Ingredientsfilter;
