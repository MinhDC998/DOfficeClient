import React, { useState, useEffect } from "react";
import { Button, Modal } from "@themesberg/react-bootstrap";
import documentActions from "../../../actions/document.actions";
import categoryActions from "../../../actions/category.actions";
import { useDispatch, useSelector } from "react-redux";
import categoryService from "../../../services/category.services";
import Swal from 'sweetalert2'

function ModalAddCategory() {
  const dispatch = useDispatch()

  const Swal = require('sweetalert2')

  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const [nameCategory, setNameCategory] = useState('')

  const handleAddCategory = () => {
      dispatch(categoryActions.createCategory(nameCategory)).then(result => {
        if(result) {
            dispatch(categoryActions.getAllCategories());
            dispatch(categoryActions.getResponseCategories());
            alertSuccess("Thêm mới thành công!");
        } else {
            alertCheckFile("Loại tài liệu đã tồn tại!")
        }
      })
      handleClose()
  }

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
        Thêm loại tài liệu
      </Button>

      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Thêm loại tài liệu</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <div className="panel panel-default mb-3">
            <div className="panel-body">
              <label className="form-label">Nhập tên loại tài liệu</label>
              <input
                className="form-control"
                type="text"
                placeholder="Tên loại tài liệu ..."
                value={nameCategory}
                onChange={(e) => setNameCategory(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleAddCategory()}>
            Thêm mới
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

export default ModalAddCategory;
