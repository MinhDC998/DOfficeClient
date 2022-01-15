import React, { useState, useEffect } from "react";
import { Card, Image, Table } from "@themesberg/react-bootstrap";
import { Button, Dropdown, ButtonGroup } from "@themesberg/react-bootstrap";
import { Modal } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './option.scss'
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import folderActions from '../../../actions/folder.actions';
import documentActions from "../../../actions/document.actions";
import folderServices from "../../../services/folder.services";
import categoryActions from "../../../actions/category.actions";

function FolderOption({ folderId, fldname, showFolderOption }) {
  const dispatch = useDispatch();

  const Swal = require("sweetalert2");

  const [show, setShow] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showRenameFolder, setShowRenameFolder] = useState(false);
  const [showUploadDocument, setShowUploadDocument] = useState(false);

  const [newName, setNewName] = useState('')
  const [folderName, setFolderName] = useState(fldname);
  const [selectedFile, setSelectedFile] = useState();
  const [checked, setChecked] = useState([]);

  const { categories } = useSelector((state) => state.category);
  // console.log({categories: categories});

  const {mydocumentid} = useSelector(state => state.folder)

  const handleCreateFolder = async () => {
    console.log({parentid: folderId});
    const result = await folderServices.createFolder(newName, folderId)
    if(result.code === '200') {
        dispatch(folderActions.getResponseFolderEntity(mydocumentid))
        alertSuccess('Tạo thư mục thành công!')
    }
    setShowCreateFolder(false)
    setNewName('')
  };

  const handleRenameFolder = async () => {
    console.log({id: folderId});
    const result = await folderServices.renameFolder(folderId, folderName)
    if(result.code === '200') {
        dispatch(folderActions.getResponseFolderEntity(mydocumentid))
        alertSuccess('Đã đổi tên!')
    }
    setShowRenameFolder(false)
    setFolderName('')
  };

  const handleDeleteFolder = () => {
    console.log({id: folderId});
    return Swal.fire({
        title: 'Bạn có chắc muốn xóa không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa nó!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await folderServices.deletes(folderId)
          if(result.code === '200') {
            dispatch(folderActions.getResponseFolderEntity(mydocumentid))
          }
  
          Swal.fire(
            'Đã xóa!',
            'Thư mục đã bị xóa!'
          )
        }
      })
  };

  const handleUploadDocument = async () => {
    const file = selectedFile;
    console.log({id: folderId});
    if (selectedFile === undefined) {
      alertCheckFile("Bạn cần chọn file tài liệu để tải lên!");
      return false;
    }
    // default is private
    const type = "private";
    if (checked.length === 0) {
      alertCheckFile("Bạn cần chọn ít nhất 1 loại của tài liệu!");
      return false;
    }
    dispatch(documentActions.uploadDocument(file, checked, folderId, type)).then(
      (result) => {
        if (result) {
          dispatch(folderActions.getResponseFolderEntity(mydocumentid));
          // dispatch(categoryActions.getResponseCategories())
          alertSuccess("Tải lên thành công!");
        }
      }
    );
    setShowUploadDocument(false);
    setChecked([]);
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // get list selected categories
  const handleCheck = (id) => {
    setChecked((prev) => {
      const isChecked = checked.includes(id);
      if (isChecked) {
        return checked.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // modal alert
  const alertSuccess = (text) => {
    return Swal.fire({
      position: "centered",
      icon: "success",
      title: text,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const alertCheckFile = (text) => {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  // console.log({abc: folderId})

  return (
    <>
      {showFolderOption ? (
        <Dropdown as={ButtonGroup} className="my-3 m-lg-1 dropdown-style">
          <Dropdown.Toggle split variant="light" className="btn-sm">
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => setShowCreateFolder(!showCreateFolder)}
            >
              Tạo thư mục
            </Dropdown.Item>
            
            { folderName === "Riêng tư" ? "" :
              <Dropdown.Item
                onClick={() => setShowRenameFolder(!showRenameFolder)}
              >
                Đổi tên
              </Dropdown.Item>
            }
            
            { folderName === "Riêng tư" ? "" :
              <Dropdown.Item onClick={handleDeleteFolder}>
                Xóa thư mục
              </Dropdown.Item>
            }
            
            <Dropdown.Item
              onClick={() => setShowUploadDocument(!showUploadDocument)}
            >
              Tải lên tài liệu
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <></>
      )}

      {/* modal create folder */}
      <Modal
        as={Modal.Dialog}
        centered
        show={showCreateFolder}
        onHide={() => setShowCreateFolder(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Tạo thư mục</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setShowCreateFolder(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nhập tên thư mục</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tên thư mục ..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateFolder}>
            Tạo mới
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setShowCreateFolder(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal rename folder */}
      <Modal
        as={Modal.Dialog}
        centered
        show={showRenameFolder}
        onHide={() => setShowRenameFolder(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Đổi tên thư mục</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setShowRenameFolder(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nhập tên mới</label>
            <input
              className="form-control"
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRenameFolder}>
            Thay đổi
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setShowRenameFolder(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal upload document */}
      <Modal
        as={Modal.Dialog}
        centered
        show={showUploadDocument}
        onHide={() => setShowUploadDocument(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Tải lên tài liệu</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setShowUploadDocument(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="panel panel-default mb-3">
            <div className="panel-body">
              <label className="form-label">Chọn tài liệu tải lên</label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => onFileChange(e)}
              />
            </div>
          </div>

          <div className="mb-3 mt-2 form-group">
            <label>Loại tài liệu</label>
            <div className="row-cols-4">
              {categories?.map((category, index) => (
                <div key={category.id} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    checked={checked.includes(category.id)}
                    value={category.code}
                    onChange={() => handleCheck(category.id)}
                    className="form-check-input"
                  />
                  <label className="form-check-label">
                    {category.categoryName}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUploadDocument}>
            Tải lên
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setShowUploadDocument(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FolderOption;
