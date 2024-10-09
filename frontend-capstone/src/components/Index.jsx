import { Col, Container, Row } from "react-bootstrap";
import Login from "./Login";
import ThemeButton from "./ThemeButton";

const Index = () => {
  return (
    <Container style={{ height: "100vh" }}>
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
          <ThemeButton />
        </Col>
      </Row>

      <Row className=" border-bottom pb-5">
        <Col>
          <h1 className="text-start">Benvenuto HR Portal</h1>
          <Login />
        </Col>
        <Col>
          <img
            src="https://dhamzv23wqk2g.cloudfront.net/wp-content/uploads/2023/06/05170126/HR-Management.jpg"
            className="img-fluid"
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
      <Row className="">
        <Col>
          <div className="d-flex text-center align-items-center">
            <a>
              <img
                src="https://saas.hrzucchetti.it/hrpbestengsrl/images/login/logo.svg"
                width={75}
                className="img-fluid px-2"
              />
            </a>
            <p className="my-0"> ©2024 Epicode HR, Epicode. All rights reserved. HRPortal </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Index;
