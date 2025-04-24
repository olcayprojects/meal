import React from "react";
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from "./useIntersectionObserver"; // Hook'u buradan import ediyoruz

const Meallist = ({ item }) => {
  const visibleCards = useIntersectionObserver(); // Hook'u kullanıyoruz
  const navigate = useNavigate();
  const splitSmart = (text, maxLen = 40) => {
    const result = [];
    let i = 0;

    while (i < text.length) {
      let end = i + maxLen;

      if (end >= text.length) {
        result.push(text.slice(i).trim());
        break;
      }

      let slice = text.slice(i, end);
      let lastSpace = slice.lastIndexOf(" ");

      if (lastSpace === -1) {
        result.push(slice);
        i = end;
      } else {
        result.push(slice.slice(0, lastSpace));
        i += lastSpace + 1;
      }
    }

    return result;
  };

  return (
    <div className="flex flex-wrap  justify-center mt-1">
      {item && item.length > 0 ? (
        item.map((data) => (
          <div
            className="transform hover:scale-[1.04] transition-all duration-1000 bg-gray-900 mx-auto my-1 border-4 border-dashed border-orange-500"
            key={data.idMeal}
          >
            <div
              className={`point  ${
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
                className=""
                src={data.strMealThumb + "/Medium"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = data.strMealThumb; // Fallback to the original image if the medium size fails
                }}
                alt={data.strMeal}
              />
              <div className="text-center">
                <span className="text-yellow-500">
                  {splitSmart(data.strMeal, 40).map((chunk, index) => (
                    <div key={index}>{chunk}</div>
                  ))}
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
