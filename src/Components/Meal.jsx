import React, { useEffect, useState } from "react";
import MealItem2 from "./MealItem2";
import RecipeIndex from "./RecipeIndex";
import Nav from "./Nav";
import MyCarousel from "./Carousel";
import Loader from "../Components/Loader";

const Meal = () => {
  const [url, setUrl] = useState(
    "https://www.themealdb.com/api/json/v1/1/search.php?f=p"
  );
  //const [url,setUrl]=useState("http://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata");
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch(url).then((res) =>
      res.json().then((data) => {
        setLoading(false);
        setItem(data.meals);
        setShow(true);
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
    <div className="container-fluid">
    
      <div className="main">
        <Nav />

        <div className="heading">
          <MyCarousel />
       
        </div>
        <div className="indexContainer">
          <RecipeIndex alphaIndex={(alpa) => setIndex(alpa)} />
        </div>
        <br />
        <div className="input-group input-group-lg">
          <div className="input-group-prepend"></div>

          <input
            type="search"
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={searchRecipe}
            placeholder="You can search your favorite meals"
          />
        </div>
        <div className="container2">
          {show ? <MealItem2 data={item}/> : "Not Found!"}
        </div>
      </div>
    </div>
  );
};

export default Meal;
