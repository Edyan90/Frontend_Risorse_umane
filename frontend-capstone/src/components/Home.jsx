import { Col, Row } from "react-bootstrap";

import DashBoard from "./DashBoard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDipendente } from "../redux/actions";

const Home = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();
  const dipendente = useSelector((state) => state.dipendente);
  const dipendenteFetch = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("http://localhost:3001/dipendenti/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Errore nella fetch");
      }
      const data = await resp.json();
      dispatch(setDipendente(data));
      console.log(data);
    } catch (error) {
      console.error("Errore nella fetch dipendente: ", error);
    }
  };
  useEffect(() => {
    dipendenteFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [darkTheme]);
  return (
    <Row>
      <Col>
        <DashBoard darkTheme={darkTheme} dipendente={dipendente} />
      </Col>
    </Row>
  );
};
export default Home;
