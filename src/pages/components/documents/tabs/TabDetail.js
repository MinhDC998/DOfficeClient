import React, { useState, useEffect } from "react";
import { Table } from "@themesberg/react-bootstrap";
import documentServices from '../../../../services/document.services'

function TabDetail({ documentId, updateUI }) {
  
  const [document, setDocument] = useState({})
  const [subscribers, setSubscribers] = useState([])
  const [keywords, setKeywords] = useState([])
  const [lockInfo, setLockInfo] = useState({})

  const getData = async () => {
    const doc = await documentServices.getResponseDocument(documentId)
    const subs = await documentServices.getListSubscriber(documentId)
    const kws = await documentServices.getListKeyword(documentId)
    setDocument(doc.data)
    setSubscribers(subs.data)
    setKeywords(kws.data)
  }

  // console.log({document});

  useEffect(() => {
    getData()
  }, [documentId, updateUI])

  const isLock = (lock) => {
    return lock === 1 ? 'Có' : 'Không'
  }

  const getType = (type) => {
    return type === 'private' ? 'Riêng tư' : 'Công khai'
  }

  const convertSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  return (
    <>
      <div className="col-12">
        <Table
          responsive
          className="table"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <tbody>
            <tr>
              <td className="border-0" sytle={{ width:100 }}>
                <label>Tên tài liệu</label>
              </td>
              <td className="border-0"  sytle={{ textAlign:'left' }}>
                {document.nameDocument}
              </td>
            </tr>
            <tr>
              <td className="border-0" sytle={{ width:100 }}>
                <label>Đã tạo</label>
              </td>
              <td className="border-0"  sytle={{ textAlign:'left' }}>
                {document.timeCreated}
              </td>
            </tr>
            <tr>
              <td className="border-0" sytle={{ width:100 }}>
                <label>Tác giả</label>
              </td>
              <td className="border-0"  sytle={{ textAlign:'left' }}>
                {document.version?.author}
              </td>
            </tr>
            <tr>
              <td className="border-0" sytle={{ width:100 }}>
                <label>Kích thước</label>
              </td>
              <td className="border-0"  sytle={{ textAlign:'left' }}>
                {convertSize(document.version?.size)}
              </td>
            </tr>
            <tr>
              <td className="border-0" sytle={{ width:100 }}>
                <label>Định dạng</label>
              </td>
              <td className="border-0"  sytle={{ textAlign:'left' }}>
                {document.format}
              </td>
            </tr>
            <tr>
              <td className="border-0" sytle={{ width:100 }}>
                <label>Kiểu</label>
              </td>
              <td className="border-0"  sytle={{ textAlign:'left' }}>
                {getType(document.type)}
              </td>
            </tr>
            <tr>
              <td className="border-0" sytle={{ width:100 }}>
                <label>Khóa</label>
              </td>
              <td className="border-0"  sytle={{ textAlign:'left' }}>
                {isLock(document.isLock)}
              </td>
            </tr>
            <tr>
              <td className="border-0" sytle={{ width:100 }}>
                <label>Người theo dõi</label>
              </td>
              <td className="border-0"  sytle={{ textAlign:'left' }}>
                {subscribers.length > 0 ? subscribers.join(', ') : 'Không'}
              </td>
            </tr>
            <tr>
              <td className="border-0" sytle={{ width:100 }}>
                <label>Từ khóa</label>
              </td>
              <td className="border-0" sytle={{ textAlign:'left' }}>
                {keywords ? keywords.join(', ') : 'Không'}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default TabDetail;
