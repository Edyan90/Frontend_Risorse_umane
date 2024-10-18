import { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const MyFiltri = () => {
  const dipendente = useSelector((state) => state.dipendente.dipendente);
  const [filtri, setFiltri] = useState({
    endpoint: "",
    azione: "",
    dipedenteID: "",
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
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltri((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form className="text-start text-black">
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
        <h3 className="mt-3">Ricerca per:</h3>
      </Form.Group>
      {filtri.endpoint === "dipendenti" && (filtri.azione === "GET" || filtri.azione === "DELETE") ? (
        <div className="d-flex gap-3">
          <Form.Group controlId="id">
            <Form.Label>Dipendente ID:</Form.Label>
            <Form.Control
              placeholder="@dipendente ID"
              type="text"
              name="dipendenteID"
              value={filtri.dipedenteID}
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
        </div>
      ) : (
        filtri.endpoint === "dipendenti" &&
        (filtri.azione === "PUT" || filtri.azione === "POST" || filtri.azione === "PATCH") && (
          <div>
            <Form.Group controlId="nome">
              <Form.Label>Inserisci Nome:</Form.Label>
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
              <Form.Label>Inserisci Cognome:</Form.Label>
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
              <Form.Label>Inserisci Email:</Form.Label>
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
              <Form.Label>Aggiungi Ruolo:</Form.Label>
              <Form.Control
                as="select"
                name="stato"
                value={filtri.stato}
                onChange={handleFilterChange}
                className="custom-input"
              >
                <option value="">Seleziona Stato</option>
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
          </div>
        )
      )}
      {filtri.endpoint === "assenze" && filtri.azione.length > 0 && (
        <div className="w-50">
          <Form.Group controlId="id">
            <Form.Label>Assenza ID:</Form.Label>
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
            <Form.Label>Dipendente ID:</Form.Label>
            <Form.Control
              placeholder="@dipendente ID"
              type="text"
              name="dipendenteID"
              value={filtri.dipedenteID}
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
            <Form.Label>Data Inizio Ferie:</Form.Label>
            <Form.Control
              type="date"
              name="data"
              value={filtri.data}
              onChange={handleFilterChange}
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="data">
            <Form.Label>Data Fine Ferie:</Form.Label>
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
      {filtri.endpoint === "presenze" && filtri.azione.length > 0 && (
        <div className="w-50">
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
            <Form.Label>Data Inizio Ferie:</Form.Label>
            <Form.Control
              type="date"
              name="data"
              value={filtri.data}
              onChange={handleFilterChange}
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="data">
            <Form.Label>Data Fine Ferie:</Form.Label>
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
      {filtri.endpoint === "ferie" && filtri.azione.length > 0 && (
        <div className="w-50">
          <Form.Group controlId="id">
            <Form.Label>Ferie ID:</Form.Label>
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
              <option value="RIFIUTATO">RIFIUTATO</option>
              <option value="RICHIESTO">RICHIESTO</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="data">
            <Form.Label>Data Inizio Ferie:</Form.Label>
            <Form.Control
              type="date"
              name="data"
              value={filtri.data}
              onChange={handleFilterChange}
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="data">
            <Form.Label>Data Fine Ferie:</Form.Label>
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
    </Form>
  );
};
export default MyFiltri;
