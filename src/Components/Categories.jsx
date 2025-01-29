import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

var infocate = "";

const Categories = () => {
  const [url, setUrl] = useState(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  let navigate = useNavigate();

  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(url).then((res) =>
      res.json().then((data) => {
        setItem(data.categories);
        infocate = data;
        setShow(true);
      })
    );
  }, [url]);
  if (!show) return <Loader />;

  return (
    <>
      <div className="row row-cols-3 row-cols-md-auto mt-2 g-0 justify-content-center">
        {!item
          ? "bulunamadı"
          : item.map((itemCategory) => {
              return (
                <div
                  className="col m-1 border border-dark border-4 bg-dark"
                  key={itemCategory.idCategory}
                  style={{ boxSizing: "", width: "" }}
                  onClick={() => {
                    navigate(`/fg/${itemCategory.strCategory}`);
                  }}
                >
                  <div
                    className="card text-dark bg-transparent imgeffect"
                    style={{}}
                    key={itemCategory.idCategory}
                  >
                    <img
                      className="card-img-top  shadow"
                      src={itemCategory.strCategoryThumb}
                      title={itemCategory.strCategory}
                      alt={itemCategory.strCategory}
                    />
                    <div className="text-center pt-2">
                      <span className="text-warning card-title bg-dark fw-bold mb-1 px-1 fs-5">
                        {itemCategory.strCategory.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export function CategoryInfo(cName) {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    infocate.categories?.map((categoryInfo) => {
      if (categoryInfo.strCategory === cName.cName) {
        setInfo(categoryInfo);
      }
    });
  }, [cName]);
  return (
    <>
      <div className="text-center mt-2">
        <img
          className="img-responsive w-25 mx-auto d-block"
          src={info.strCategoryThumb}
          alt={info.strCategory}
          title={info.strCategory}
        />
        <span className="bg-warning fs-1 px-4 fw-bold rounded-pill">
          {info.strCategory} Meals
        </span>
      </div>
      <div
        className="bg-dark m-2"
        style={{ borderStyle: "ridge", borderColor: "orange" }}
      >
        <pre className="text-light fst-italic fs-5 p-1 m-0">
          {info.strCategoryDescription}
        </pre>
      </div>
    </>
  );
}

export default Categories;
