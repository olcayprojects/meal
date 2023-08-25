import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Loader from "../Components/Loader";

function MyCarousel() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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
                className="d-block w-100"
                // src={image1.src}
                src={image1.src + "/preview"}
                onError={(e) => {
                  e.currentTarget.src = image1.src;
                }}
                alt={image1.strMeal}
              />
              <Carousel.Caption>
                <h1 className="fw-bold rounded-pill border border-3 border-info"
                  style={{ color: "orange", background: "rgba(0, 0, 0, 0.3)" }}
                >
                  {image1.strMeal}
                </h1>
                <p style={{ color: "white" }}>{image1.idMeal}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        )}
      </Carousel>
    );
  }
}

export default MyCarousel;
