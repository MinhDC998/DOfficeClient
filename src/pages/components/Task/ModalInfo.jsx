import React, { useEffect, useState } from 'react';

import { Card, Button, Table, ListGroup, ListGroupItem, Modal } from '@themesberg/react-bootstrap';
import taskServices from "../../../services/task.services";
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment";
import { Link } from 'react-router-dom';

const ModalTaskInfo = ({ showModal, setshowModal, data, assigns }) => {

  const [show, setShow] = useState(showModal);
  const handleClose = () => setshowModal(false);
  const [tasks, setTasks] = React.useState();
  // const handleShow = () => setShow(true);



  useEffect(() => {

  }, [])
  console.log(data)



  return (
    <>


      <Modal
        slide="true"
        show={showModal} onHide={handleClose}
        size="md"

      >
        <Modal.Header closeButton>
          <Modal.Title>Tác vụ : {data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="work-info pr-5 ">
            <div className="row">
              <div className="col-5">Mô tả tác vụ :</div>
              <div className="col"> {data.description} </div>
            </div>

            <div className="row">
              <div className="col-5">Ngày bắt đầu :</div>
              <div className="col">
                {moment(data.beginDate).format('MM-DD-YYYY HH:mm:ss')}
              </div>
            </div>

            <div className="row">
              <div className="col-5">Thời hạn:</div>
              <div className="col">
                {moment(data.endDate).format('MM-DD-YYYY HH:mm:ss')}
              </div>
            </div>

            <div className="row">
              <div className="col-5"  >Trạng thái</div>
              <div className="col"  > {data.priority}  </div>
            </div>

            <div className="row">
              <div className="col-5"  >Trạng thái</div>
              <div className="col"  > {data.status}  </div>
            </div>
            {assigns ? (
              <div className="row">
                <div className="col-5"  >Nhân viên:</div>
                <div className="col"  >
                  <code>{assigns}</code>
                </div>
              </div>
            ) : null}

          </div>
        </Modal.Body>
        <Modal.Footer  >
          <Link to={'/task/detail/' + data.id}>
            <Button variant="outline-dark">
              <FontAwesomeIcon icon={faExpand} style={{ marginRight: 5 }} />
              Mở trong trang</Button>{' '}
          </Link>
        </Modal.Footer>
      </Modal>

    </>
  );

}
export default ModalTaskInfo;


