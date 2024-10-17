import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListBustePaga } from "../redux/actions";
import { Button, Col, Row, Table } from "react-bootstrap";
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dipendente</th>
                <th>BustaPaga ID</th>
                <th>Data</th>
                <th>Importo Totale</th>
                <th>Ore Lavorate Extra</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {dipendente.bustepaga.map((bustapaga) => (
                <tr key={bustapaga.id}>
                  <td>
                    {dipendente.nome} {dipendente.cognome}
                  </td>
                  <td>{bustapaga.id}</td>
                  <td>{bustapaga.data}</td>
                  <td>{bustapaga.importoTotale} €</td>
                  <td>{bustapaga.oreLavorateExtra} h</td>
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
            <p>Buste paga non presenti</p>
            <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
          </Col>
        )
      ) : lista && lista.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dipendente</th>
              <th>BustaPaga ID</th>
              <th>Data</th>
              <th>Importo Totale</th>
              <th>Ore Lavorate Extra</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((dipendente) =>
              dipendente.bustepaga.map((bustapaga) => (
                <tr key={bustapaga.id}>
                  <td>
                    {dipendente.nome} {dipendente.cognome}
                  </td>
                  <td>{bustapaga.id}</td>
                  <td>{bustapaga.data}</td>
                  <td>{bustapaga.importoTotale} €</td>
                  <td>{bustapaga.oreLavorateExtra} h</td>
                  <td>
                    <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
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
export default BustePaga;
