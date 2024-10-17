import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Col, Row, Table } from "react-bootstrap";
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
        <Col>
          <p>Caricamento...</p>
        </Col>
      ) : dipendente && dipendente.ruolo === "DIPENDENTE" ? (
        dipendente.assenze && dipendente.assenze.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dipendente</th>
                <th>Assenza ID</th>
                <th>Data</th>
                <th>Motivo</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {dipendente.assenze.map((assenza) => (
                <tr key={assenza.id}>
                  <td>
                    {dipendente.nome} {dipendente.cognome}
                  </td>
                  <td>{assenza.id}</td>
                  <td>{assenza.data}</td>
                  <td>{assenza.motivo}</td>
                  <td>{assenza.stato}</td>
                  <td>
                    <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Col>
            <p>Nessuna assenza registrata!</p>
            <Button onClick={() => navigate("/home")}>Torna alla Home</Button>
          </Col>
        )
      ) : lista && lista.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dipendente</th>
              <th>Assenza ID</th>
              <th>Data</th>
              <th>Motivo</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((dipendente) =>
              dipendente.assenze.length > 0 ? (
                dipendente.assenze.map((assenza) => (
                  <tr key={assenza.id}>
                    <td>
                      {dipendente.nome} {dipendente.cognome}
                    </td>
                    <td>{assenza.id}</td>
                    <td>{assenza.data}</td>
                    <td>{assenza.motivo}</td>
                    <td>{assenza.stato}</td>
                    <td>
                      <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Approva</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={dipendente.id}>
                  <td>
                    {dipendente.nome} {dipendente.cognome}
                  </td>
                  <td colSpan="5">Nessuna assenza registrata</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      ) : (
        <Col>
          <p>Nessuna assenza registrata!</p>
          <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
        </Col>
      )}
    </Row>
  );
};
export default Assenze;
