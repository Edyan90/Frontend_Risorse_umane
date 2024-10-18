import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setListPresenze } from "../redux/actions";
import { Button, Table, Col, Row, Card, Form } from "react-bootstrap";

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
      setListaCompleta(data.content);
      console.log("Stato aggiornato, listaPresenze:", lista);
    } catch (error) {
      console.error("Errore nella fetch presenze", error);
    } finally {
      setLoading(false);
    }
  };
  const [listaCompleta, setListaCompleta] = useState([]);
  const [filtri, setFiltri] = useState({
    nome: "",
    cognome: "",
    presenzaID: "",
    stato: "",
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltri((prev) => ({ ...prev, [name]: value }));
  };

  const filtraDipendenti = () => {
    return listaCompleta.filter((dipendente) => {
      if (!dipendente.presenze || dipendente.presenze.length === 0) {
        return false;
      }
      const ferieFiltrate = dipendente.presenze.filter((presenza) => {
        return (
          (filtri.presenzaID === "" || presenza.id.toLowerCase().startsWith(filtri.presenzaID.toLowerCase())) &&
          (filtri.stato === "" || presenza.statoPresenza.toLowerCase().includes(filtri.stato.toLowerCase()))
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
              <Form.Group controlId="presenzaID">
                <Form.Control
                  placeholder="@presenzaID"
                  type="text"
                  name="presenzaID"
                  value={filtri.presenzaID}
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
                  <option value="NON_APPROVATA">NON_APPROVATA</option>
                  <option value="IN_ATTESA">IN_ATTESA</option>
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
                    <th>Presenza ID</th>
                    <th>Data</th>
                    <th>Presente</th>
                    <th>Stato Presenza</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {dipendentiFiltrati.map((dipendente) =>
                    dipendente.presenze.length > 0 ? (
                      dipendente.presenze.map((presenza) => (
                        <tr key={presenza.id}>
                          <td>
                            {dipendente.nome} {dipendente.cognome}
                          </td>
                          <td>{presenza.id}</td>
                          <td>{presenza.data}</td>
                          <td>{presenza.presente ? "Sì" : "No"}</td>
                          <td>{presenza.statoPresenza}</td>
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
export default Presenze;
