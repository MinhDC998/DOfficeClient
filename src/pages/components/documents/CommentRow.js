import moment from "moment";
import React, { useState } from "react";
import { Dropdown, Modal, Button, ButtonGroup } from "@themesberg/react-bootstrap";

import commentServices from '../../../services/comment.services'

function CommentRow({ commentId, author, content, updateComment, created }) {

    const [showError, setShowError] = useState(false)

    const handleDelete = async () => {
        // compare author with current user
        const currentUsername = localStorage.getItem('username')
        if(author === currentUsername) {
            await commentServices.deleteComment(commentId)
        } else {
            setShowError(!showError)
        }
        updateComment()
    }

    return (
      <>
        <div className="row d-flex mb-3">
          <div className="col-sm-1" style={{ width: 50 }}>
            <span>
              <i className="fa fa-user fa-3x" aria-hidden="true"></i>
            </span>
          </div>
          <div className="col">
            <div className="row mb-1 p-0">
              <div className="col-1"><label>{author}</label></div>
              <div className="col-3">
                <small className="text-muted" style={{ fontSize:13 }}>
                  {(new Date(created)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}
                  {/* {created} */}
                </small>
              </div>
            </div>
            <p>{content}</p>
          </div>
          <div className="col-1 float-end">
            <Dropdown as={ButtonGroup} className="my-3 m-lg-1">
                <Dropdown.Toggle split variant="light" className="btn-sm mt-1">
                ...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item onClick={handleDelete}>Xóa</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </div>

          
        </div>

        {/* modal error */}
        <Modal
          as={Modal.Dialog}
          centered
          show={showError}
          onHide={() => setShowError(false)}
        >
          <Modal.Header>
            <Modal.Title className="h6">Lỗi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bạn không có quyền xóa nhận xét này!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="link"
              className="text-gray ms-auto"
              onClick={() => setShowError(false)}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default CommentRow;