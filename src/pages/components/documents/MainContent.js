import React, { useState, useEffect } from "react";
import "./maincontent.scss";
import { Table } from "@themesberg/react-bootstrap";
import { Button, Dropdown, ButtonGroup } from "@themesberg/react-bootstrap";

import Optional from './Optional'
import categoryService from "../../../services/category.services";
import InfomationDocument from "./InfomationDocument";
import DefaultInfoDocument from "./DefaultInfoDocument";
import documentServices from "../../../services/document.services";
import TrashOption from "./TrashOption";
import { useDispatch, useSelector } from "react-redux";
import documentActions from '../../../actions/document.actions'
import categoryActions from '../../../actions/category.actions'
import folderActions from '../../../actions/folder.actions';
import FilterOption from "./filter/FilterOption";
import Popup from "./popup/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faFile } from "@fortawesome/free-solid-svg-icons";
import FolderOption from "./FolderOption";
import folderServices from "../../../services/folder.services";
import MyDocumentOption from "./MyDocumentOption";

const Tree = ({ data = [], getNodeData }) => {
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data.map((tree, i) => {
          if (tree.categoryName) {
            return (
              <div key={tree.id}>
                <TreeNode node={tree} getNodeData={getNodeData} />
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
};

const TreeNode = ({ node, getNodeData }) => {
  const [childVisible, setChildVisibility] = React.useState(false);

  const hasChild = node.listDocument ? true : false;

  const nodeData = (nodeData) => (e) => {
    getNodeData(nodeData)();
    setChildVisibility((v) => !v);
  };

  return (
    <li className="d-tree-node border-0">
      <div className="d-flex" onClick={nodeData(node)}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${childVisible ? "active" : ""}`}
          >
          </div>
        )}

        <div className={`col d-tree-head`}>
          <i className="fa fa-folder" aria-hidden="true"></i>
          {node.categoryName}
        </div>

      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <Tree data={node.listDocument} getNodeData={getNodeData} />
          </ul>
        </div>
      )}
    </li>
  );
};
// folder.chidren = data
const TreeMyDocument = ({ data = [], getNodeData }) => {
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data.map((tree, i) => {
          if (tree) {
            // console.log({tree: tree});
            return (
              <div key={i}>
                <TreeNodeMyDocument node={tree} getNodeData={getNodeData} />
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
};

const TreeNodeMyDocument = ({ node, getNodeData }) => {
  const [childVisible, setChildVisibility] = React.useState(false);
  const [showFolderOption, setShowFolderOption] = useState(false)
  const showDropDown = (e) => {
    e.preventDefault()
    setShowFolderOption(true)
  }

  const hideDropDown = (e) => {
    e.preventDefault()
    setShowFolderOption(false)
  }

  const hasChild = node.children ? true : false;

  const nodeData = (nodeData) => (e) => {
    getNodeData(nodeData)();
    setChildVisibility((v) => !v);
  };

  return (
    <li className="d-tree-node border-0">
      <div className="d-flex" onClick={nodeData(node)}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${childVisible ? "active" : ""}`}
          >
          </div>
        )}

        <div className={`col d-tree-head`} onMouseEnter={showDropDown} onMouseLeave={hideDropDown}>
          <i className={`${node.name ? "fa fa-folder" : "fa fa-file"}`}></i>
          {node.name ? node.name : node.nameDocument}
          <FolderOption 
            folderId={`${node.name ? node.id : ''}`}
            fldname={`${node.name ? node.name : ''}`}
            showFolderOption={node.name && node.name !== 'Công khai' && node.name !== 'Được chia sẻ' ? showFolderOption : ''} 
          />
        </div>

      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
            <TreeMyDocument data={node.children} getNodeData={getNodeData} />
        </div>
      )}
    </li>
  );
};

