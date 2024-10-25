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
    <Card
      className="shadow-sm"
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Card.Body
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundColor: "#f7f9fc",
          height: "250px",
          padding: "20px",
        }}
      >
        <Card.Title style={{ fontSize: "1.5rem", fontWeight: "600", color: "#333" }}>{carte.titolo}</Card.Title>
        <Card.Text tyle={{ fontSize: "1rem", color: "#666", margin: "10px 0" }}>{carte.testo}</Card.Text>
        <Button
          className="text-light border-0"
          onClick={() => goToPage()}
          style={{
            backgroundColor: "#1e7c82",
            borderRadius: "25px",
            padding: "10px 30px",
            fontWeight: "bold",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          size="lg"
        >
          {carte.button}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
