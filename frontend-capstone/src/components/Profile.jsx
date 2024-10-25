import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { dipendenteID } = useParams();
  const [dipendente, setDipendente] = useState(null);
  const dipendenteAutenticato = useSelector((state) => state.dipendente.dipendente);

  const dipendenteFetch = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(`http://localhost:3001/dipendenti/${dipendenteID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Errore nella fetch nel trovare il dipendente!");
      }
      const data = await resp.json();
      setDipendente(data);
    } catch (error) {
      console.error("Errore nella fetch lista-dipendenti!", error);
    }
  };
  const isDIPENDENTE = dipendenteAutenticato.ruolo === "DIPENDENTE";
  useEffect(() => {
    if (!isDIPENDENTE) {
      dipendenteFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dipendenteID]);

  return (
    <div>
      {isDIPENDENTE ? (
        <>
          <h1 className="text-black">
            Profilo di {dipendenteAutenticato.nome} {dipendenteAutenticato.cognome}
          </h1>
          <Row className="mb-5">
            <Col md="4">
              <Card className="p-3">
                <img src={dipendenteAutenticato.avatar} alt="Avatar" style={{ width: "100%" }} />
                <div>
                  <h4>Informazioni Personali</h4>
                  <p>
                    <strong>Email:</strong> {dipendenteAutenticato.email}
                  </p>
                  <p>
                    <strong>Username:</strong> {dipendenteAutenticato.username}
                  </p>
                  <p>
                    <strong>Ruolo:</strong> {dipendenteAutenticato.ruolo}
                  </p>
                  <p>
                    <strong>Stipendio:</strong> {dipendenteAutenticato.stipendio} €
                  </p>
                  <p>
                    <strong>Data Assunzione:</strong>{" "}
                    {new Date(dipendenteAutenticato.dataAssunzione).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </Col>
            <Col
              md="8"
              className="bg-white rounded d-flex flex-column text-black justify-content-center text-start p-3"
            >
              <h4>Assenze</h4>
              {dipendenteAutenticato.assenze.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Motivo</th>
                      <th>Stato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dipendenteAutenticato.assenze.map((assenza) => (
                      <tr key={assenza.id}>
                        <td>{new Date(assenza.data).toLocaleDateString()}</td>
                        <td>{assenza.motivo}</td>
                        <td>{assenza.stato}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Non ci sono assenze registrate.</p>
              )}
              <h4>Ferie</h4>
              {dipendenteAutenticato.ferie.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>Data Inizio</th>
                      <th>Data Fine</th>
                      <th>Stato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dipendenteAutenticato.ferie.map((ferie) => (
                      <tr key={ferie.id}>
                        <td>{new Date(ferie.dataInizio).toLocaleDateString()}</td>
                        <td>{new Date(ferie.dataFine).toLocaleDateString()}</td>
                        <td>{ferie.stato}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Non ci sono ferie registrate.</p>
              )}
            </Col>
          </Row>
          <Button onClick={() => navigate("/home")}>Torna alla Home</Button>
        </>
      ) : (
        dipendente && (
          <>
            <h1 className="text-black">
              Profilo di {dipendente.nome} {dipendente.cognome}
            </h1>
            <Row className="mb-5">
              <Col md="4">
                <Card className="p-3">
                  <img src={dipendente.avatar} alt="Avatar" style={{ width: "100%" }} />
                  <div>
                    <h4>Informazioni Personali</h4>
                    <p>
                      <strong>Email:</strong> {dipendente.email}
                    </p>
                    <p>
                      <strong>Username:</strong> {dipendente.username}
                    </p>
                    <p>
                      <strong>Ruolo:</strong> {dipendente.ruolo}
                    </p>
                    <p>
                      <strong>Stipendio:</strong> {dipendente.stipendio} €
                    </p>
                    <p>
                      <strong>Data Assunzione:</strong> {new Date(dipendente.dataAssunzione).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              </Col>
              <Col
                md="8"
                className="bg-white rounded d-flex flex-column justify-content-center text-start text-black p-3"
              >
                <h4>Assenze</h4>
                {dipendente.assenze.length > 0 ? (
                  <Table>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Motivo</th>
                        <th>Stato</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dipendente.assenze.map((assenza) => (
                        <tr key={assenza.id}>
                          <td>{new Date(assenza.data).toLocaleDateString()}</td>
                          <td>{assenza.motivo}</td>
                          <td>{assenza.stato}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>Non ci sono assenze registrate.</p>
                )}
                <h4>Ferie</h4>
                {dipendente.ferie.length > 0 ? (
                  <Table>
                    <thead>
                      <tr>
                        <th>Data Inizio</th>
                        <th>Data Fine</th>
                        <th>Stato</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dipendente.ferie.map((ferie) => (
                        <tr key={ferie.id}>
                          <td>{new Date(ferie.dataInizio).toLocaleDateString()}</td>
                          <td>{new Date(ferie.dataFine).toLocaleDateString()}</td>
                          <td>{ferie.stato}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>Non ci sono ferie registrate.</p>
                )}
              </Col>
            </Row>
            <Button onClick={() => navigate("/home")}>Torna alla Home</Button>)
          </>
        )
      )}
    </div>
  );
};
export default Profile;
