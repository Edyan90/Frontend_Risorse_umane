import { useEffect, useState } from "react";
import { setListaDipendenti } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dipendenti = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lista = useSelector((state) => state.listaDipendenti.listaDipendenti);
  console.log("listadipedenti", lista);

  const listaDipendenti = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("http://localhost:3001/dipendenti", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Errore nella fetch lista-dipendenti!");
      }
      const data = await resp.json();
      console.log("Dati ricevuti:", data);
      dispatch(setListaDipendenti(data));
      setListaCompleta(data.content);
    } catch (error) {
      console.error("Errore nella fetch lista-dipendenti!", error);
    }
  };
  const [listaCompleta, setListaCompleta] = useState([]);
  const [filtri, setFiltri] = useState({
    nome: "",
    cognome: "",
    ruolo: "",
    email: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltri((prev) => ({ ...prev, [name]: value }));
  };

  const filtraDipendenti = () => {
    return listaCompleta.filter((dipendente) => {
      return (
        (filtri.nome === "" || dipendente.nome.toLowerCase().includes(filtri.nome.toLowerCase())) &&
        (filtri.cognome === "" || dipendente.cognome.toLowerCase().includes(filtri.cognome.toLowerCase())) &&
        (filtri.ruolo === "" || dipendente.ruolo.toLowerCase().includes(filtri.ruolo.toLowerCase())) &&
        (filtri.email === "" || dipendente.email.toLowerCase().includes(filtri.email.toLowerCase()))
      );
    });
  };
  useEffect(() => {
    listaDipendenti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dipendentiFiltrati = filtraDipendenti();
  return (
    <>
      <Row>
        <h3 className="text-start text-light">Ricerca per:</h3>
        <Form className="d-flex gap-3 justify-content-center">
          <Form.Group controlId="nome">
            <Form.Control
              placeholder="@nome"
              type="text"
              name="nome"
              value={filtri.nome}
              onChange={handleFilterChange}
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="cognome">
            <Form.Control
              placeholder="@cognome"
              type="text"
              name="cognome"
              value={filtri.cognome}
              onChange={handleFilterChange}
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="ruolo">
            <Form.Control
              placeholder="@ruolo"
              type="text"
              name="ruolo"
              value={filtri.ruolo}
              onChange={handleFilterChange}
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              placeholder="@email"
              type="text"
              name="email"
              value={filtri.email}
              onChange={handleFilterChange}
              className="custom-input"
            />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        {dipendentiFiltrati.length > 0 ? (
          dipendentiFiltrati.map((dipendente) => (
            <Col key={dipendente.id} lg={4}>
              <Card style={{ width: "15rem" }} className="p-4 m-3">
                <Card.Img variant="top" src={`${dipendente.avatar}`} />
                <Card.Body>
                  <Card.Title>{`${dipendente.nome} ${dipendente.cognome}`}</Card.Title>
                  <Card.Text>Ruolo: {`${dipendente.ruolo}`}</Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>
                    Visita profilo
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h1>Nessun dipendente trovato.</h1>
        )}
      </Row>
    </>
  );
};

export default Dipendenti;
