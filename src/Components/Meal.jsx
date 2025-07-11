import React, { useEffect, useState } from "react";
import MealItem2 from "./MealItem";
import RecipeIndex from "./RecipeIndex";
import Nav from "./Nav";
import MyCarousel from "./Carousel";
import Loader from "../Components/Loader";

const Meal = () => {
  const alphabet = "abcdefghjklmnprstvw";
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];

  const [url, setUrl] = useState(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${randomCharacter}`
  );

  //const [url,setUrl]=useState("http://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata");
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url).then((res) =>
      res
        .json()
        .then((data) => {
          setLoading(false);
          setItem(data.meals);
          setShow(true);
        })
        .catch((error) => {
          // console.log(error);
        })
    );
  }, [url]);

  const setIndex = (alpha) => {
    setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`);
  };

  const searchRecipe = (evt) => {
    if (evt.key === "Enter") {
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="container-fluid p-0">
      <div className="main">
        <Nav />

        <div className="heading mt-2">
          <MyCarousel />
        </div>
        <div className="flex justify-center">
          <RecipeIndex alphaIndex={(alpa) => setIndex(alpa)} />
        </div>
        <div className="input-group input-group-lg">
          <div className="input-group-prepend"></div>
          <input
            type="search"
            className="form-control bg-warning-subtle fw-bold fs-4 p-0 text-center"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={searchRecipe}
            placeholder="Type your favorite MEAL and press 'ENTER'"
          />
        </div>
        <div className="">
          {show ? <MealItem2 data={item} /> : "Not Found!"}
        </div>
      </div>
    </div>
  );
};

export default Meal;
