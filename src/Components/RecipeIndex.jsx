import React from "react";

const RecipeIndex = ({ alphaIndex }) => {
  const alpha = Array.from(
    { length: 26 },
    (_, i) => String.fromCharCode(65 + i) // A - Z
  ).filter((letter) => letter !== "Q" && letter !== "X");

  return (
    <div className="flex flex-nowrap overflow-x-auto justify-start cursor-pointer numBox my-1">
      {alpha.map((item) => (
        <div
          key={item}
          className="border border-warning text-warning text-center px-1 mx-1 shrink-0"
          onClick={() => alphaIndex(item)}
        >
          <h2 className="m-1">{item}</h2>
        </div>
      ))}
    </div>
  );
};

export default RecipeIndex;
