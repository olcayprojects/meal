import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

const Categories = () => {
  let navigate = useNavigate();

  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.categories);
        setShow(true);
      });
  }, []);

  if (!show) return <Loader />;

  return (
    <div className="row row-cols-3 row-cols-md-auto mt-2 g-0 justify-content-center">
      {item.length === 0
        ? "Bulunamadı"
        : item.map((itemCategory) => (
            <div
              className="col m-1 border-2 border-gray-900 hover:scale-105 hover:bg-yellow-500 transition-all duration-100"
              key={itemCategory.idCategory}
              style={{ width: "150px" }}
              onClick={() => {
                navigate(`/fg/${itemCategory.strCategory}`);
              }}
            >
              <div className="card text-gray-500 bg-transparent ">
                <img
                  className="shadow"
                  src={itemCategory.strCategoryThumb}
                  title={itemCategory.strCategory}
                  alt={itemCategory.strCategory}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="text-center pt-2">
                  <span className="text-yellow-500 bg-gray-900 mb-1 px-1">
                    {itemCategory.strCategory.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export function CategoryInfo({ cName }) {
  const [info, setInfo] = useState([]);
  const [infocate, setInfocate] = useState(null);

  // Veri sadece bir kez çekilsin
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.categories);
      });
  }, []);

  useEffect(() => {
    const foundCategory = info?.find(
      (categoryInfo) => categoryInfo.strCategory === cName
    );
    if (foundCategory) {
      setInfocate(foundCategory);
    }
  }, [info, cName]);

  if (!infocate) return <Loader />;

  return (
    <>
      <div className="text-center mt-1">
        <img
          className="img-fluid bg-orange-200 mx-auto d-block"
          src={infocate?.strCategoryThumb}
          alt={infocate?.strCategory}
          title={infocate?.strCategory}
        />
        <span className="bg-orange-700 text-black fs-1 px-4 fw-bold rounded-pill">
          {infocate?.strCategory} Meals
        </span>
      </div>
      <div className="bg-gray-800 border-2 border-dashed border-orange-500">
        <pre className="text-orange-400 lh-sm italic size-100 p-1 m-0">
          {infocate?.strCategoryDescription}
        </pre>
      </div>
    </>
  );
}

export default Categories;
