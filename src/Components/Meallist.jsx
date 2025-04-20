import React from "react";
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from "./useIntersectionObserver"; // Hook'u buradan import ediyoruz

const Meallist = ({ item }) => {
  const visibleCards = useIntersectionObserver(); // Hook'u kullanıyoruz
  const navigate = useNavigate();

  return (
    <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-1 justify-content-center">
      {item && item.length > 0 ? (
        item.map((data) => (
          <div className="col py-2" key={data.idMeal}>
            <div
              className={`card text-dark bg-black point transform hover:scale-[1.04] transition-all duration-200 ${
                visibleCards.includes(
                  document.querySelector(`#cardS-${data.idMeal}`)
                )
                  ? "visible"
                  : ""
              }`}
              id={`cardS-${data.idMeal}`}
              onClick={() => {
                navigate(`/recipeinfo/${data.idMeal}`);
              }}
              title={`Click to go to '${data.strMeal}' details`}
            >
              <img
                className="border-4 border-dashed border-orange-500"
                src={data.strMealThumb + "/Medium"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = data.strMealThumb; // Fallback to the original image if the medium size fails
                }}
                alt={data.strMeal}
              />
              <div className="card-img-overlay text-center self-end">
                <span className="text-yellow-500 text-2xl px-3 rounded-full bg-black/50">
                  {data.strMeal}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h6>Meals Not Found !!</h6>
      )}
    </div>
  );
};

export default Meallist;
