import { Col, Row, Card, Nav, Tab } from "@themesberg/react-bootstrap";

import React, { Component } from "react";

function DefaultInfoDocument() {
  return (
    <>
      <Tab.Container>
        <Row>
          <Col lg={12}>
            <Nav className="nav-tabs">
              <Nav.Item>
                <Nav.Link eventKey="detail" className="mb-sm-3 mb-md-0">
                  Chi tiết
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="version" className="mb-sm-3 mb-md-0">
                  Phiên bản
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="note" className="mb-sm-3 mb-md-0">
                  Ghi chú
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="comment" className="mb-sm-3 mb-md-0">
                  Nhận xét
                </Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="security" className="mb-sm-3 mb-md-0">
                  Bảo mật
                </Nav.Link>
              </Nav.Item> */}
              {/* <Nav.Item>
                <Nav.Link eventKey="preview" className="mb-sm-3 mb-md-0">
                  Xem trước
                </Nav.Link>
              </Nav.Item> */}
            </Nav>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default DefaultInfoDocument;
