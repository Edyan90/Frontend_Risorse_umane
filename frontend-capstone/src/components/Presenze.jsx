import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setListPresenze } from "../redux/actions";
import { Button, Card, Col, Row } from "react-bootstrap";

const Presenze = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  const lista = useSelector((state) => state.listaPresenze.listaPresenze);
  console.log("dipendenteAutenticato", dipendente);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const listaPresenze = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("http://localhost:3001/dipendenti", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Errore nella fetch listaPresenze");
      }
      const data = await resp.json();
      console.log("Dati ricevuti", data.content);
      dispatch(setListPresenze(data.content));
      console.log("Stato aggiornato, listaPresenze:", lista);
    } catch (error) {
      console.error("Errore nella fetch presenze", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    listaPresenze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      {loading ? (
        <Card>
          <Card.Body>
            <Card.Text>Caricamento...</Card.Text>
          </Card.Body>
        </Card>
      ) : dipendente && dipendente.ruolo === "DIPENDENTE" ? (
        dipendente.presenze && dipendente.presenze.length > 0 ? (
          dipendente.presenze.map((presenza) => (
            <Col key={presenza.id}>
              <Card style={{ width: "17rem" }} className="p-3 m-4">
                <Card.Body>
                  <Card.Text>
                    <strong>Dipendente: </strong> {dipendente.nome} {dipendente.cognome}
                  </Card.Text>
                  <p>
                    <strong>Presenza ID: </strong> {presenza.id}
                  </p>
                  <p>
                    <strong>Data: </strong> {presenza.data}
                  </p>
                  <p>
                    <strong>Presente: </strong> {presenza.presente}
                  </p>
                  <p>
                    <strong>Stato: </strong> {presenza.stato}
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
              <Card.Text>Presenze non registrate, se ritieni sia un errore contatta il tuo responsabile!</Card.Text>
              <Button onClick={() => navigate(`/home`)}>Torna alla Home</Button>
            </Card.Body>
          </Card>
        )
      ) : lista && lista.length > 0 ? (
        lista.map((dipendente) =>
          dipendente.presenze.length > 0 ? (
            dipendente.presenze.map((presenza) => (
              <Col key={presenza.id} lg={4}>
                <Card style={{ width: "18rem" }} className="p-3 m-4">
                  <Card.Body>
                    <Card.Text>
                      <strong>Dipendente:</strong> {dipendente.nome} {dipendente.cognome}
                    </Card.Text>
                    <p>
                      <strong>Presenza ID: </strong> {presenza.id}
                    </p>
                    <p>
                      <strong>Data: </strong> {presenza.data}
                    </p>
                    <p>
                      <strong>Stato:</strong> {presenza.stato}
                    </p>
                    <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col key={dipendente.id} lg={4}>
              <Card style={{ width: "18rem" }} className="p-3 m-4">
                <Card.Body>
                  <Card.Text>
                    <strong>Dipendente:</strong> {dipendente.nome} {dipendente.cognome}
                  </Card.Text>
                  <Card.Text>
                    <strong>Nessuna Presenza registrata</strong>
                  </Card.Text>
                  <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
                </Card.Body>
              </Card>
            </Col>
          )
        )
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>
              <strong>Nessuna Presenza registrata</strong>
            </Card.Text>
            <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
          </Card.Body>
        </Card>
      )}
    </Row>
  );
};
export default Presenze;
