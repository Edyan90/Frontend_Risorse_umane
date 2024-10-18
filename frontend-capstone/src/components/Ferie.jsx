import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListaFerie } from "../redux/actions";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Ferie = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  console.log("dipendenteAutenticato", dipendente);
  console.log(dipendente.ferie);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const lista = useSelector((state) => state.listaFerie.listaFerie);

  const [listaCompleta, setListaCompleta] = useState([]);
  const [filtri, setFiltri] = useState({
    nome: "",
    cognome: "",
    ferieID: "",
    stato: "",
  });

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
      setListaCompleta(data.content);
    } catch (error) {
      console.error("Errore nella fetch lista-ferie!", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltri((prev) => ({ ...prev, [name]: value }));
  };

  const filtraDipendenti = () => {
    return listaCompleta.filter((dipendente) => {
      if (!dipendente.ferie || dipendente.ferie.length === 0) {
        return false;
      }
      const ferieFiltrate = dipendente.ferie.filter((ferie) => {
        return (
          (filtri.ferieID === "" || ferie.id.toString().toLowerCase().includes(filtri.ferieID.toLowerCase())) &&
          (filtri.stato === "" || ferie.stato.toLowerCase().includes(filtri.stato.toLowerCase()))
        );
      });
      const nomefiltrato = filtri.nome === "" || dipendente.nome.toLowerCase().includes(filtri.nome.toLowerCase());
      const cognomefiltrato =
        filtri.cognome === "" || dipendente.cognome.toLowerCase().includes(filtri.cognome.toLowerCase());
      return ferieFiltrate.length > 0 && nomefiltrato && cognomefiltrato;
    });
  };

  const dipendentiFiltrati = filtraDipendenti();

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
            <Button onClick={() => navigate(`/home`)}>Torna alla Home</Button>
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
              <Form.Group controlId="ferieID">
                <Form.Control
                  placeholder="@ferieID"
                  type="text"
                  name="ferieID"
                  value={filtri.assenzaID}
                  onChange={handleFilterChange}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="stato">
                <Form.Control
                  as="select"
                  name="stato"
                  value={filtri.stato}
                  onChange={handleFilterChange}
                  className="custom-input"
                >
                  <option value="">Seleziona Stato</option>
                  <option value="APPROVATO">APPROVATO</option>
                  <option value="RIFIUTATO">RIFIUTATO</option>
                  <option value="RICHIESTO">RICHIESTO</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            {dipendentiFiltrati && dipendentiFiltrati.length > 0 ? (
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
                  {dipendentiFiltrati.map((dipendente) =>
                    dipendente.ferie.length > 0 ? (
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
                            <Button size="sm" className="m-2">
                              Approva
                            </Button>
                            <Button size="sm" className="btn-danger">
                              Rifiuta
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={dipendente.id}>
                        <td>
                          {dipendente.nome} {dipendente.cognome}
                        </td>
                        <td colSpan="5">Nessun record registrato</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            ) : (
              <Col>
                <h1>Nessun record registrato!</h1>
                <Button onClick={() => navigate(`/home`)}>Torna alla Home</Button>
              </Col>
            )}
          </Row>
        </>
      )}
    </Row>
  );
};
export default Ferie;
