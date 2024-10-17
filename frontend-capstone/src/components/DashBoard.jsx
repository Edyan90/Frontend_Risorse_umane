/* eslint-disable react/prop-types */
import { Col, Container, Row } from "react-bootstrap";
import MyCard from "./MyCard";
import { useState } from "react";

const DashBoard = ({ dipendente, darkTheme }) => {
  const [dipendenti] = useState({
    titolo: "Dipendenti",
    testo: "Lista di dipendenti",
    button: "Vai alla lista",
    navigate: "dipendenti",
  });
  const [assenze] = useState({
    titolo: "Assenze",
    testo: "Storico Assenze",
    button: "Vai alla lista",
    navigate: "assenze",
  });
  const [bustePaga] = useState({
    titolo: "Buste Paga",
    testo: "Lista BustePaga",
    button: "Vedi le BustePaghe",
    navigate: "bustepaga",
  });
  const [ferie] = useState({
    titolo: "Ferie",
    testo: "Storico Ferie",
    button: "Visita lo storico",
    navigate: "ferie",
  });
  const [presenza] = useState({
    titolo: "Presenze",
    testo: "Lista Presenze",
    button: "Vai alla lista",
    navigate: "presenze",
  });
  const [profilo] = useState({
    titolo: "Profilo Personale",
    testo: "Gestisci profilo",
    button: "Vai al profilo",
    navigate: `dipendenti/${dipendente.id}`,
  });
  const [giustificazione] = useState({
    titolo: "Giustificazione",
    testo: "crea giustificazione assenza",
    button: "Vai al form",
    navigate: "giustificazione",
  });
  return (
    <Container className="cards">
      <Row className="justify-content-center m-5">
        <Col lg={6}>
          {dipendente.dipendente.ruolo === "DIPENDENTE" ? (
            <MyCard carte={profilo} darkTheme={darkTheme} />
          ) : (
            <MyCard carte={dipendenti} darkTheme={darkTheme} />
          )}
        </Col>
        <Col lg={6}>
          <MyCard carte={assenze} darkTheme={darkTheme} />
        </Col>
      </Row>
      <Row className="justify-content-center m-5">
        <Col lg={6}>
          <MyCard carte={bustePaga} darkTheme={darkTheme} />
        </Col>
        <Col lg={6}>
          <MyCard carte={ferie} darkTheme={darkTheme} />
        </Col>
      </Row>
      <Row className="justify-content-center m-5">
        <Col lg={6}>
          <MyCard carte={presenza} darkTheme={darkTheme} />
        </Col>
        <Col lg={6}>
          <MyCard carte={giustificazione} darkTheme={darkTheme} />
        </Col>
      </Row>
    </Container>
  );
};
export default DashBoard;
