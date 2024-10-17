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
    button: "Vedi BustePaghe",
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
    titolo: "Filtri",
    testo: "filtri per una ricerca più accurata",
    button: "Vai al form",
    navigate: "giustificazione",
  });
  return (
    <Container className="cards">
      <h1 className="text-start text-black">Scegli una delle opzioni:</h1>
      <Row className="justify-content-center my-3 gap-3">
        <Col lg={3}>
          {dipendente.dipendente.ruolo === "DIPENDENTE" ? (
            <MyCard carte={profilo} darkTheme={darkTheme} />
          ) : (
            <MyCard carte={dipendenti} darkTheme={darkTheme} />
          )}
        </Col>
        <Col lg={3}>
          <MyCard carte={assenze} darkTheme={darkTheme} />
        </Col>
        <Col lg={3}>
          <MyCard carte={bustePaga} darkTheme={darkTheme} />
        </Col>
        <Col lg={3}>
          <MyCard carte={ferie} darkTheme={darkTheme} />
        </Col>

        <Col lg={3}>
          <MyCard carte={presenza} darkTheme={darkTheme} />
        </Col>
      </Row>
      <h1 className="text-start text-black mb-3">oppure vai alla sezione filtri:</h1>
      <Row className="justify-content-center">
        <Col lg={5}>
          <MyCard carte={giustificazione} darkTheme={darkTheme} />
        </Col>
      </Row>
    </Container>
  );
};
export default DashBoard;
