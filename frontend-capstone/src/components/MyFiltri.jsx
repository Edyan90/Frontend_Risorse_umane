import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyFiltri = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  const navigate = useNavigate();
  const [listaCompleta, setListaCompleta] = useState([]);
  const [listaGenerica, setListaGenerica] = useState([]);
  const [search, setSearch] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [messaggio, setMessaggio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRicercaID, setShowRicercaID] = useState(false);
  const [toogle, setToogle] = useState(false);
  const [conferma, setConferma] = useState(false);
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
    if (!toogle) {
      setCardSelezionata(id);
      setFiltri((prevFiltri) => ({ ...prevFiltri, dipendenteID: id }));
      setShowForm(true);
      setToogle(true);
    } else {
      setCardSelezionata(null);
      setFiltri((prevFiltri) => ({ ...prevFiltri, dipendenteID: "" }));
      setShowForm(false);
      setToogle(false);
    }
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
        const errorResponse = await resp.json();
        throw new Error(errorResponse.message || "Errore nella fetch search-dipendente!");
      }
      const data = await resp.json();
      console.log("Dati ricevuti dal search:", data);

      setSearch(data);
    } catch (error) {
      alert(error);
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
  const URLgenerator = () => {
    let URL;
    switch (filtri.endpoint) {
      case "dipendenti":
        switch (filtri.azione) {
          case "POST":
            URL = `http://localhost:3001/${filtri.endpoint}`;
            break;
          case "DELETE":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.dipendenteID}`;
            break;

          case "PUT":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.dipendenteID}`;
            break;
          case "GET":
            URL = `http://localhost:3001/${filtri.endpoint}`;
            break;
          default:
            throw new Error("Definisci il metodo di invio del payload");
        }
        break;
      case "assenze":
        switch (filtri.azione) {
          case "POST":
            URL = `http://localhost:3001/${filtri.endpoint}/assenza-manager`;
            break;
          case "DELETE":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.id}`;
            break;
          case "PUT":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.id}`;
            break;
          case "GET":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.id}`;
            break;
          case "APPROVA RECORDS":
            URL = `http://localhost:3001/${filtri.endpoint}/approvazione-assenza/${filtri.id}`;
            break;
          default:
            throw new Error("Definisci il metodo di invio del payload");
        }
        break;
      case "ferie":
        switch (filtri.azione) {
          case "POST":
            URL = `http://localhost:3001/${filtri.endpoint}/assenza-manager`;
            break;
          case "GET":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.id}`;
            break;
          case "APPROVA RECORDS":
            URL = `http://localhost:3001/${filtri.endpoint}/stato-ferie?approvazione=${filtri.stato}`;
            break;
          default:
            throw new Error("Definisci il metodo di invio del payload");
        }
        break;
      case "bustepaga":
        switch (filtri.azione) {
          case "POST":
            URL = `http://localhost:3001/${filtri.endpoint}/assenza-manager`;
            break;
          case "GET":
            URL = `http://localhost:3001/${filtri.endpoint}/singola/${filtri.id}`;
            break;
          case "APPROVA RECORDS":
            URL = `http://localhost:3001/${filtri.endpoint}/stato-ferie?approvazione=${filtri.stato}`;
            break;
          case "PUT":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.id}`;
            break;
          case "DELETE":
            URL = `http://localhost:3001/${filtri.endpoint}/singola/${filtri.id}`;
            break;
          default:
            throw new Error("Definisci il metodo di invio del payload");
        }
        break;
      case "presenze":
        switch (filtri.azione) {
          case "POST":
            URL = `http://localhost:3001/${filtri.endpoint}`;
            break;
          case "GET":
            URL = `http://localhost:3001/${filtri.endpoint}/singola/${filtri.id}`;
            break;
          case "APPROVA RECORDS":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.id}/status`;
            break;
          case "PUT":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.id}`;
            break;
          case "DELETE":
            URL = `http://localhost:3001/${filtri.endpoint}/${filtri.id}`;
            break;
          default:
            throw new Error("Definisci il metodo di invio del payload");
        }
        break;
      default:
        throw new Error("endpoint non trovato!");
    }
    return URL;
  };

  const optionsGenerator = () => {
    const token = localStorage.getItem("token");
    const dipendenteData = {};
    if (filtri.dipendenteID) {
      dipendenteData.dipendenteID = filtri.dipendenteID;
    }
    if (filtri.nomeCRUD) {
      dipendenteData.nome = filtri.nomeCRUD;
    }

    if (filtri.cognomeCRUD) {
      dipendenteData.cognome = filtri.cognomeCRUD;
    }

    if (filtri.emailCRUD) {
      dipendenteData.email = filtri.emailCRUD;
    }

    if (filtri.stato) {
      dipendenteData.ruolo = filtri.stato;
    }

    if (filtri.username) {
      dipendenteData.username = filtri.username;
    }

    if (filtri.stipendio) {
      dipendenteData.stipendio = parseFloat(filtri.stipendio);
    }

    if (filtri.password) {
      dipendenteData.password = filtri.password;
    }

    if (filtri.data) {
      filtri.endpoint === "dipendenti"
        ? (dipendenteData.dataAssunzione = filtri.data)
        : (dipendenteData.data = filtri.data);
    }
    if (filtri.motivo) {
      dipendenteData.motivo = filtri.motivo;
    }

    let options = {
      method: filtri.azione,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    if (filtri.azione === "POST" || filtri.azione === "DELETE" || filtri.azione == "PUT") {
      options.body = JSON.stringify(dipendenteData);
    }

    return options;
  };

  const creaEditDipendente = async () => {
    try {
      const resp = await fetch(URLgenerator(), optionsGenerator());
      if (!resp.ok) {
        throw new Error("Errore nella fetch creazione dipendenti!");
      }
      if (resp.status === 204) {
        alert("Dipendente eliminato con successo!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      const result = await resp.json();
      console.log("Dipendente creato con successo:", result);
      setMessaggio("Dipendente creato/aggiornato con successo!");
      setShowModal(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setFiltri((prevFiltri) => ({ ...prevFiltri, dipendenteID: "" }));
    } catch (error) {
      console.error("Errore di connessione:", error);
    }
  };

  const crudEntitaFetch = async () => {
    try {
      const resp = await fetch(URLgenerator(), optionsGenerator());
      if (!resp.ok) {
        throw new Error(`Errore nella fetch crud ${filtri.endpoint}-${filtri.azione}!`);
      }
      if (resp.status === 204) {
        alert("Assenza eliminata con successo!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      const result = await resp.json();
      setSearch(result);
      setShowRicercaID(true);
      console.log("Assenza creata con successo:", result);
      setMessaggio("Assenza creata con successo!");
    } catch (error) {
      console.error("Errore di connessione:", error);
    }
  };
  /* const listePerStato = async () => {
    try {
      const resp = await fetch(
        `http://localhost:3001/${filtri.endpoint}/stato?stato=${filtri.stato}`,
        optionsGenerator()
      );
      if (!resp.ok) {
        throw new Error("Errore nella fetch lista per stato!");
      }
      if (resp.status === 204) {
        setTimeout(() => {
          alert("Entità eliminata!");
          window.location.reload();
        }, 2000);
      }
      const result = await resp.json();
      setListaGenerica(result);
      console.log("Lista ottenute: ", result);
    } catch (error) {
      console.error("Errore di connessione:", error);
    }
  }; */
  const listePerData = async () => {
    try {
      const resp = await fetch(
        `http://localhost:3001/${filtri.endpoint}/periodo?startDate=${filtri.data}&endDate=${filtri.data2}`,
        optionsGenerator()
      );
      if (!resp.ok) {
        throw new Error("Errore nella fetch lista per stato!");
      }
      if (resp.status === 204) {
        setTimeout(() => {
          alert("Entità eliminata!");
          window.location.reload();
        }, 2000);
      }
      const result = await resp.json();
      setListaGenerica(result);

      console.log("Lista ottenute: ", result);
    } catch (error) {
      console.error("Errore di connessione:", error);
    }
  };

  const handleSubmit = (e) => {
    if (filtri.endpoint === "dipendenti" && filtri.azione === "GET") {
      e.preventDefault();
      searchDipendenteDB();

      setShowForm(true);
    } else if (filtri.endpoint === "dipendenti" && filtri.azione === "PUT" && filtri.dipendenteID.length > 0) {
      e.preventDefault();
      searchDipendenteDB();
      setShowForm(true);

      if (
        filtri.nomeCRUD ||
        filtri.cognomeCRUD ||
        filtri.email ||
        filtri.stato ||
        filtri.username ||
        filtri.stipendio ||
        filtri.password ||
        filtri.data
      ) {
        creaEditDipendente();
        setShowModal(true);
        alert(`dipendenteID:${filtri.dipendenteID} modificato con successo!`);
      }
    } else if (filtri.endpoint === "dipendenti" && (filtri.azione === "PUT" || filtri.azione === "POST")) {
      e.preventDefault();
      creaEditDipendente();
    } else if (filtri.endpoint === "dipendenti" && filtri.azione === "DELETE") {
      e.preventDefault();
      if (!conferma) {
        searchDipendenteDB();
        alert("Eliminando il dipendente si perderanno anche relativi dati associati ad esso");
      } else {
        alert("Dipendete Eliminato");
        creaEditDipendente();
      }
    } else if (filtri.endpoint === "assenze" || filtri.endpoint === "ferie" || filtri.endpoint === "bustepaga") {
      if (filtri.azione === "GET") {
        if (filtri.dipendenteID.length > 0) {
          searchDipendenteDB();
          setShowRicercaID(true);
        } else if (filtri.id.length > 0) {
          crudEntitaFetch();
        } else if (filtri.data.length > 0 && filtri.data2.length > 0) {
          listePerData();
        }
      } else if (filtri.azione === "POST") {
        if (filtri.dipendenteID.length > 0) {
          searchDipendenteDB();
          setShowRicercaID(true);
        } else if (filtri.id.length > 0) {
          crudEntitaFetch();
        }
      }
    }
  };

  const cleaner = () => {
    setFiltri((state) => ({ ...state, dipendenteID: "", data: "", data2: "" }));
    setSearch({});
  };
  const eliminazione = () => {
    setConferma(true);
    creaEditDipendente();
  };
  const dipendentiFiltrati = filtraDipendenti();

  useEffect(() => {
    listaDipendenti();
  }, []);
  useEffect(() => {
    console.log(search);
    console.log(filtri.dipendenteID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {search.id && filtri.dipendenteID ? (
              <div className="p-4 bg-light rounded mt-5 w-50">
                <h4>Dipendente trovato:</h4>
                <div>
                  <h6>
                    {search.nome} {search.cognome}
                  </h6>
                  <p>ID: {search.id}</p>
                  <Button className="m-2" onClick={filtri.azione === "DELETE" ? eliminazione : cleaner}>
                    {filtri.azione === "DELETE" ? "Elimina Dipendente" : "Nuova Ricerca"}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Row>
                  {(filtri.nome.length > 0 || filtri.cognome.length > 0 || filtri.email.length > 0) &&
                  dipendentiFiltrati.length > 0
                    ? dipendentiFiltrati.map((dipendente) => (
                        <Col key={dipendente.id} lg={4}>
                          <Card
                            style={{ width: "15rem" }}
                            className={`m-3 p-3 ${cardSelezionata === dipendente.id ? "border-danger border-4" : ""}`}
                          >
                            <Card.Img variant="top" src={`${dipendente.avatar}`} />
                            <Card.Body>
                              <Card.Title>{`${dipendente.nome} ${dipendente.cognome}`}</Card.Title>
                              <Card.Text>Ruolo: {`${dipendente.ruolo}`}</Card.Text>
                              {filtri.azione === "GET" ? (
                                <Button variant="primary" onClick={() => navigate(`/dipendenti/${dipendente.id}`)}>
                                  Visita profilo
                                </Button>
                              ) : (
                                <Button
                                  variant={cardSelezionata === dipendente.id ? "warning" : "primary"}
                                  onClick={() => selezionato(dipendente.id)}
                                >
                                  {toogle && cardSelezionata === dipendente.id
                                    ? "Deseleziona dipendente"
                                    : "Seleziona dipendente"}
                                </Button>
                              )}
                            </Card.Body>
                          </Card>
                          {showForm && cardSelezionata === dipendente.id && (
                            <div>
                              <Alert>
                                ELIMINANDO IL DIPENDENTE SI PERDERANNO DATI ANCHE DELLE SUE BUSTEPAGHE, PRESENZE,
                                ASSENZE, e FERIE
                              </Alert>
                              <Button type="submit" variant="danger" className="text-start ms-5" onClick={handleSubmit}>
                                Elimina Dipendente
                              </Button>
                            </div>
                          )}
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
                    <Col key={search.id} lg={4}>
                      <Card style={{ width: "15rem" }} className="m-3 p-3">
                        <Card.Img variant="top" src={`${search.avatar}`} />
                        <Card.Body>
                          <Card.Title>{`${search.nome} ${search.cognome}`}</Card.Title>
                          <Card.Text>Ruolo: {`${search.ruolo}`}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ) : (
                    <div>
                      <Row>
                        {(filtri.nome.length > 0 || filtri.cognome.length > 0 || filtri.email.length > 0) &&
                        dipendentiFiltrati.length > 0
                          ? dipendentiFiltrati.map((dipendente) => (
                              <Col key={dipendente.id} lg={4}>
                                <Card
                                  style={{ width: "15rem" }}
                                  className={`m-3 p-3 ${
                                    cardSelezionata === dipendente.id ? "border-danger border-4" : ""
                                  }`}
                                >
                                  <Card.Img variant="top" src={`${dipendente.avatar}`} />
                                  <Card.Body>
                                    <Card.Title>{`${dipendente.nome} ${dipendente.cognome}`}</Card.Title>
                                    <Card.Text>Ruolo: {`${dipendente.ruolo}`}</Card.Text>
                                    <Button
                                      variant={cardSelezionata === dipendente.id ? "warning" : "primary"}
                                      onClick={() => selezionato(dipendente.id)}
                                    >
                                      {toogle && cardSelezionata === dipendente.id
                                        ? "Deseleziona dipendente"
                                        : "Seleziona dipendente"}
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
              {showForm && filtri.dipendenteID.length > 0 && (
                <div>
                  <h6 className="mt-5">Crea nuovo dipendente o modifica il dipendente trovato:</h6>
                  <Alert variant="danger">
                    SOLO NEL CASO DI MODIFICA: se lasci il campo vuoto questo non verrà modificato da quello già
                    esistente
                  </Alert>
                  <Form.Group controlId="nomeCRUD">
                    <Form.Label>Inserisci Nome:</Form.Label>
                    <Form.Control
                      placeholder="@nome dipendente"
                      type="text"
                      name="nomeCRUD"
                      value={filtri.nomeCRUD}
                      onChange={handleFilterChange}
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
                    />
                  </Form.Group>
                  <Form.Group controlId="emailCRUD">
                    <Form.Label>Inserisci Email:</Form.Label>
                    <Form.Control
                      placeholder="@email dipendente"
                      type="email"
                      name="email"
                      value={filtri.emailCRUD}
                      onChange={handleFilterChange}
                      className="custom-input"
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
                    />
                  </Form.Group>
                  <Form.Group controlId="stipendio">
                    <Form.Label>Inserisci stipendio:</Form.Label>
                    <Form.Control
                      placeholder="@stipendio dipendente"
                      type="number"
                      name="stipendio"
                      step="0.01"
                      min="0"
                      value={filtri.stipendio}
                      onChange={handleFilterChange}
                      className="custom-input"
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
                    />
                  </Form.Group>
                  <Button type="submit" className="mt-3">
                    Submit
                  </Button>
                  {messaggio && (
                    <div>
                      <div
                        className={`modal fade ${showModal ? "show" : ""}`}
                        style={{ display: showModal ? "block" : "none" }}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden={!showModal}
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">
                                Messaggio
                              </h5>
                            </div>
                            <div className="modal-body">{messaggio}</div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Chiudi
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {showModal && <div className="modal-backdrop fade show"></div>}
                    </div>
                  )}
                </div>
              )}
              {filtri.azione === "POST" && (
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
                      type="email"
                      name="emailCRUD"
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
                      min="0"
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
                  <Button type="submit" className="mt-3">
                    Submit
                  </Button>
                  {messaggio && (
                    <div>
                      <div
                        className={`modal fade ${showModal ? "show" : ""}`}
                        style={{ display: showModal ? "block" : "none" }}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden={!showModal}
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">
                                Messaggio
                              </h5>
                            </div>
                            <div className="modal-body">{messaggio}</div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Chiudi
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {showModal && <div className="modal-backdrop fade show"></div>}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        )}
        {filtri.endpoint === "assenze" && (filtri.azione === "GET" || filtri.azione === "DELETE") ? (
          <div className="w-75">
            {/*  -------------------------------------------------ASSENZE--------------------------------------------
      -------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------- */}
            <h5>Ricerca per ID</h5>
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
            <Button className="my-3" onClick={handleSubmit}>
              Invia
            </Button>
            {showRicercaID && search && search.motivo ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Assenza ID</th>
                    <th>Data</th>
                    <th>Motivo</th>
                    <th>Stato</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{search.id}</td>
                    <td>{search.data}</td>
                    <td>{search.motivo}</td>
                    <td>{search.stato}</td>
                  </tr>
                </tbody>
              </Table>
            ) : showRicercaID && search && search.assenze && search.assenze.length > 0 ? (
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
                  {search.assenze.map((assenza) => (
                    <tr key={search.id}>
                      <td>
                        {search.nome} {search.cognome}
                      </td>
                      <td>{assenza.id}</td>
                      <td>{assenza.data}</td>
                      <td>{assenza.motivo}</td>
                      <td>{assenza.stato}</td>
                      <td>
                        <Button onClick={() => navigate(`/dipendenti/${search.id}`)}>Vedi profilo</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              showRicercaID && (
                <Col>
                  <p>Nessuna assenza registrata!</p>
                  <Button onClick={() => navigate("/home")}>Torna alla Home</Button>
                </Col>
              )
            )}
            <h5>Ricerca per Nomenclatura:</h5>
            <div className=" d-flex gap-3">
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
            {(filtri.nome.length > 0 || filtri.cognome.length > 0 || filtri.email.length > 0) && (
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>ID Assenza</th>
                    <th>Data</th>
                    <th>Motivo</th>
                    <th>Stato</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {dipendentiFiltrati.map((dipendente) =>
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
                  )}
                </tbody>
              </Table>
            )}
            <h5 className="mt-5">Oppure:</h5>
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
            {filtri.stato.length > 0 && (
              <>
                {filtri.stato === "IN_ATTESA" ? (
                  <>
                    <h3>Assenze in Attesa</h3>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>ID Assenza</th>
                          <th>Data</th>
                          <th>Motivo</th>
                          <th>Stato</th>
                          <th>Azioni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dipendentiFiltrati.map((dipendente) =>
                          dipendente.assenze
                            .filter((assenza) => assenza.stato === "IN_ATTESA")
                            .map((assenza) => (
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
                        )}
                      </tbody>
                    </Table>
                  </>
                ) : filtri.stato === "APPROVATO" ? (
                  <>
                    <h3>Assenze Approvate</h3>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>ID Assenza</th>
                          <th>Data</th>
                          <th>Motivo</th>
                          <th>Stato</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dipendentiFiltrati.map((dipendente) =>
                          dipendente.assenze
                            .filter((assenza) => assenza.stato === "APPROVATO")
                            .map((assenza) => (
                              <tr key={assenza.id}>
                                <td>
                                  {dipendente.nome} {dipendente.cognome}
                                </td>
                                <td>{assenza.id}</td>
                                <td>{assenza.data}</td>
                                <td>{assenza.motivo}</td>
                                <td>{assenza.stato}</td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </Table>
                  </>
                ) : filtri.stato === "NON_APPROVATA" ? (
                  <>
                    <h3>Assenze Non Approvate</h3>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>ID Assenza</th>
                          <th>Data</th>
                          <th>Motivo</th>
                          <th>Stato</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dipendentiFiltrati.map((dipendente) =>
                          dipendente.assenze
                            .filter((assenza) => assenza.stato === "NON_APPROVATA")
                            .map((assenza) => (
                              <tr key={assenza.id}>
                                <td>
                                  {dipendente.nome} {dipendente.cognome}
                                </td>
                                <td>{assenza.id}</td>
                                <td>{assenza.data}</td>
                                <td>{assenza.motivo}</td>
                                <td>{assenza.stato}</td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </Table>
                  </>
                ) : (
                  <h3>Non sono presenti dei record</h3>
                )}
              </>
            )}
            <Form.Group controlId="dataInizio">
              <Form.Label>Ricerca per Periodo: data Inizio...</Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={filtri.data}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="dataFine">
              <Form.Label>...e Data Fine:</Form.Label>
              <Form.Control
                type="date"
                name="data2"
                value={filtri.data2}
                onChange={handleFilterChange}
                className="custom-input"
              />
            </Form.Group>
            <Button className="mb-5 mt-3" onClick={handleSubmit}>
              Invia
            </Button>
            {listaGenerica && listaGenerica.length > 0 ? (
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Assenza ID</th>
                      <th>Data</th>
                      <th>Motivo</th>
                      <th>Stato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaGenerica.map((assenza) => (
                      <tr key={assenza.id}>
                        <td>{assenza.id}</td>
                        <td>{assenza.data}</td>
                        <td>{assenza.motivo}</td>
                        <td>{assenza.stato}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button onClick={cleaner}>Resetta Filtri</Button>
              </>
            ) : (
              listaGenerica.length > 0 && (
                <>
                  <p>Non ci sono assenze da visualizzare.</p>
                  <Button onClick={cleaner}>Resetta Filtri</Button>
                </>
              )
            )}
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
                  <Button className="my-2" onClick={handleSubmit}>
                    Invia
                  </Button>
                  {search.id && (
                    <Col key={search.id} lg={4}>
                      <h3>Dipendente trovato:</h3>
                      <Card style={{ width: "15rem" }} className="m-3 p-3">
                        <Card.Img variant="top" src={`${search.avatar}`} />
                        <Card.Body>
                          <Card.Title>{`${search.nome} ${search.cognome}`}</Card.Title>
                          <Card.Text>Ruolo: {`${search.ruolo}`}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}
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

                  <div>
                    <Row>
                      {(filtri.nome.length > 0 || filtri.cognome.length > 0 || filtri.email.length > 0) &&
                      dipendentiFiltrati.length > 0
                        ? dipendentiFiltrati.map((dipendente) => (
                            <Col key={dipendente.id} lg={4}>
                              <Card
                                style={{ width: "15rem" }}
                                className={`m-3 p-3 ${
                                  cardSelezionata === dipendente.id ? "border-danger border-4" : ""
                                }`}
                              >
                                <Card.Img variant="top" src={`${dipendente.avatar}`} />
                                <Card.Body>
                                  <Card.Title>{`${dipendente.nome} ${dipendente.cognome}`}</Card.Title>
                                  <Card.Text>Ruolo: {`${dipendente.ruolo}`}</Card.Text>
                                  <Button
                                    variant={cardSelezionata === dipendente.id ? "warning" : "primary"}
                                    onClick={() => selezionato(dipendente.id)}
                                  >
                                    {toogle && cardSelezionata === dipendente.id
                                      ? "Deseleziona dipendente"
                                      : "Seleziona dipendente"}
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
                  <Button type="submit" className="mt-3">
                    Submit
                  </Button>
                  {messaggio && (
                    <div>
                      <div
                        className={`modal fade ${showModal ? "show" : ""}`}
                        style={{ display: showModal ? "block" : "none" }}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden={!showModal}
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">
                                Messaggio
                              </h5>
                            </div>
                            <div className="modal-body">{messaggio}</div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Chiudi
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {showModal && <div className="modal-backdrop fade show"></div>}
                    </div>
                  )}
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
