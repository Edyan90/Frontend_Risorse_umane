import { useEffect } from "react";
import { setListaDipendenti } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dipendenti = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lista = useSelector((state) => state.listaDipendenti.listaDipendenti);

  const listaDipendenti = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("http://localhost:3001/dipendenti", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Errore nella fetch lista-dipendenti!");
      }
      const data = await resp.json();
      console.log("Dati ricevuti:", data);
      dispatch(setListaDipendenti(data));
    } catch (error) {
      console.error("Errore nella fetch lista-dipendenti!", error);
    }
  };

  useEffect(() => {
    listaDipendenti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row>
      {lista.content && lista.content.length > 0 ? (
        lista.content.map((dipendente) => (
          <Col key={dipendente.id} lg={4}>
            <Card style={{ width: "15rem" }} className="p-4 m-3">
              <Card.Img variant="top" src={`${dipendente.avatar}`} />
              <Card.Body>
                <Card.Title>{`${dipendente.nome} ${dipendente.cognome}`}</Card.Title>
                <Card.Text>Ruolo: {`${dipendente.ruolo}`}</Card.Text>
                <Button variant="primary" onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>
                  Visita profilo
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <h1>Nessun dipendente trovato.</h1>
      )}
    </Row>
  );
};

export default Dipendenti;
