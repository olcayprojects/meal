import React from "react";
const RecipeIndex = ({ alphaIndex }) => {
  const alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "J",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var num = 0;
  return (
    <>
      {alpha.map((item) => {
        return (
          <div className="numBox mx-auto" key={num++} onClick={() => alphaIndex(item)}>
            <h1>{item}</h1>
          </div>
        );
      })}
    </>
  );
};
export default RecipeIndex;
