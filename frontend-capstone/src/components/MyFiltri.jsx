import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyFiltri = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  const navigate = useNavigate();
  const [listaCompleta, setListaCompleta] = useState([]);
  const [search, setSearch] = useState({});
  const [filtri, setFiltri] = useState({
    endpoint: "",
    azione: "",
    dipendenteID: "",
    id: "",
    nome: "",
    cognome: "",
    email: "",
    stato: "",
    username: "",
    stipendio: "",
    password: "",
    data: "", //dataInizio e dataAssunzione
    data2: "",
    motivo: "",
    boolean: false,
    importoTotale: 0,
    ore: 0,
    nomeCRUD: "",
    cognomeCRUD: "",
    emailCRUD: "",
  });
  const [cardSelezionata, setCardSelezionata] = useState(null);

  const selezionato = (id) => {
    setCardSelezionata(id);
    setFiltri((prevFiltri) => ({ ...prevFiltri, dipendenteID: id }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === "boolean") {
      parsedValue = value === "true" ? true : value === "false" ? false : value;
    } else if (["importoTotale", "ore"].includes(name)) {
      parsedValue = Number(value);
    }
    setFiltri((prev) => ({ ...prev, [name]: parsedValue }));
  };

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

      setListaCompleta(data.content);
    } catch (error) {
      console.error("Errore nella fetch lista-dipendenti!", error);
    }
  };
  const searchDipendenteDB = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(`http://localhost:3001/dipendenti/${filtri.dipendenteID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Errore nella fetch search-dipendente!");
      }
      const data = await resp.json();
      console.log("Dati ricevuti dal search:", data);

      setSearch(data);
    } catch (error) {
      console.error("Errore nella fetch lista-dipendenti!", error);
    }
  };

  const filtraDipendenti = () => {
    return listaCompleta.filter((dipendente) => {
      return (
        (filtri.nome === "" || dipendente.nome.toLowerCase().includes(filtri.nome.toLowerCase())) &&
        (filtri.cognome === "" || dipendente.cognome.toLowerCase().includes(filtri.cognome.toLowerCase())) &&
        (filtri.email === "" || dipendente.email.toLowerCase().includes(filtri.email.toLowerCase()))
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchDipendenteDB();
  };
  const dipendentiFiltrati = filtraDipendenti();
  useEffect(() => {
    listaDipendenti();
  }, []);
  useEffect(() => {
    console.log(search);
    console.log(filtri.dipendenteID);
  }, [filtri.dipendenteID]);

  return (
    <div>
      <Alert>
        Questa sezione è dedicata alla creazione, modifica, ricerca ed eliminazione di ciò che riguarda i dipendenti.
        Per creare, modificare, eliminare le proprie assenze,presenze o ferie andare alla sezione profilo personale
      </Alert>
      {/*  -------------------------------------------------ARGOMENTO--------------------------------------------
      -------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------- */}
      <Form className="text-start text-black" onSubmit={handleSubmit}>
        <Form.Group controlId="endpoint" className="mb-4  w-25">
          <Form.Label>Seleziona l&apos;argomento</Form.Label>
          <Form.Control
            as="select"
            name="endpoint"
            value={filtri.endpoint}
            onChange={handleFilterChange}
            className="custom-input"
          >
            <option value="">Argomento</option>
            <option value="dipendenti">Dipendenti</option>
            <option value="assenze">Assenze</option>
            <option value="ferie">Ferie</option>
            <option value="bustepaga">Bustepaga</option>
            <option value="presenze">Presenze</option>
          </Form.Control>
        </Form.Group>
        {/*  -------------------------------------------------AZIONE--------------------------------------------
      -------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------- */}
        <Form.Group controlId="azione" className="mb-4 w-25">
          <Form.Label>Seleziona l&apos;azione che vuoi fare</Form.Label>
          <Form.Control
            as="select"
            name="azione"
            value={filtri.azione}
            onChange={handleFilterChange}
            className="custom-input"
          >
            <option value="">Azione:</option>
            <option value="GET">CERCA</option>
            <option value="POST">CREA</option>
            <option value="PUT">MODIFICA</option>
            <option value="DELETE">ELIMINA</option>
            {(filtri.endpoint === "assenze" || filtri.endpoint === "presenze" || filtri.endpoint === "ferie") && (
              <option value="PATCH">APPROVA RECORDS</option>
            )}
          </Form.Control>
        </Form.Group>
        {filtri.endpoint === "dipendenti" && (filtri.azione === "GET" || filtri.azione === "DELETE") ? (
          <>
            {/*  -------------------------------------------------DIPENDENTI--------------------------------------------
            -------------------------------------------------------------------------------------------------------
            ------------------------------------------------------------------------------------------------------- */}
            <h6>Inserisci i parametri di ricerca:</h6>
            <Form.Group controlId="dipendenteID" className="w-50">
              <Form.Label>Dipendente ID:</Form.Label>
              <Form.Control
                placeholder="@dipendenteID"
                type="text"
                name="dipendenteID"
                value={filtri.dipendenteID}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Button type="submit" className="mt-2">
              Invia
            </Button>
            <h6 className="mt-4">Oppure per nomenclatura</h6>
            <div className="d-flex gap-3">
              <Form.Group controlId="nome">
                <Form.Label>Nome:</Form.Label>
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
                <Form.Label>Cognome:</Form.Label>
                <Form.Control
                  placeholder="@cognome dipendente"
                  type="text"
                  name="cognome"
                  value={filtri.cognome}
                  onChange={handleFilterChange}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  placeholder="@email dipendente"
                  type="text"
                  name="email"
                  value={filtri.email}
                  onChange={handleFilterChange}
                  className="custom-input"
                />
              </Form.Group>
            </div>
            {search.id ? (
              <div className="bg-light rounded mt-5 w-50">
                <h4>Dipendente trovato:</h4>
                <div>
                  <h6>
                    {search.nome} {search.cognome}
                  </h6>
                  <p>ID: {search.id}</p>
                </div>
              </div>
            ) : (
              <div>
                <Row>
                  {(filtri.nome.length > 0 || filtri.cognome.length > 0 || filtri.email.length > 0) &&
                  dipendentiFiltrati.length > 0
                    ? dipendentiFiltrati.map((dipendente) => (
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
                    : (filtri.nome.length > 0 || filtri.cognome.length > 0 || filtri.email.length > 0) && (
                        <h1>Nessun dipendente trovato.</h1>
                      )}
                </Row>
              </div>
            )}
          </>
        ) : (
          filtri.endpoint === "dipendenti" &&
          (filtri.azione === "PUT" || filtri.azione === "POST" || filtri.azione === "PATCH") && (
            <div>
              {filtri.azione === "PUT" && (
                <>
                  <h6>Inserisci i parametri di ricerca:</h6>
                  <Form.Group controlId="dipendenteID" className="w-50">
                    <Form.Label>Dipendente ID:</Form.Label>
                    <Form.Control
                      placeholder="@dipendenteID"
                      type="text"
                      name="dipendenteID"
                      value={filtri.dipendenteID}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Button type="submit" className="mt-2">
                    Invia
                  </Button>
                  <h6 className="mt-4">Oppure per nomenclatura</h6>
                  <div className="d-flex gap-3">
                    <Form.Group controlId="nome">
                      <Form.Label>Nome:</Form.Label>
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
                      <Form.Label>Cognome:</Form.Label>
                      <Form.Control
                        placeholder="@cognome dipendente"
                        type="text"
                        name="cognome"
                        value={filtri.cognome}
                        onChange={handleFilterChange}
                        className="custom-input"
                      />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        placeholder="@email dipendente"
                        type="text"
                        name="email"
                        value={filtri.email}
                        onChange={handleFilterChange}
                        className="custom-input"
                      />
                    </Form.Group>
                  </div>
                  {search.id ? (
                    <div className="bg-light rounded mt-5 w-50">
                      <h4>Dipendente trovato:</h4>
                      <div>
                        <h6>
                          {search.nome} {search.cognome}
                        </h6>
                        <p>ID: {search.id}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Row>
                        {(filtri.nome.length > 0 || filtri.cognome.length > 0 || filtri.email.length > 0) &&
                        dipendentiFiltrati.length > 0
                          ? dipendentiFiltrati.map((dipendente) => (
                              <Col key={dipendente.id} lg={4}>
                                <Card style={{ width: "15rem" }} className="p-4 m-3">
                                  <Card.Img variant="top" src={`${dipendente.avatar}`} />
                                  <Card.Body>
                                    <Card.Title>{`${dipendente.nome} ${dipendente.cognome}`}</Card.Title>
                                    <Card.Text>Ruolo: {`${dipendente.ruolo}`}</Card.Text>
                                    <Button variant="primary" onClick={() => selezionato(dipendente.id)}>
                                      Seleziona dipendente
                                    </Button>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))
                          : (filtri.nome.length > 0 || filtri.cognome.length > 0 || filtri.email.length > 0) && (
                              <h1>Nessun dipendente trovato.</h1>
                            )}
                      </Row>
                    </div>
                  )}
                </>
              )}
              {filtri.dipendenteID.length > 0 && (
                <div>
                  <h6 className="mt-5">Crea nuovo dipendente o modifica il dipendente trovato:</h6>
                  <Form.Group controlId="nomeCRUD">
                    <Form.Label>Inserisci Nome:</Form.Label>
                    <Form.Control
                      placeholder="@nome dipendente"
                      type="text"
                      name="nomeCRUD"
                      value={filtri.nomeCRUD}
                      onChange={handleFilterChange}
                      required
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="cognomeCRUD">
                    <Form.Label>Inserisci Cognome:</Form.Label>
                    <Form.Control
                      placeholder="@cognome dipendente"
                      type="text"
                      name="cognomeCRUD"
                      value={filtri.cognomeCRUD}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="emailCRUD">
                    <Form.Label>Inserisci Email:</Form.Label>
                    <Form.Control
                      placeholder="@email dipendente"
                      type="text"
                      name="email"
                      value={filtri.emailCRUD}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="statoCRUD">
                    <Form.Label>Aggiungi Ruolo:</Form.Label>
                    <Form.Control
                      as="select"
                      name="stato"
                      value={filtri.stato}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    >
                      <option value="">Seleziona Ruolo</option>
                      <option value="DIPENDENTE">DIPENDENTE</option>
                      <option value="MANAGER">MANAGER</option>
                      {dipendente.ruolo === "ADMIN" && <option value="ADMIN">ADMIN</option>}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="username">
                    <Form.Label>Inserisci Username:</Form.Label>
                    <Form.Control
                      placeholder="@username dipendente"
                      type="text"
                      name="username"
                      value={filtri.username}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="stipendio">
                    <Form.Label>Inserisci stipendio:</Form.Label>
                    <Form.Control
                      placeholder="@stipendio dipendente"
                      type="number"
                      name="stipendio"
                      step="0.01"
                      value={filtri.stipendio}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Inserisci password:</Form.Label>
                    <Form.Control
                      placeholder="@password dipendente"
                      type="password"
                      name="password"
                      value={filtri.password}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="data">
                    <Form.Label>Data Assunzione:</Form.Label>
                    <Form.Control
                      type="date"
                      name="data"
                      value={filtri.data}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Button>Submit</Button>
                </div>
              )}
              {filtri.azione === "POST" && (
                <div>
                  {" "}
                  <h6 className="mt-5">Crea nuovo dipendente o modifica il dipendente trovato:</h6>
                  <Form.Group controlId="nomeCRUD">
                    <Form.Label>Inserisci Nome:</Form.Label>
                    <Form.Control
                      placeholder="@nome dipendente"
                      type="text"
                      name="nomeCRUD"
                      value={filtri.nomeCRUD}
                      onChange={handleFilterChange}
                      required
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="cognomeCRUD">
                    <Form.Label>Inserisci Cognome:</Form.Label>
                    <Form.Control
                      placeholder="@cognome dipendente"
                      type="text"
                      name="cognomeCRUD"
                      value={filtri.cognomeCRUD}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="emailCRUD">
                    <Form.Label>Inserisci Email:</Form.Label>
                    <Form.Control
                      placeholder="@email dipendente"
                      type="text"
                      name="email"
                      value={filtri.emailCRUD}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="statoCRUD">
                    <Form.Label>Aggiungi Ruolo:</Form.Label>
                    <Form.Control
                      as="select"
                      name="stato"
                      value={filtri.stato}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    >
                      <option value="">Seleziona Ruolo</option>
                      <option value="DIPENDENTE">DIPENDENTE</option>
                      <option value="MANAGER">MANAGER</option>
                      {dipendente.ruolo === "ADMIN" && <option value="ADMIN">ADMIN</option>}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="username">
                    <Form.Label>Inserisci Username:</Form.Label>
                    <Form.Control
                      placeholder="@username dipendente"
                      type="text"
                      name="username"
                      value={filtri.username}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="stipendio">
                    <Form.Label>Inserisci stipendio:</Form.Label>
                    <Form.Control
                      placeholder="@stipendio dipendente"
                      type="number"
                      name="stipendio"
                      step="0.01"
                      value={filtri.stipendio}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Inserisci password:</Form.Label>
                    <Form.Control
                      placeholder="@password dipendente"
                      type="password"
                      name="password"
                      value={filtri.password}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="data">
                    <Form.Label>Data Assunzione:</Form.Label>
                    <Form.Control
                      type="date"
                      name="data"
                      value={filtri.data}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Button>Submit</Button>
                </div>
              )}
            </div>
          )
        )}
        {filtri.endpoint === "assenze" && (filtri.azione === "GET" || filtri.azione === "DELETE") ? (
          <div className="w-50">
            {/*  -------------------------------------------------ASSENZE--------------------------------------------
      -------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------- */}
            <Form.Group controlId="id">
              <Form.Label>Ricerca per Assenza ID:</Form.Label>
              <Form.Control
                placeholder="@assenza ID"
                type="text"
                name="id"
                value={filtri.id}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="dipendenteID">
              <Form.Label>Ricerca per Dipendente ID:</Form.Label>
              <Form.Control
                placeholder="@dipendente ID"
                type="text"
                name="dipendenteID"
                value={filtri.dipendenteID}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="nome">
              <Form.Label>Ricerca per Nome:</Form.Label>
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
              <Form.Label>Ricerca per Cognome:</Form.Label>
              <Form.Control
                placeholder="@cognome dipendente"
                type="text"
                name="cognome"
                value={filtri.cognome}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Ricerca per Email:</Form.Label>
              <Form.Control
                placeholder="@email dipendente"
                type="text"
                name="email"
                value={filtri.email}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="stato">
              <Form.Label>Ricerca per Stato:</Form.Label>
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
            <Form.Group controlId="dataInizio">
              <Form.Label>Ricerca per Data Inizio Ferie...</Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={filtri.data}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="dataFine">
              <Form.Label>...e Data Fine Ferie:</Form.Label>
              <Form.Control
                type="date"
                name="data2"
                value={filtri.data2}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
          </div>
        ) : (
          filtri.endpoint === "assenze" && (
            <div>
              {filtri.azione === "PUT" && (
                <div>
                  <h6>Ricerca Assenza/e per:</h6>
                  <Form.Group controlId="assenzaID">
                    <Form.Label>Ricerca per Assenza ID:</Form.Label>
                    <Form.Control
                      placeholder="@assenza ID"
                      type="text"
                      name="id"
                      value={filtri.id}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="dipendenteID">
                    <Form.Label>Ricerca dipendente per Dipendente ID:</Form.Label>
                    <Form.Control
                      placeholder="@dipendente ID"
                      type="text"
                      name="dipendenteID"
                      value={filtri.dipendenteID}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="nome">
                    <Form.Label>Ricerca dipendente per Nome:</Form.Label>
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
                    <Form.Label>Ricerca dipendente per Cognome:</Form.Label>
                    <Form.Control
                      placeholder="@cognome dipendente"
                      type="text"
                      name="cognome"
                      value={filtri.cognome}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Ricerca dipendente per Email:</Form.Label>
                    <Form.Control
                      placeholder="@email dipendente"
                      type="text"
                      name="email"
                      value={filtri.email}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <h6 className="mt-4">Crea o modifica Assenza per il dipendente</h6>
                  <Form.Group controlId="data">
                    <Form.Label>Inserisci data assenza:</Form.Label>
                    <Form.Control
                      type="date"
                      name="data"
                      value={filtri.data}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="motivo">
                    <Form.Label>Inserisci motivo:</Form.Label>
                    <Form.Control
                      placeholder="@motivo/giustificazione"
                      type="text"
                      name="motivo"
                      value={filtri.motivo}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                </div>
              )}

              {filtri.azione === "POST" && (
                <div>
                  <Form.Group controlId="dipendenteID">
                    <Form.Label>Ricerca dipendente per Dipendente ID:</Form.Label>
                    <Form.Control
                      placeholder="@dipendente ID"
                      type="text"
                      name="dipendenteID"
                      value={filtri.dipendenteID}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="nome">
                    <Form.Label>Ricerca dipendente per Nome:</Form.Label>
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
                    <Form.Label>Ricerca dipendente per Cognome:</Form.Label>
                    <Form.Control
                      placeholder="@cognome dipendente"
                      type="text"
                      name="cognome"
                      value={filtri.cognome}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Ricerca dipendente per Email:</Form.Label>
                    <Form.Control
                      placeholder="@email dipendente"
                      type="text"
                      name="email"
                      value={filtri.email}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <h6 className="mt-4">Crea o modifica Assenza per il dipendente</h6>
                  <Form.Group controlId="data">
                    <Form.Label>Inserisci data assenza:</Form.Label>
                    <Form.Control
                      type="date"
                      name="data"
                      value={filtri.data}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="motivo">
                    <Form.Label>Inserisci motivo:</Form.Label>
                    <Form.Control
                      placeholder="@motivo/giustificazione"
                      type="text"
                      name="motivo"
                      value={filtri.motivo}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                </div>
              )}
              {filtri.azione === "PATCH" && (
                <Form.Group controlId="stato">
                  <Form.Label>Inserisci Stato:</Form.Label>
                  <Form.Control
                    as="select"
                    name="stato"
                    value={filtri.stato}
                    onChange={handleFilterChange}
                    className="custom-input"
                    required
                  >
                    <option value="">Seleziona Stato</option>
                    <option value="APPROVATO">APPROVATO</option>
                    <option value="NON_APPROVATA">NON APPROVATA</option>
                    <option value="IN_ATTESA">IN ATTESA</option>
                  </Form.Control>
                </Form.Group>
              )}
            </div>
          )
        )}
        {filtri.endpoint === "presenze" && (filtri.azione === "GET" || filtri.azione === "DELETE") ? (
          <div className="w-50">
            {/*  -------------------------------------------------PRESENZE--------------------------------------------
      -------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------- */}
            <Form.Group controlId="id">
              <Form.Label>presenze ID:</Form.Label>
              <Form.Control
                placeholder="@presenze ID"
                type="text"
                name="id"
                value={filtri.id}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="dipendenteID">
              <Form.Label>Dipendente ID:</Form.Label>
              <Form.Control
                placeholder="@dipendente ID"
                type="text"
                name="dipendenteID"
                value={filtri.nome}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="nome">
              <Form.Label>Nome:</Form.Label>
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
              <Form.Label>Cognome:</Form.Label>
              <Form.Control
                placeholder="@cognome dipendente"
                type="text"
                name="cognome"
                value={filtri.cognome}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                placeholder="@email dipendente"
                type="text"
                name="email"
                value={filtri.email}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="stato">
              <Form.Label>Stato:</Form.Label>
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
            <Form.Group controlId="data">
              <Form.Label>Data:</Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={filtri.data}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
          </div>
        ) : (
          filtri.endpoint === "presenze" && (
            <div>
              {filtri.azione === "PUT" && (
                <div>
                  <h6>Ricerca Presenza/e per:</h6>
                  <Form.Group controlId="assenzaID">
                    <Form.Label>Ricerca per Presenza ID:</Form.Label>
                    <Form.Control
                      placeholder="@presenza ID"
                      type="text"
                      name="id"
                      value={filtri.id}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="dipendenteID">
                    <Form.Label>Ricerca dipendente per Dipendente ID:</Form.Label>
                    <Form.Control
                      placeholder="@dipendente ID"
                      type="text"
                      name="dipendenteID"
                      value={filtri.dipendenteID}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="nome">
                    <Form.Label>Ricerca dipendente per Nome:</Form.Label>
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
                    <Form.Label>Ricerca dipendente per Cognome:</Form.Label>
                    <Form.Control
                      placeholder="@cognome dipendente"
                      type="text"
                      name="cognome"
                      value={filtri.cognome}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Ricerca dipendente per Email:</Form.Label>
                    <Form.Control
                      placeholder="@email dipendente"
                      type="text"
                      name="email"
                      value={filtri.email}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <h6 className="mt-4">Crea o modifica Presenza per il dipendente</h6>
                  <Form.Group controlId="data">
                    <Form.Label>Inserisci data presenza:</Form.Label>
                    <Form.Control
                      type="date"
                      name="data"
                      value={filtri.data}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="boolean">
                    <Form.Label>Confermi presenza:</Form.Label>
                    <Form.Control
                      as="select"
                      name="boolean"
                      value={filtri.boolean}
                      onChange={handleFilterChange}
                      className="custom-input"
                    >
                      <option value="">Seleziona Stato</option>
                      <option value="true">SI</option>
                      <option value="false">NO</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              )}
              {filtri.endpoint === "presenze" && filtri.azione === "POST" && (
                <div>
                  <Form.Group controlId="dipendenteID">
                    <Form.Label>Ricerca dipendente per Dipendente ID:</Form.Label>
                    <Form.Control
                      placeholder="@dipendente ID"
                      type="text"
                      name="dipendenteID"
                      value={filtri.dipendenteID}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="nome">
                    <Form.Label>Ricerca dipendente per Nome:</Form.Label>
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
                    <Form.Label>Ricerca dipendente per Cognome:</Form.Label>
                    <Form.Control
                      placeholder="@cognome dipendente"
                      type="text"
                      name="cognome"
                      value={filtri.cognome}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Ricerca dipendente per Email:</Form.Label>
                    <Form.Control
                      placeholder="@email dipendente"
                      type="text"
                      name="email"
                      value={filtri.email}
                      onChange={handleFilterChange}
                      className="custom-input"
                    />
                  </Form.Group>
                  <h6 className="mt-4">Crea o modifica Presenza per il dipendente</h6>
                  <Form.Group controlId="data">
                    <Form.Label>Inserisci data presenza:</Form.Label>
                    <Form.Control
                      type="date"
                      name="data"
                      value={filtri.data}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="boolean">
                    <Form.Label>Confermi presenza:</Form.Label>
                    <Form.Control
                      as="select"
                      name="boolean"
                      value={filtri.boolean}
                      onChange={handleFilterChange}
                      className="custom-input"
                      required
                    >
                      <option value="">Seleziona Stato</option>
                      <option value="true">SI</option>
                      <option value="false">NO</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              )}
              {filtri.azione === "PATCH" && (
                <Form.Group controlId="stato" className="w-25">
                  <Form.Label>Inserisci Stato:</Form.Label>
                  <Form.Control
                    as="select"
                    name="stato"
                    value={filtri.stato}
                    onChange={handleFilterChange}
                    className="custom-input"
                    required
                  >
                    <option value="">Seleziona Stato</option>
                    <option value="APPROVATO">APPROVATO</option>
                    <option value="NON_APPROVATA">NON APPROVATA</option>
                    <option value="IN_ATTESA">IN ATTESA</option>
                  </Form.Control>
                </Form.Group>
              )}
            </div>
          )
        )}
        {/*  -------------------------------------------------FERIE--------------------------------------------
      -------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------- */}
        {filtri.endpoint === "ferie" && filtri.azione !== "POST" && filtri.azione !== "PUT" ? (
          <div className="w-50">
            <Form.Group controlId="id">
              <Form.Label>Ricerca per Ferie ID:</Form.Label>
              <Form.Control
                placeholder="@ferie ID"
                type="text"
                name="id"
                value={filtri.id}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="dipendenteID">
              <Form.Label>Ricerca per Dipendente ID:</Form.Label>
              <Form.Control
                placeholder="@dipendente ID"
                type="text"
                name="dipendenteID"
                value={filtri.nome}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="nome">
              <Form.Label>Ricerca per Nome:</Form.Label>
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
              <Form.Label>Ricerca per Cognome:</Form.Label>
              <Form.Control
                placeholder="@cognome dipendente"
                type="text"
                name="cognome"
                value={filtri.cognome}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Ricerca per Email:</Form.Label>
              <Form.Control
                placeholder="@email dipendente"
                type="text"
                name="email"
                value={filtri.email}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            {filtri.azione === "GET" && (
              <div>
                <Form.Group controlId="data">
                  <Form.Label>Ricerca per Data Inizio Ferie:</Form.Label>
                  <Form.Control
                    type="date"
                    name="data"
                    value={filtri.data}
                    onChange={handleFilterChange}
                    className="custom-input"
                  />
                </Form.Group>
                <Form.Group controlId="data">
                  <Form.Label>Ricerca per Data Fine Ferie:</Form.Label>
                  <Form.Control
                    type="date"
                    name="data2"
                    value={filtri.data2}
                    onChange={handleFilterChange}
                    className="custom-input"
                  />
                </Form.Group>
              </div>
            )}
            {filtri.endpoint === "ferie" && filtri.azione !== "PUT" && filtri.azione !== "DELETE" && (
              <div>
                <Form.Group controlId="stato">
                  <Form.Label>Ricerca per Stato:</Form.Label>
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
              </div>
            )}
          </div>
        ) : (
          filtri.endpoint === "ferie" && (
            <Alert>
              Chiedere al dipendente interessato di inoltrare/modificare la richiesta delle ferie, se quest&apos;ultimo
              indisposto o si rifuta chiedere all&apos;Admin dietro autorizzazione del responsabile incaricato
            </Alert>
          )
        )}
        {/*  -------------------------------------------------BustePaga--------------------------------------------
      -------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------- */}
        {filtri.endpoint === "bustepaga" && filtri.azione !== "POST" && filtri.azione !== "PUT" ? (
          <div className="w-50">
            <Form.Group controlId="id">
              <Form.Label>Ricerca per bustepaga ID:</Form.Label>
              <Form.Control
                placeholder="@ferie ID"
                type="text"
                name="id"
                value={filtri.id}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="dipendenteID">
              <Form.Label>Ricerca per Dipendente ID:</Form.Label>
              <Form.Control
                placeholder="@dipendente ID"
                type="text"
                name="dipendenteID"
                value={filtri.nome}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="nome">
              <Form.Label>Ricerca per Nome:</Form.Label>
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
              <Form.Label>Ricerca per Cognome:</Form.Label>
              <Form.Control
                placeholder="@cognome dipendente"
                type="text"
                name="cognome"
                value={filtri.cognome}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Ricerca per Email:</Form.Label>
              <Form.Control
                placeholder="@email dipendente"
                type="text"
                name="email"
                value={filtri.email}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
          </div>
        ) : (
          filtri.endpoint === "bustepaga" &&
          filtri.azione === "POST" && (
            <div>
              <h6>Ricerca dipendente:</h6>
              <Form.Group controlId="dipendenteID">
                <Form.Label>Ricerca per Dipendente ID:</Form.Label>
                <Form.Control
                  placeholder="@dipendente ID"
                  type="text"
                  name="dipendenteID"
                  value={filtri.nome}
                  onChange={handleFilterChange}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="nome">
                <Form.Label>Ricerca per Nome:</Form.Label>
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
                <Form.Label>Ricerca per Cognome:</Form.Label>
                <Form.Control
                  placeholder="@cognome dipendente"
                  type="text"
                  name="cognome"
                  value={filtri.cognome}
                  onChange={handleFilterChange}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Ricerca per Email:</Form.Label>
                <Form.Control
                  placeholder="@email dipendente"
                  type="text"
                  name="email"
                  value={filtri.email}
                  onChange={handleFilterChange}
                  className="custom-input"
                />
              </Form.Group>
              <h6>Creazione Bustapaga</h6>
              <Form.Group controlId="data">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  name="data"
                  value={filtri.data}
                  onChange={handleFilterChange}
                  isInvalid={!filtri.data || new Date(filtri.data) > new Date()}
                  required
                />
              </Form.Group>

              <Form.Group controlId="importoTotale">
                <Form.Label>Importo Totale</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="importoTotale"
                  value={filtri.importoTotale}
                  onChange={handleFilterChange}
                  isInvalid={!filtri.importoTotale || filtri.importoTotale <= 0}
                  required
                />
              </Form.Group>

              <Form.Group controlId="oreStraordinario">
                <Form.Label>Ore Straordinario</Form.Label>
                <Form.Control
                  type="number"
                  name="oreStraordinario"
                  value={filtri.oreStraordinario}
                  onChange={handleFilterChange}
                  min="0"
                  isInvalid={filtri.oreStraordinario < 0}
                  required
                />
              </Form.Group>
            </div>
          )
        )}
      </Form>
    </div>
  );
};
export default MyFiltri;
