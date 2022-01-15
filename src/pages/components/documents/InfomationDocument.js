import React, { useState, useEffect, useRef } from "react";
import { Table, Col, Row, Card, Nav, Tab } from '@themesberg/react-bootstrap';
import CommentRow from "./CommentRow";
import TabDetail from './tabs/TabDetail';
import TabComment from './tabs/TabComment';
import TabNote from './tabs/TabNote';
import TabVersion from './tabs/TabVersion';
import TabPreview from './tabs/TabPreview';

import commentServices from '../../../services/comment.services'
import documentServices from "../../../services/document.services";
import TabSecurity from "./tabs/TabSecurity";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import TabComment2 from "./tabs/TabComment2";
import { useDispatch, useSelector } from "react-redux";
import documentActions from "../../../actions/document.actions";

function InfomationDocument({ documentId, versionId, versionName, type, shared, update, updateDetail, showMyDocument, owner, updateList, showTrash }) {
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  }, [])
  
  // const docs = [
  //   { uri: require("./anh.jpeg") },
  //   { uri: require("./10.1.1.454.4503.pdf") },
  //   { uri: require("./Kehoach_Thuc_tap_TN_D17CQ-cac-nganh-ky-thuat_du-thao.doc") }, // Local File
  // ];
  
  return (
    <>
      <Tab.Container defaultActiveKey="detail">
        <Row>
          <Col lg={12}>
            <Nav className="nav-tabs">
              <Nav.Item>
                <Nav.Link eventKey="detail" className="mb-sm-3 mb-md-0">
                  Chi tiết
                </Nav.Link>
              </Nav.Item>
              
              { !showTrash &&
                <Nav.Item>
                  <Nav.Link eventKey="version" className="mb-sm-3 mb-md-0">
                    Phiên bản
                  </Nav.Link>
                </Nav.Item>
              }

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
              
              {
                showMyDocument && 
                <Nav.Item>
                  <Nav.Link eventKey="security" className="mb-sm-3 mb-md-0">
                    Bảo mật
                  </Nav.Link>
              </Nav.Item>
              }

              {/* <Nav.Item>
                <Nav.Link eventKey="preview" className="mb-sm-3 mb-md-0">
                  Xem trước
                </Nav.Link>
              </Nav.Item> */}
            </Nav>
          </Col>
          <Col lg={12}>
            <Tab.Content>
              <Tab.Pane eventKey="detail" className="py-4" ref={ref}>
                <TabDetail documentId={documentId} updateUI={updateDetail} />
              </Tab.Pane>

              { !showTrash &&
                <Tab.Pane
                  eventKey="version"
                  className="py-4"
                  style={{
                    minHeight: height,
                    maxHeight: height,
                    overflowY: "scroll",
                  }}
                >
                  <TabVersion
                    documentId={documentId}
                    versionName={versionName}
                    update={update}
                    updateUI={updateDetail}
                  />
                </Tab.Pane>
              }

              <Tab.Pane
                eventKey="note"
                className="py-4"
                style={{
                  minHeight: height,
                  maxHeight: height,
                  overflowY: "scroll",
                }}
              >
                <TabNote docId={documentId} updateUI={updateDetail} />
              </Tab.Pane>

              <Tab.Pane
                eventKey="comment"
                className="py-4"
                style={{
                  minHeight: height,
                  maxHeight: height,
                  overflowY: "scroll",
                }}
              >
                <TabComment2 
                  versionId={versionId}
                />
              </Tab.Pane>

              {
                showMyDocument &&
                <Tab.Pane
                  eventKey="security"
                  style={{
                    minHeight: height,
                    maxHeight: height,
                    overflowY: "scroll",
                    marginBottom: 20,
                  }}
                >
                  <TabSecurity docId={documentId} type={type} shared={shared} owner={owner} updateList={updateList} />
                </Tab.Pane>
              }

            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default InfomationDocument;
