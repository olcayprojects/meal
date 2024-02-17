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
        // console.log(data.categories);

        setItem(data.categories);
        infocate = data;
        setShow(true);
      })
    );
  }, [url]);
  if (!show) return <Loader />;

  return (
    <>
      <div className="row row-cols-3 row-cols-md-auto mt-2 g-1 justify-content-center">
        {!item
          ? "bulunamadı"
          : item.map((itemCategory) => {
              return (
                <div
                  className="col"
                  key={itemCategory.idCategory}
                  style={{ boxSizing: "border-box", width: "130px" }}
                  onClick={() => {
                    navigate(`/fg/${itemCategory.strCategory}`);
                  }}
                >
                  <div
                    className="card text-dark h-100 imgeffect"
                    style={{}}
                    key={itemCategory.idCategory}
                  >
                    <img
                      className="card-img-top shadow"
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
        setInfo(categoryInfo.strCategoryDescription);
      }
    });
}, [cName]);
  return (
    <div className="border border-warning border-4 bg-dark mb-2">
      <pre className="text-warning fst-italic fs-5 p-2 m-0">{info}</pre>
    </div>
  );
}

export default Categories;
