import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";

function MyCarousel() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  let navigate = useNavigate();

  let randomCategories = [
    "Beef",
    "Chicken",
    "Miscellaneous",
    "Dessert",
    "Lamb",
    "Pasta",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
    "Breakfast",
  ];

  let url =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
    randomCategories[Math.floor(Math.random() * randomCategories.length)];
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.meals);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const images = [
    items.map((item) => {
      return {
        src: item.strMealThumb,
        strMeal: item.strMeal,
        idMeal: item.idMeal,
      };
    }),
  ];

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <Carousel fade={true} interval={1000}>
        {images.map((image) =>
          image.map((image1) => (
            <Carousel.Item key={image1.idMeal}>
              <img
                className="d-block w-100 point"
                onClick={() => {
                  navigate(`/recipeinfo/${image1.idMeal}`);
                }}
                src={image1.src}
                // src={image1.src + "/preview"}
                onError={(e) => {
                  e.currentTarget.src = image1.src;
                }}
                alt={image1.strMeal}
              />
              <Carousel.Caption>
                <h1
                  className="fw-bold rounded-pill border border-2 border-warning"
                  style={{
                    color: "greenyellow",
                    background: "rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {image1.strMeal.toUpperCase()}
                </h1>
                <span className="text-warning">{image1.idMeal}</span>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        )}
      </Carousel>
    );
  }
}

export default MyCarousel;
