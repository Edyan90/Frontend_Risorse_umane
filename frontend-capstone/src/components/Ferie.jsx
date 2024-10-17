import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListaFerie } from "../redux/actions";
import { Button, Col, Row, Table } from "react-bootstrap";
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dipendente</th>
                <th>Ferie ID</th>
                <th>Data Inizio</th>
                <th>Data Fine</th>
                <th>Ferie Maturate</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {dipendente.ferie.map((ferie) => (
                <tr key={ferie.id}>
                  <td>
                    {dipendente.nome} {dipendente.cognome}
                  </td>
                  <td>{ferie.id}</td>
                  <td>{ferie.dataInizio}</td>
                  <td>{ferie.dataFine}</td>
                  <td>{ferie.ferieMaturate} h</td>
                  <td>{ferie.stato}</td>
                  <td>
                    <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Col>
            <p>
              <strong>Dipendente:</strong> {dipendente.nome} {dipendente.cognome}
            </p>
            <p>Non sono presenti ferie</p>
            <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
          </Col>
        )
      ) : lista && lista.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dipendente</th>
              <th>Ferie ID</th>
              <th>Data Inizio</th>
              <th>Data Fine</th>
              <th>Ferie Maturate</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((dipendente) =>
              dipendente.ferie.map((ferie) => (
                <tr key={ferie.id}>
                  <td>
                    {dipendente.nome} {dipendente.cognome}
                  </td>
                  <td>{ferie.id}</td>
                  <td>{ferie.dataInizio}</td>
                  <td>{ferie.dataFine}</td>
                  <td>{ferie.ferieMaturate} h</td>
                  <td>{ferie.stato}</td>
                  <td>
                    {ferie.stato === "RICHIESTO" ? (
                      <>
                        <Button>Approva</Button>
                        <Button className="btn-danger ms-2">Rifiuta</Button>
                      </>
                    ) : (
                      <>
                        <Button>Vedi profilo</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      ) : (
        <h1>Nessun elemento trovato</h1>
      )}
    </Row>
  );
};
export default Ferie;
