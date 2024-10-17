import { Col, Row } from "react-bootstrap";
import MyNavBar from "./MyNavBar";
import MyFooter from "./MyFooter";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Layout({ darkTheme }) {
  return (
    <>
      <MyNavBar />
      <Row className="mt-2">
        <Col lg={2}>
          <SideBar darkTheme={darkTheme} />
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
      <MyFooter />
    </>
  );
}

export default Layout;
