import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { setListAssenze } from "../redux/actions";

const Assenze = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  const lista = useSelector((state) => state.listaAssenze.listaAssenze);
  console.log(lista);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listaCompleta, setListaCompleta] = useState([]);
  const [filtri, setFiltri] = useState({
    nome: "",
    cognome: "",
    assenzaID: "",
    stato: "",
  });

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
        throw new Error("Errore nella fetch lista assenze");
      }
      const data = await resp.json();
      console.log("dati ricevuti", data.content);
      dispatch(setListAssenze(data.content));
      setListaCompleta(data.content);
    } catch (error) {
      console.error("Errore nella fetch lista assenze", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltri((prev) => ({ ...prev, [name]: value }));
  };

  const filtraDipendenti = () => {
    return listaCompleta.filter((dipendente) => {
      if (!dipendente.assenze || dipendente.assenze.length === 0) {
        return false;
      }
      const assenzeFiltrate = dipendente.assenze.filter((assenza) => {
        return (
          (filtri.assenzaID === "" || assenza.id.toString().toLowerCase().includes(filtri.assenzaID.toLowerCase())) &&
          (filtri.stato === "" || assenza.stato.toLowerCase().includes(filtri.stato.toLowerCase()))
        );
      });
      const nomefiltrato = filtri.nome === "" || dipendente.nome.toLowerCase().includes(filtri.nome.toLowerCase());
      const cognomefiltrato =
        filtri.cognome === "" || dipendente.cognome.toLowerCase().includes(filtri.cognome.toLowerCase());
      return assenzeFiltrate.length > 0 && nomefiltrato && cognomefiltrato;
    });
  };

  useEffect(() => {
    listaAssenze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dipendentiFiltrati = filtraDipendenti();

  return (
    <>
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
              <Form.Group controlId="assenzaID">
                <Form.Control
                  placeholder="@assenzaID"
                  type="text"
                  name="assenzaID"
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
                  <option value="NON_APPROVATA">NON APPROVATA</option>
                  <option value="IN_ATTESA">IN ATTESA</option>
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
                    <th>Assenza ID</th>
                    <th>Data</th>
                    <th>Motivo</th>
                    <th>Stato</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {dipendentiFiltrati.map((dipendente) =>
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
                <h1>Nessuna assenza registrata!</h1>
                <Button onClick={() => navigate(`/home`)}>Torna alla Home</Button>
              </Col>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default Assenze;
