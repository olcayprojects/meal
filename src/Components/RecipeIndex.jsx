import React from "react";

const RecipeIndex = ({ alphaIndex }) => {
  const alpha = Array.from(
    { length: 26 },
    (_, i) => String.fromCharCode(65 + i) // A - Z
  ).filter((letter) => letter !== "Q" && letter !== "X");

  return (
    <div className="flex flex-nowrap overflow-x-auto justify-start">
      {alpha.map((item) => (
        <div
          key={item}
          className="numBox text-center cursor-pointer py-1 shrink-0"
          onClick={() => alphaIndex(item)}
        >
          <h1 className="m-0">{item}</h1>
        </div>
      ))}
    </div>
  );
};

export default RecipeIndex;
