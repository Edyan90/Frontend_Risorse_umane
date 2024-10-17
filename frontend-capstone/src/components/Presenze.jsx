import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setListPresenze } from "../redux/actions";
import { Button, Table, Col, Row, Card } from "react-bootstrap";

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
        <Col>
          <Card>
            <Card.Body>
              <Card.Text>Caricamento...</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ) : dipendente && dipendente.ruolo === "DIPENDENTE" ? (
        dipendente.presenze && dipendente.presenze.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dipendente</th>
                <th>Presenza ID</th>
                <th>Data</th>
                <th>Presente</th>
                <th>Stato Presenza</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {dipendente.presenze.map((presenza) => (
                <tr key={presenza.id}>
                  <td>
                    {dipendente.nome} {dipendente.cognome}
                  </td>
                  <td>{presenza.id}</td>
                  <td>{presenza.data}</td>
                  <td>{presenza.presente ? "Sì" : "No"}</td>
                  <td>{presenza.statoPresenza}</td>
                  <td>
                    <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>
                  <strong>Dipendente:</strong> {dipendente.nome} {dipendente.cognome}
                </Card.Text>
                <Card.Text>Presenze non registrate, se ritieni sia un errore contatta il tuo responsabile!</Card.Text>
                <Button onClick={() => navigate(`/home`)}>Torna alla Home</Button>
              </Card.Body>
            </Card>
          </Col>
        )
      ) : lista && lista.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dipendente</th>
              <th>Presenza ID</th>
              <th>Data</th>
              <th>Presente</th>
              <th>Stato Presenza</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((dipendente) =>
              dipendente.presenze.length > 0 ? (
                dipendente.presenze.map((presenza) => (
                  <tr key={presenza.id}>
                    <td>
                      {dipendente.nome} {dipendente.cognome}
                    </td>
                    <td>{presenza.id}</td>
                    <td>{presenza.data}</td>
                    <td>{presenza.stato ? "Assente" : "Presente"}</td>
                    <td>{presenza.statoPresenza}</td>
                    <td>
                      <Button className="me-1">Approva</Button>
                      <Button className="btn-danger">Rifiuta</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={dipendente.id}>
                  <td>
                    {dipendente.nome} {dipendente.cognome}
                  </td>
                  <td colSpan="4">
                    <strong>Nessuna Presenza registrata</strong>
                  </td>
                  <td>
                    <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      ) : (
        <Col>
          <Card>
            <Card.Body>
              <Card.Text>
                <strong>Nessuna Presenza registrata</strong>
              </Card.Text>
              <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
};
export default Presenze;
