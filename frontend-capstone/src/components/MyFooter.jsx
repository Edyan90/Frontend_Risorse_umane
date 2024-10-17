import { Col, Row } from "react-bootstrap";

const MyFooter = () => {
  return (
    <Row className="fixed-bottom bg-dark text-center text-white">
      <Col>
        <div className="d-flex text-center align-items-center ">
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
  );
};
export default MyFooter;
