import React from "react";
import { Button, Dropdown, ButtonGroup } from "@themesberg/react-bootstrap";
import { useDispatch } from "react-redux";
import documentActions from "../../../actions/document.actions";
import categoryActions from "../../../actions/category.actions";
import Swal from 'sweetalert2'

function ApproveOption({ documentId }) {
  
  const dispatch = useDispatch();

  const Swal = require('sweetalert2')

  const handleApprove = () => {
    dispatch(documentActions.approveDocument(documentId)).then(result => {
        if(result) {
            console.log({res: result});
            dispatch(documentActions.getPendingDocument());
            dispatch(categoryActions.getResponseCategories());
            alertSuccess("Đã phê duyệt!")
        }
    })
  }

  // may be error
  const handleReject = () => {
    dispatch(documentActions.rejectDocument(documentId)).then(result => {
        if(result) {
            console.log({resu: result});
            dispatch(documentActions.getPendingDocument())
            alertSuccess("Đã từ chối!")
        }
    })
  }

  // modal alert
  const alertSuccess = (text) => {
    return Swal.fire({
      position: 'centered',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 2000
    })
  }

  return (
    <div>
      <Dropdown as={ButtonGroup} className="my-3 m-lg-1 dropdown-style">
        <Dropdown.Toggle
          split
          variant="light"
          className="btn-sm"
        >...</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleApprove()}>
            Phê duyệt
          </Dropdown.Item>

          <Dropdown.Item onClick={() => handleReject()}>Từ chối</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ApproveOption;
