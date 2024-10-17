import { Button } from "react-bootstrap";
import notFoundImage from "../assets/not-found.webp";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <img src={notFoundImage} alt="not-found" className="img-fluid" width={"60%"} />
      </div>
      <Button
        className="mt-5"
        onClick={() => {
          navigate("/home");
        }}
      >
        Torna alla Home
      </Button>
    </>
  );
};
export default NotFound;
