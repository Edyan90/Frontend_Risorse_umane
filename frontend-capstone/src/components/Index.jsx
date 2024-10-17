import { Col, Container, Row } from "react-bootstrap";
import Login from "./Login";
import ThemeButton from "./ThemeButton";
import MyFooter from "./MyFooter";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Index = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [darkTheme]);
  return (
    <Container style={{ height: "100vh" }} className="text-black">
      <Row className="justify-content-start border-bottom mb-5 text-center align-items-center">
        <Col className="text-start">
          <img
            id="logoPortal"
            src="https://saas.hrzucchetti.it/hrpbestengsrl/images/login/logo.svg"
            alt="logo-zucchetti"
            width="auto"
            height="70"
          />
        </Col>
        <Col className="text-end">
          <ThemeButton darkTheme={darkTheme} />
        </Col>
      </Row>

      <Row className=" border-bottom pb-5">
        <Col className="d-flex justify-content-center">
          <Login />
        </Col>
        <Col>
          <img
            src="https://dhamzv23wqk2g.cloudfront.net/wp-content/uploads/2023/06/05170126/HR-Management.jpg"
            className="img-fluid rounded-3"
          />
        </Col>
      </Row>
      <Row className="text-start mt-5">
        <p>
          L &apos;accesso a questo sistema è consentito solo agli utenti autorizzati. Le attività sono registrate e
          monitorate
        </p>
        <p>L &apos;accesso non autorizzato è severamente proibito</p>
      </Row>
      <MyFooter />
    </Container>
  );
};
export default Index;
