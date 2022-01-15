import React, { useState, useEffect } from 'react'
import { Table } from "@themesberg/react-bootstrap";
import TableRow from './TableRow';
import documentServices from '../../../services/document.services'
import './search.scss'

function SearchDocument() {
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
    const [showButton, setShowButton] = useState(false)
    
    const [name, setName] = useState('')
    const [beginDate, setBeginDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [update, setUpdate] = useState(false)

    const [keywords, setKeywords] = useState('')
    const [documentResult, setDocumentResult] = useState([])

    const handleAdvancedSearch = async () => {
      // console.log(keywords)
      const data = await documentServices.advancedSearch(name, beginDate, endDate, keywords)
      // console.log(data)
      setDocumentResult(data.data)
    }

    const handleNameSearch = async () => {
      const data = await documentServices.getDocumentByNameAndTime(name, beginDate, endDate)
      setDocumentResult(data.data)
    }

    const advancedSearch = () => {
      return (
        <>
          <div className="mt-3">
            <div className="form-group panel panel-default input-text-style">
              <div className="title-style">
                <h6>Theo từ khóa</h6>
              </div>
              <div className="panel-body">
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Nhập các từ khóa ..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
                <small className="text-muted">
                  Nếu có nhiều từ khóa, các từ khóa cách nhau bởi dấu ","
                </small>
              </div>
            </div>

            <button
              className="btn btn-primary mt-2"
              onClick={handleAdvancedSearch}
            >
              Tìm kiếm
            </button>
          </div>
          <div className="dropdown-divider"></div>
        </>
      );
    };

    const convertSize = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    const reupdateSearch = async (docId) => {
      setUpdate(v => !v)
      const d = await documentServices.getResponseDocument(docId)
      // console.log({docId: docId})
      const data = documentResult.map(v => {
        if(v.id === d.data.id) {
          v = d.data
        }
        return v;
      })
      // console.log({data: data});
      setDocumentResult(data)
    }

    const reupdateDel = async (docId) => {
      setUpdate(v => !v)
      const d = await documentServices.getResponseDocument(docId)
      let tmp = [...documentResult]
      for(var i = 0; i < tmp.length; i++) {
        if(tmp[i].id === d.data.id) {
          tmp.splice(i, 1)
        }
      }
      setDocumentResult(tmp)
    }

    return (
      <>
        <div className="container mt-3">
          <div>
            <div className='panel panel-default input-text-style'>
              <div className='title-style'><h6>Theo tên tài liệu</h6></div>
              <div className='panel-body mt-2'>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Nhập tên tài liệu cần tìm ..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="panel panel-default input-text-style mt-3">
              <div className='title-style'><h6>Ngày tạo</h6></div>
              <div className='panel-body'>
                <form className="form-inline">
                  <label>Từ ngày</label>
                  <input
                    type="date"
                    className="mb-2 mr-sm-2 m-lg-3"
                    onChange={(e) => setBeginDate(e.target.value)}
                  />

                  <label>Đến ngày</label>
                  <input
                    type="date"
                    className="mr-sm-2 m-lg-3"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </form>
              </div>
            </div>
            { !showButton && 
              <button className="btn btn-primary mt-3" onClick={handleNameSearch}>
                Tìm kiếm
              </button>
            }
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              readOnly
              checked={showAdvancedSearch}
              onClick={() => {
                setShowAdvancedSearch(!showAdvancedSearch)
                setShowButton(!showButton)
              }}
            />
            <label className="form-check-label">Tìm kiếm nâng cao</label>
          </div>
          <div className="dropdown-divider mt-2"></div>

          {showAdvancedSearch && advancedSearch()}

          <Table
            className="table-centered rounded mt-3"
            style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", verticalAlign:'middle', maxHeight:100, overflowY:'scroll' }}
          >
            <thead className="thead-dark">
              <tr>
                <th
                  className="border-0"
                  style={{ width: "40%", textAlign: "center" }}
                >
                  Tên tài liệu
                </th>
                <th
                  className="border-0"
                  style={{ width: "5%", textAlign: "center" }}
                >
                  Kích thước
                </th>
                <th
                  className="border-0"
                  style={{ width: "20%", textAlign: "center" }}
                >
                  Ngày tạo
                </th>
                <th
                  className="border-0"
                  style={{ width: "15%", textAlign: "center" }}
                >
                  Tác giả
                </th>
                <th
                  className="border-0"
                  style={{ width: "15%", textAlign: "center" }}
                >
                  Phiên bản
                </th>
                <th
                  className="border-0"
                  style={{ width: "5%", textAlign: "center" }}
                >
                  ...
                </th>
              </tr>
            </thead>
            <tbody>
              { 
                documentResult.length > 0 ? 
                documentResult.map((document, index) => (
                  <TableRow
                    key={document.id}
                    docId={document.id}
                    name={document.nameDocument}
                    is_lock={document.isLock}
                    createdTime={document.version.created}
                    version={document.version.name}
                    author={document.version.author}
                    size={convertSize(document.version.size)}
                    reupdateSearch={reupdateSearch}
                    reupdateDel={reupdateDel}
                    updateInfo={update}
                  />
                ))
                // console.log(documentResult)
              : <tr style={{ textAlign:'center', paddingTop:10 }}>
                  <td colSpan={6}>Không có tài liệu để hiển thị</td>
                </tr>
              }
            </tbody>
          </Table>
        </div>

        
      </>
    );
}

export default SearchDocument;