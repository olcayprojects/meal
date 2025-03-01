import React from "react";
const RecipeIndex = ({ alphaIndex }) => {
  const alpha = Array.from(
    { length: 26 },
    (_, i) => String.fromCharCode(65 + i) // A - Z
  );

  var num = 0;
  return (
    <>
      {alpha.map((item) => {
        return (
          <div
            className="numBox mx-auto me-1"
            key={num++}
            onClick={() => alphaIndex(item)}
          >
            <h1 className="m-0">{item}</h1>
          </div>
        );
      })}
    </>
  );
};
export default RecipeIndex;
