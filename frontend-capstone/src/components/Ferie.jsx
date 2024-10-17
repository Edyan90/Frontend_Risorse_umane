import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListaFerie } from "../redux/actions";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Ferie = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  console.log("dipendenteAutenticato", dipendente);
  console.log(dipendente.ferie);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lista = useSelector((state) => state.listaFerie.listaFerie);
  const storicoTutteLeFerie = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("http://localhost:3001/dipendenti", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Errore nella fetch listaFerie");
      }
      const data = await resp.json();
      console.log("Dati ricevuti", data.content);
      dispatch(setListaFerie(data.content));
    } catch (error) {
      console.error("Errore nella fetch lista-ferie!", error);
    }
  };

  useEffect(() => {
    storicoTutteLeFerie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row>
      {dipendente && dipendente.ruolo === "DIPENDENTE" ? (
        dipendente.ferie && dipendente.ferie.length > 0 ? (
          dipendente.ferie.map((ferie) => (
            <Col key={ferie.id}>
              <Card style={{ width: "17rem" }} className="p-3 m-4">
                <Card.Body>
                  <Card.Text>
                    <strong>Dipendente:</strong> {dipendente.nome} {dipendente.cognome}
                  </Card.Text>
                  <p>
                    <strong>Ferie ID:</strong> {ferie.id}
                  </p>
                  <p>
                    <strong>Data Inizio:</strong> {ferie.dataInizio}
                  </p>
                  <p>
                    <strong>Data Fine:</strong> {ferie.dataFine}
                  </p>
                  <p>
                    <strong>Ferie Maturate:</strong> {ferie.ferieMaturate} h
                  </p>
                  <p>
                    <strong>Ferie Stato:</strong> {ferie.stato}
                  </p>
                  <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>
                <strong>Dipendente:</strong> {dipendente.nome} {dipendente.cognome}
              </Card.Text>
              <Card.Text> Non sono presenti ferie</Card.Text>
              <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
            </Card.Body>
          </Card>
        )
      ) : lista && lista.length > 0 ? (
        lista.map((dipendente) =>
          dipendente.ferie.map((ferie) => (
            <Col key={ferie.id} lg={4}>
              <Card style={{ width: "18rem" }} className="p-3 m-4">
                <Card.Body>
                  <Card.Text>
                    <strong>Dipendente:</strong> {dipendente.nome} {dipendente.cognome}
                  </Card.Text>
                  <p>
                    <strong>Ferie ID:</strong> {ferie.id}
                  </p>
                  <p>
                    <strong>Data Inizio:</strong> {ferie.dataInizio}
                  </p>
                  <p>
                    <strong>Data Fine:</strong> {ferie.dataFine}
                  </p>
                  <p>
                    <strong>Ferie Maturate:</strong> {ferie.ferieMaturate} h
                  </p>
                  <p>
                    <strong>Ferie Stato:</strong> {ferie.stato}
                  </p>
                  <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )
      ) : (
        <h1>Nessun elemento trovato</h1>
      )}
    </Row>
  );
};
export default Ferie;