const MainContent = () => {
  const dispatch = useDispatch();

  const [nodeData, setNodeData] = React.useState([]);
  const [previewFile, setPreviewFile] = React.useState();

  const [showCategories, setShowCategories] = useState(false);
  const [showMyDocument, setShowMyDocument] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateList, setUpdateList] = useState(false)

  useEffect(() => {
    dispatch(folderActions.getMyDocumentFolderId()).then(result => {
      dispatch(folderActions.getResponseFolderEntity(result));
    })
    dispatch(categoryActions.getResponseCategories());
    // dispatch(documentActions.getMyDocument());
    dispatch(documentActions.getTrash());
    // console.log('rerender');
  }, [update]);

  const { categories } = useSelector((state) => state.category);
  const { myDocuments, trash } = useSelector((state) => state.document);
  const { folder } = useSelector((state) => state.folder);
  const {mydocumentid} = useSelector(state => state.folder);

  const getNodeData = (data) => (e) => {
    setNodeData(data);
  };

  const getPreviewFile = (file) => (e) => {
    setPreviewFile(file);
  };

  const convertSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  // console.log({ previewFile });

  // console.log({ nodedata: nodeData });

  // render for categories folder
  const renderTableContent = () => {
    const content = (v, i) => {
      return (
        <tr
          key={i}
          onClick={v.listDocument ? getNodeData(v) : getPreviewFile(v)}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          className={`${v.isLock === 1 ? "table-warning lock-style" : ""}`}
        >
          <td className="border-0 over-flow-text" style={{ maxWidth: 100 }}>
            {v.nameDocument}
          </td>
          <td className="border-0" style={{ width: "5%", textAlign: "center" }}>
            {" "}
            {v.version?.size ? convertSize(v.version?.size) : ""}{" "}
          </td>
          <td
            className="border-0"
            style={{ width: "20%", textAlign: "center" }}
          >
            {" "}
            {v.version?.created}{" "}
          </td>
          <td
            className="border-0"
            style={{ width: "15%", textAlign: "center" }}
          >
            {" "}
            {v.version?.author}{" "}
          </td>
          <td
            className="border-0"
            style={{ width: "15%", textAlign: "center" }}
          >
            {" "}
            {v.version?.name}{" "}
          </td>
          <td className="border-0" style={{ width: "5%", textAlign: "center" }}>
            {v.version?.size ? (
              <Optional
                documentId={v.id}
                nameDocument={v.nameDocument}
                is_lock={v.isLock}
                reupdateDocument={reupdateDocument}
                reupdateDelete={reupdateDelete}
                updateInfo={update}
                author={v.version?.author}
                format={v.format}
                type={v.type}
              />
            ) : (
              ""
            )}
          </td>
        </tr>
      );
    };

    let renderData = "";

    if (!nodeData) return renderData;

    if (nodeData.listDocument) {
      renderData = nodeData.listDocument.map((v, i) => content(v, i));
      // console.log(renderData)
      return renderData;
    }

    renderData = content(nodeData, 0);

    return renderData;
  };

  // render for my document folder
  const renderMyDocument = () => {
    const content = (v, i) => {
      return (
        <tr
          key={i + 1}
          onClick={v.children ? getNodeData(v) : getPreviewFile(v)}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          className={`${v.isLock === 1 ? "table-warning lock-style" : ""}`}
        >
          <td className="border-0 over-flow-text" style={{ maxWidth: 100 }}>
            {v?.name ? v?.name : v?.nameDocument}
          </td>
          <td className="border-0" style={{ width: "5%", textAlign: "center" }}>
            {v.version?.size ? convertSize(v.version?.size) : ""}
          </td>
          <td
            className="border-0"
            style={{ width: "20%", textAlign: "center" }}
          >
            {v?.created ? v?.created : v.version?.created}
          </td>
          <td
            className="border-0"
            style={{ width: "15%", textAlign: "center" }}
          >
            {v?.userCreated ? v?.userCreated : v.version?.author}
          </td>
          <td
            className="border-0"
            style={{ width: "15%", textAlign: "center" }}
          >
            {v.version?.name ? v.version?.name : ""}
          </td>
          <td className="border-0" style={{ width: "5%", textAlign: "center" }}>
            {v.version?.name ? (
              <MyDocumentOption
                documentId={v.id}
                nameDocument={v.nameDocument}
                is_lock={v.isLock}
                reupdateDocument={reupdateMyDocument}
                // reupdateDelete={reupdateDelete}
                updateInfo={update}
                author={v.version?.author}
                format={v.format}
                setUpdateList={setUpdateList}
              />
            ) : (
              ""
            )}
          </td>
        </tr>
      );
    };

    let renderData = "";

    if (!nodeData) return renderData;

    if (nodeData.children) {
      // {console.log({nodedata: nodeData.children})}
      renderData = nodeData.children.map((v, i) => content(v, i));
      return renderData;
    }

    renderData = content(nodeData, 0);

    return renderData;
  };

  // render for trash folder
  const renderTable = (dataa) => {
    const content = (v, i) => {
      return (
        <tr
          key={i}
          onClick={v.listDocument ? getNodeData(v) : getPreviewFile(v)}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          className={`${v.isLock === 1 ? "table-warning lock-style" : ""}`}
        >
          <td className="border-0 over-flow-text" style={{ maxWidth: 100 }}>
            {v.nameDocument}
          </td>
          <td className="border-0" style={{ width: "5%", textAlign: "center" }}>
            {" "}
            {v.version?.size ? convertSize(v.version?.size) : ""}{" "}
          </td>
          <td
            className="border-0"
            style={{ width: "20%", textAlign: "center" }}
          >
            {" "}
            {v.version?.created}{" "}
          </td>
          <td
            className="border-0"
            style={{ width: "15%", textAlign: "center" }}
          >
            {" "}
            {v.version?.author}{" "}
          </td>
          <td
            className="border-0"
            style={{ width: "15%", textAlign: "center" }}
          >
            {" "}
            {v.version?.name}{" "}
          </td>
          <td className="border-0" style={{ width: "5%", textAlign: "center" }}>
            {v.version?.size ? (
              // <TrashOption documentId={v.id} reupdateDocument={reupdateTrash} />
              <TrashOption document={v} reupdateDocument={reupdateTrash} />
            ) : (
              ""
            )}
          </td>
        </tr>
      );
    };

    let renderData = "";

    if (!dataa) return renderData;

    if (dataa) {
      renderData = dataa.map((v, i) => content(v, i));
      // console.log(renderData);
      return renderData;
    }

    renderData = content(dataa, 0);

    return renderData;
  };

  // call when restore 1 version
  const rerender = (version) => {
    setUpdate((v) => !v);
    const test = nodeData.listDocument.map((v) => {
      if (v.id === version.documentId) {
        v.version = version;
      }
      return v;
    });
    setNodeData({ ...nodeData, listDocument: test });
  };

  // call when do any actions except delete
  const reupdateDocument = async (documentId) => {
    setUpdate((v) => !v);
    const d = await documentServices.getResponseDocument(documentId);
    const data = nodeData.listDocument.map((v) => {
      if (v.id === d.data.id) {
        v = d.data;
      }
      return v;
    });
    console.log(data);
    setNodeData({ ...nodeData, listDocument: data });
  };

  // call when delete 1 document
  const reupdateDelete = async (documentId) => {
    const d = await documentServices.getResponseDocument(documentId);
    let tmp = [...nodeData.listDocument];
    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].id === d.data.id) {
        tmp.splice(i, 1);
      }
    }
    setNodeData({ ...nodeData, listDocument: tmp });
    dispatch(documentActions.getTrash());
  };

  // call when restore 1 document
  const reupdateTrash = async () => {
    Promise.all([
      dispatch(documentActions.getTrash()),
      // dispatch(documentActions.getMyDocument()),
      dispatch(folderActions.getResponseFolderEntity(mydocumentid)),
      dispatch(categoryActions.getResponseCategories()),
    ]);
  };

  // call when restore version of document in my document
  const rerenderRestoreMyDocument = async (version) => {
    setUpdate(v => !v);
    const data = nodeData.children.map(v => {
      if(v.nameDocument) {
        if(v.id === version.documentId) {
          v.version = version
        }
        return v;
      }
    })
    setNodeData({...nodeData, chidlren: data})
  };

  // call when do actions with my document
  const reupdateMyDocument = async (documentId) => {
    setUpdate((v) => !v);
    const d = await documentServices.getResponseDocument(documentId);
    const element = await folderServices.getResponseFolderEntity(d.data.folderId)
    const tmp = element.data
    setNodeData(tmp)
  };

  // search element in recursive tree
  function searchTree(element, matchingTitle) {
    if (element.id === matchingTitle) {
      return element;
    } else if (element.children != null) {
      var i;
      var result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = searchTree(element.children[i], matchingTitle);
      }
      return result;
    }
    return null;
  }

  return (
    <>
      {/* <Popup /> */}
      <div id="wrapper" className="box-shadow">
        <div id="tree-document">
          <div className="col text-center">
            <div className="text-left text-dark">
              <div className="folder">
                <h6
                  onClick={() => {
                    setShowCategories(!showCategories);
                    setShowMyDocument(false);
                    setShowTrash(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <span className="m-3">
                    <i className="fa fa-folder" aria-hidden="true"></i>
                  </span>
                  Tài liệu
                </h6>
                {showCategories && (
                  <Tree data={categories} getNodeData={getNodeData} />
                )}
              </div>

              <div className="folder">
                <h6
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowMyDocument(!showMyDocument);
                    setShowCategories(false);
                    setShowTrash(false);
                  }}
                >
                  <span className="m-3">
                    <i className="fa fa-folder" aria-hidden="true"></i>
                  </span>
                  Tài liệu của tôi
                </h6>
                {showMyDocument && (
                  <TreeMyDocument
                    data={folder?.children}
                    getNodeData={getNodeData}
                  />
                )}
              </div>

              <h6
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowTrash(!showTrash);
                  setShowCategories(false);
                  setShowMyDocument(false);
                }}
              >
                <span className="m-3">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </span>
                Thùng rác
              </h6>
            </div>
          </div>
        </div>

        <div id="wrapper-document-data">
          <div id="document-data">
            <Table className="table-centered rounded mt-3">
              <thead className="thead-light">
                <tr>
                  <th
                    className="border-0"
                    style={{ textAlign: "center", maxWidth: 100 }}
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
                {showCategories && renderTableContent()}
                {showMyDocument && renderMyDocument()}
                {showTrash && renderTable(trash)}
              </tbody>
            </Table>
          </div>

          <div id="preview-file">
            {previewFile ? (
              <InfomationDocument
                documentId={previewFile.id}
                versionId={previewFile.version.id}
                versionName={previewFile.version.name}
                update={
                  showMyDocument === true ? rerenderRestoreMyDocument : rerender
                }
                showMyDocument={showMyDocument}
                showTrash={showTrash}
                updateDetail={update}
                type={previewFile.type}
                shared={previewFile.shared}
                owner={previewFile.owner}
                updateList={updateList}
              />
            ) : (
              <DefaultInfoDocument />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
