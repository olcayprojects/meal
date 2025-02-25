import React, { useState, useEffect } from "react";

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // Yıl bilgisini al

  return (
    <div className="text-center text-warning-emphasis">
      &copy; {year} Explore a variety of delicious recipes and make every meal
      special. Find easy and tasty recipes for every occasion.
    </div>
  );
};

export default Footer;
