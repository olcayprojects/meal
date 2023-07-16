import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.css";

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

fetch(url)
  .then((response) => {
    // console.log(response.status)
  })
  .catch((error) => {
    window.alert(error);
    // handle the error
  });

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
        <h1 style={{ color: "cyan" }} className=" fw-bolder">
          Loading...
        </h1>
    </div>
  );
}

export default Loader;
