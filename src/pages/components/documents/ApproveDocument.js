import React from "react";
import { Table, Col, Row, Card, Nav, Tab } from "@themesberg/react-bootstrap";
import TabApproved from "./tabs/TabApproved";
import TabPending from "./tabs/TabPending";

const ApproveDocument = () => {
  return (
    <>
      <Tab.Container defaultActiveKey="pending">
        <Row>
          <Col lg={12}>
            <Nav className="nav-tabs">
              <Nav.Item>
                <Nav.Link eventKey="pending" className="mb-sm-3 mb-md-0">
                  Đang chờ
                </Nav.Link>
              </Nav.Item>

              {/* <Nav.Item>
                <Nav.Link eventKey="approved" className="mb-sm-3 mb-md-0">
                  Đã duyệt
                </Nav.Link>
              </Nav.Item> */}
            </Nav>
          </Col>
          <Col lg={12}>
            <Tab.Content>
              <Tab.Pane eventKey="pending" className="py-4">
                <TabPending />
              </Tab.Pane>

              {/* <Tab.Pane eventKey="approved" className="py-4">
                <TabApproved />
              </Tab.Pane> */}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default ApproveDocument;
