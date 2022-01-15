import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import documentActions from "../../../../actions/document.actions";
import ApproveOption from "../ApproveOption";

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Button, Dropdown, ButtonGroup } from "@themesberg/react-bootstrap";
import { Modal } from "@themesberg/react-bootstrap";
import documentServices from "../../../../services/document.services";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function TabPending() {
  const dispatch = useDispatch();

  const [showPreview, setShowPreview] = useState(false);
  const [urlPreview, setUrlPreview] = useState('');
  const [format, setFormat] = useState('')

  useEffect(() => {
    dispatch(documentActions.getPendingDocument());
  }, []);

  const { pendingDocuments } = useSelector((state) => state.document);

  const base64ToBlob = (data, type) => {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
      var ascii = bString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return new Blob([bytes], { type: type });
  };

  const handlePreview = async (docId) => {
    let type = "";
    const img = ["png", "jpg", "jpeg", "PNG", "JPEG", "JPG"];
    if (format === "pdf") {
      type = "application/pdf";
    } else if (img.includes(format)) {
      type = "image/jpeg";
    } else {
      type = "application/pdf";
    }
    const data = await documentServices.getContent(docId);
    const tmp = data.data;
    // console.log({tmp: tmp});
    const blob = base64ToBlob(tmp, type);
    setUrlPreview(URL.createObjectURL(blob));
  };

  console.log({urlpreview: urlPreview});

  const judge = () => {
    let isPdf = false,
      isImg = false,
      isWord = false;
    const img = ["png", "jpg", "jpeg", "PNG", "JPEG", "JPG"];
    if (format === "pdf") {
      isPdf = true;
    } else if (img.includes(format)) {
      isImg = true;
    } else {
      // isWord = true
      isPdf = true;
    }
    return {
      isPdf,
      isImg,
      isWord,
    };
  };

  return (
    <div>
      <table className="table border-0">
        <thead className="thead-light">
          <tr>
            <th style={{ width: "5%", textAlign: "center" }}>STT</th>
            <th style={{ width: "40%" }}>Tên tài liệu</th>
            <th style={{ width: "20%", textAlign: "center" }}>Người tải lên</th>
            <th style={{ width: "15%", textAlign: "center" }}>Thời gian</th>
            <th style={{ width: "10%", textAlign: "center" }}>Xem trước</th>
            <th style={{ width: "10%", textAlign: "center" }}>...</th>
          </tr>
        </thead>
        <tbody>
          {pendingDocuments?.length > 0 ? (
            pendingDocuments?.map((document, index) => (
              <tr key={document.id}>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {index + 1}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {document.nameDocument}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {document.owner}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {document.timeCreated}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                        e.preventDefault()
                        setFormat(document.format)
                        handlePreview(document.id)
                        setShowPreview(!showPreview)
                    }}
                  >
                    Xem trước
                  </button>
                </td>
                <td style={{ textAlign: "center" }}>
                  <ApproveOption documentId={document.id} />
                </td>
              </tr>
            ))
          ) : (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={6}>Không có tài liệu nào chờ duyệt.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* modal preview */}
      <Modal
        as={Modal.Dialog}
        size="lg"
        centered
        show={showPreview}
        onHide={() => setShowPreview(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Xem trước</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {judge().isPdf == true && <Viewer fileUrl={urlPreview} plugins={[defaultLayoutPlugin]} />}
          {judge().isImg == true && <img src={urlPreview} />}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setShowPreview(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TabPending;
