/* eslint-disable react/prop-types */

import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const MyCard = ({ carte, darkTheme }) => {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(`/${carte.navigate}`);
  };

  return (
    <Card>
      <Card.Body
        className="d-flex flex-column justify-content-center"
        style={{ backgroundColor: "white", height: "200px" }}
      >
        <Card.Title>{carte.titolo}</Card.Title>
        <Card.Text>{carte.testo}</Card.Text>
        <Button
          className="text-light border-0"
          onClick={() => goToPage()}
          style={{ backgroundColor: "#1e7c82" }}
          size="lg"
        >
          {carte.button}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
