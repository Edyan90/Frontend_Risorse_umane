import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Card, Col, Row } from "react-bootstrap";
import { setListAssenze } from "../redux/actions";

const Assenze = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  const lista = useSelector((state) => state.listaAssenze.listaAssenze);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const listaAssenze = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("http://localhost:3001/dipendenti", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Errore nella fetch lista Bustepaga");
      }
      const data = await resp.json();
      console.log("dati ricevuti", data.content);
      dispatch(setListAssenze(data.content));
    } catch (error) {
      console.error("Errore nella fetch lista assenze", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listaAssenze();
    console.log("ciao", lista);
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
        dipendente.assenze && dipendente.assenze.length > 0 ? (
          dipendente.assenze.map((assenza) => (
            <Col key={assenza.id}>
              <Card style={{ width: "17rem" }} className="p-3 m-4">
                <Card.Body>
                  <Card.Text>
                    <strong>Dipendente: </strong> {dipendente.nome} {dipendente.cognome}
                  </Card.Text>
                  <p>
                    <strong>Assenza ID: </strong> {assenza.id}
                  </p>
                  <p>
                    <strong>Data: </strong> {assenza.data}
                  </p>
                  <p>
                    <strong>Motivo: </strong> {assenza.motivo}
                  </p>
                  <p>
                    <strong>Stato: </strong> {assenza.stato}
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
              <Card.Text>Assenze non registrate!</Card.Text>
              <Button onClick={() => navigate(`/home`)}>Torna alla Home</Button>
            </Card.Body>
          </Card>
        )
      ) : lista && lista.length > 0 ? (
        lista.map((dipendente) =>
          dipendente.assenze.length > 0 ? (
            dipendente.assenze.map((assenza) => (
              <Col key={assenza.id} lg={4}>
                <Card style={{ width: "18rem" }} className="p-3 m-4">
                  <Card.Body>
                    <Card.Text>
                      <strong>Dipendente:</strong> {dipendente.nome} {dipendente.cognome}
                    </Card.Text>
                    <p>
                      <strong>Assenza ID: </strong> {assenza.id}
                    </p>
                    <p>
                      <strong>Data: </strong> {assenza.data}
                    </p>
                    <p>
                      <strong>Motivo: </strong> {assenza.motivo}
                    </p>
                    <p>
                      <strong>Stato:</strong> {assenza.stato}
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
                    <strong>Nessuna assenza registrata</strong>
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
              <strong>Nessuna assenza registrata</strong>
            </Card.Text>
            <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
          </Card.Body>
        </Card>
      )}
    </Row>
  );
};
export default Assenze;
