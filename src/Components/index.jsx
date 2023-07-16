import React from "react";
import Meal from "./Meal";
import { Routes, Route } from "react-router-dom";
import RecipeInfo from "./RecipeInfo";
import Ingredients from "./Ingredients";
import Ingredientsfilter from "./Ingredientsfilter";
import Randomeal from "./Randomeal";
import Filtercategory from "./Filtercategory";
import MealItem from "./MealItem";
import Area from "./Area";

const Components = () => {
  return (
    <Routes>
      <Route path="/" element={<Meal />} />
      <Route path="/categories" element={<Filtercategory />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/ingredients/:ingredients" element={<Ingredients />} />
      <Route path="/RecipeInfo/:MealId" element={<RecipeInfo />} />
      <Route path="/fg/:CategoryName" element={<Filtercategory />} />
      <Route path="/Randomeal" element={<Randomeal />} />
      <Route path="/MealItem" element={<MealItem />} />
      <Route path="/Area" element={<Area />} />
      <Route path="/area/:areaName" element={<Area />} />
      <Route
        path="/ingredientsfilter/:IngredientName"
        element={<Ingredientsfilter />}
      />
    </Routes>
  );
};

export default Components;
