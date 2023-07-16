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
    <div className="d-flex justify-content-center align-items-center">
      <Spinner
        animation="border"
        role="status"
        style={{ color: "cyan", width: "40rem", height: "40rem" }}
      >
        <span style={{ color: "cyan" }} className="visually-hidden">
          Loading...
        </span>
      </Spinner>
    </div>
  );
}

export default Loader;
