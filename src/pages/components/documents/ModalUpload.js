import React, { useState, useEffect } from "react";
import { Button, Modal } from "@themesberg/react-bootstrap";
import documentActions from "../../../actions/document.actions";
import categoryActions from "../../../actions/category.actions";
import { useDispatch, useSelector } from "react-redux";
import categoryService from "../../../services/category.services";
import Swal from 'sweetalert2'
import folderActions from "../../../actions/folder.actions";

function ModalUpload() {
  const dispatch = useDispatch()

  const Swal = require('sweetalert2')

  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const [selectedFile, setSelectedFile] = useState();
  const [checked, setChecked] = useState([]);
  // const [selectType, setSelectType] = useState()

  useEffect(() => {
    dispatch(categoryActions.getAllCategories())
    dispatch(folderActions.getPublicFolderId())
  }, [])

  const {allCategories} = useSelector(state => state.category)

  const {mydocumentid, publicfolderid} = useSelector(state => state.folder)

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const file = selectedFile
    if(selectedFile === undefined) {
      alertCheckFile('Bạn cần chọn file tài liệu để tải lên!')
      return false
    }

    const type = 'public' // when upload with this modal, type = public

    if(checked.length === 0) {
      alertCheckFile('Bạn cần chọn ít nhất 1 loại của tài liệu!')
      return false
    }

    dispatch(documentActions.uploadDocument(file, checked, publicfolderid, type))
      .then(result => {
        if(result) {
          Promise.all([
            // dispatch(documentActions.getMyDocument()),
            dispatch(folderActions.getResponseFolderEntity(mydocumentid)),
            dispatch(categoryActions.getResponseCategories())
          ])
          alertSuccess('Tải lên thành công!')
        } else {
          alertCheckFile("Tài liệu đã tồn tại hoặc đang chờ duyệt. Vui lòng kiểm tra lại.")
        }
      })
    setShowDefault(false)
    setChecked([])
  }

  const handleCheck = (id) => {
    setChecked(prev => {
        const isChecked = checked.includes(id)
        if(isChecked) {
            return checked.filter(item => item !== id)
        } else {
            return [...prev, id]
        }
    })
  }

  const uploadTypes = [
    {
      id: 1,
      name: 'Công khai'
    },
    {
      id: 2,
      name: 'Riêng tư'
    }
  ]

  const alertSuccess = (text) => {
    return Swal.fire({
      position: 'centered',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 2000
    })
  }

  const alertCheckFile = (text) => {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }

  return (
    <>
      <Button
        variant="primary"
        className="my-3"
        onClick={() => setShowDefault(true)}
      >
        Tải lên tài liệu
      </Button>

      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Tải lên tài liệu</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
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

          {/* <div className="panel panel-default">
            <label>Kiểu tài liệu</label>
            <div className="row panel-body mt-1">
              {uploadTypes.map((type, index) => (
                <div key={type.id} className="col">
                  <input
                    type="radio"
                    className="form-check-input mr2"
                    checked={selectType === type.id}
                    onChange={() => setSelectType(type.id)}
                    style={{ marginRight:10 }}
                  />
                    {type.name}
                </div>
              ))}
            </div>
          </div> */}

          <div className="mb-3 mt-2 form-group">
            <label>Loại tài liệu</label>
            <div className="row-cols-4">
              {allCategories?.map((category, index) => (
                <div key={category.id} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    checked={checked.includes(category.id)}
                    value={category.code}
                    onChange={() => handleCheck(category.id)}
                    className="form-check-input"
                  />
                  <label className="form-check-label">
                    {category.nameCategory}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleUpload()}>
            Tải lên
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleClose}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpload;
