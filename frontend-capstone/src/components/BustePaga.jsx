import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListBustePaga } from "../redux/actions";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BustePaga = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  const dispatch = useDispatch();
  const lista = useSelector((state) => state.listaBustePaga.listaBustePaga);
  const navigate = useNavigate();
  const listaBustePaga = async () => {
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
      dispatch(setListBustePaga(data.content));
    } catch (error) {
      console.error("Errore nella fetch lista Bustepaga", error);
    }
  };
  useEffect(() => {
    listaBustePaga();
    console.log(lista);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row>
      {dipendente && dipendente.ruolo === "DIPENDENTE" ? (
        dipendente.bustepaga && dipendente.bustepaga.length > 0 ? (
          dipendente.bustepaga.map((bustapaga) => (
            <Col key={bustapaga.id}>
              <Card style={{ width: "17rem" }} className="p-3 m-4">
                <Card.Body>
                  <Card.Text>
                    <strong>Dipendente:</strong> {dipendente.nome} {dipendente.cognome}
                  </Card.Text>
                  <p>
                    <strong>BustaPaga ID:</strong> {bustapaga.id}
                  </p>
                  <p>
                    <strong>Data: </strong> {bustapaga.data}
                  </p>
                  <p>
                    <strong>Importo totale: </strong> {bustapaga.importoTotale}
                  </p>
                  <p>
                    <strong> Ore lavorate extra :</strong> {bustapaga.oreLavorateExtra} h
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
              <Card.Text> Bustepaga non presenti</Card.Text>
              <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
            </Card.Body>
          </Card>
        )
      ) : lista && lista.length > 0 ? (
        lista.map((dipendente) =>
          dipendente.bustepaga.map((buste) => (
            <Col key={buste.id} lg={4}>
              <Card style={{ width: "16rem" }} className="p-3 m-4">
                <Card.Text>
                  <strong>Dipendente: </strong>
                  {dipendente.nome} {dipendente.cognome}
                </Card.Text>
                <p>
                  <strong>ID:</strong> {buste.id}
                </p>
                <p>
                  <strong>Data:</strong> {buste.data}
                </p>
                <p>
                  <strong>Importo Totale:</strong> {buste.importoTotale} €
                </p>
                <p>
                  <strong>Ore Lavorate Extra:</strong> {buste.oreLavorateExtra} ore
                </p>
                <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
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
export default BustePaga;
