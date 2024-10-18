import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListBustePaga } from "../redux/actions";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BustePaga = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  const dispatch = useDispatch();
  const lista = useSelector((state) => state.listaBustePaga.listaBustePaga);
  const navigate = useNavigate();
  const [listaCompleta, setListaCompleta] = useState([]);
  const [filtri, setFiltri] = useState({
    nome: "",
    cognome: "",
    bustaID: "",
  });
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
      setListaCompleta(data.content);
    } catch (error) {
      console.error("Errore nella fetch lista Bustepaga", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltri((prev) => ({ ...prev, [name]: value }));
  };

  const filtraDipendenti = () => {
    return listaCompleta.filter((dipendente) => {
      if (!dipendente.bustepaga || dipendente.bustepaga.length === 0) {
        return false;
      }
      const busteFiltrate = dipendente.bustepaga.filter((busta) => {
        return filtri.bustaID === "" || busta.id.toString().toLowerCase().includes(filtri.assenzaID.toLowerCase());
      });
      const nomefiltrato = filtri.nome === "" || dipendente.nome.toLowerCase().includes(filtri.nome.toLowerCase());
      const cognomefiltrato =
        filtri.cognome === "" || dipendente.cognome.toLowerCase().includes(filtri.cognome.toLowerCase());
      return busteFiltrate.length > 0 && nomefiltrato && cognomefiltrato;
    });
  };

  const dipendentiFiltrati = filtraDipendenti();

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
            <Button onClick={() => navigate(`/home`)}>Torna alla home</Button>
          </Col>
        )
      ) : (
        <>
          <Row className="mb-3">
            <h3 className="text-start text-light">Ricerca per:</h3>
            <Form className="d-flex gap-2 justify-content-start">
              <Form.Group controlId="nome">
                <Form.Control
                  placeholder="@nome dipendente"
                  type="text"
                  name="nome"
                  value={filtri.nome}
                  onChange={handleFilterChange}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="cognome">
                <Form.Control
                  placeholder="@cognome dipendente"
                  type="text"
                  name="cognome"
                  value={filtri.cognome}
                  onChange={handleFilterChange}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="bustaID">
                <Form.Control
                  placeholder="@bustaID"
                  type="text"
                  name="bustaID"
                  value={filtri.bustaID}
                  onChange={handleFilterChange}
                  className="custom-input"
                />
              </Form.Group>
            </Form>
          </Row>
          <Row>
            {dipendentiFiltrati && dipendentiFiltrati.length > 0 ? (
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
                  {dipendentiFiltrati.map((dipendente) =>
                    dipendente.bustepaga.length > 0 ? (
                      dipendente.bustepaga.map((busta) => (
                        <tr key={busta.id}>
                          <td>
                            {dipendente.nome} {dipendente.cognome}
                          </td>
                          <td>{busta.id}</td>
                          <td>{busta.data}</td>
                          <td>{busta.importoTotale}</td>
                          <td>{busta.oreLavorateExtra}</td>
                          <td>
                            <Button onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>Vedi profilo</Button>
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
                <h1>Nessuna assenza registrata!</h1>
                <Button onClick={() => navigate(`/home`)}>Torna alla Home</Button>
              </Col>
            )}
          </Row>
        </>
      )}
    </Row>
  );
};
export default BustePaga;
