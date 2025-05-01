import React from "react";
const RecipeIndex = ({ alphaIndex }) => {
  const alpha = Array.from(
    { length: 26 },
    (_, i) => String.fromCharCode(65 + i) // A - Z
  ).filter((letter) => letter !== "Q" && letter !== "X");

  var num = 0;
  return (
    <div className=" grid grid-cols-12 sm:flex">
      {alpha.map((item) => (
        <div
          key={item}
          className="numBox mb-1 text-center cursor-pointer"
          onClick={() => alphaIndex(item)}
        >
          <h1 className="m-0">{item}</h1>
        </div>
      ))}
    </div>
  );
};
export default RecipeIndex;
