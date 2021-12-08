import React, { useEffect, useState } from 'react';
import './work.scss'
import { Card, Button, Table, ListGroup, ListGroupItem, Modal } from '@themesberg/react-bootstrap';
import taskServices from "../../../services/task.services";
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment";
import { Link } from 'react-router-dom';

const ModalInfo = ({ showModal, setshowModal, data }) => {

  const [show, setShow] = useState(showModal);
  const handleClose = () => setshowModal(false);
  const [tasks, setTasks] = React.useState();
  // const handleShow = () => setShow(true);

  const { id, title, content, beginDate, endDate, isCompleted } = data;

  useEffect(() => {

    getTaskByWorkId(id)

  }, [])
  const getTaskByWorkId = async (workId) => {
    const data = await taskServices.getTaskByWorkId(workId);

    setTasks(data);
    console.log(data)

  }


  return (
    <>

     
        <Modal
          slide
          show={showModal} onHide={handleClose}
          size="lg"

        >
          <Modal.Header closeButton>


            <Modal.Title>Công việc : {title}</Modal.Title>


          </Modal.Header>
          <Modal.Body>
            <div className="work-info pr-5 ">
              <div className="row">
                <div className="col-5">Nội dung công việc :</div>
                <div className="col"> {content} </div>
              </div>

              <div className="row">
                <div className="col-5">Ngày bắt đầu :</div>
                <div className="col">
                  {moment(beginDate).format('MM-DD-YYYY HH:mm:ss')}
                </div>
              </div>

              <div className="row">
                <div className="col-5">Thời hạn:</div>
                <div className="col">
                  {moment(endDate).format('MM-DD-YYYY HH:mm:ss')}
                </div>
              </div>
              <div className="row">
                <div className="col-5"  >Trạng thái</div>
                <div className="col" style={{ color: 'blue' }} > {isCompleted ? ('Hoàn thành') : 'Đang tiến hành'} </div>
              </div>

            </div>
            {tasks ? (
              <div className='list-task'>
                <ListGroup >
                  <p className="fw-bold pt-3"> Danh sách tác vụ : </p>


                  {tasks.data.length ? (
                    tasks.data.map((task) =>
                      <ListGroup.Item key={task.id}  >
                        + <code> {task.title}</code>
                      </ListGroup.Item>
                    )
                  ) : "Chưa có"}

                </ListGroup>
              </div>
            ) : 'loading...'}







          </Modal.Body>
          <Modal.Footer  >
            <Link to={'work/detail/' + id}>
              <Button variant="outline-dark">
                <FontAwesomeIcon icon={faExpand} style={{ marginRight: 5 }} />
                Mở trong trang</Button>{' '}


            </Link>


          </Modal.Footer>
        </Modal>
    
    </>
  );

}
export default ModalInfo;