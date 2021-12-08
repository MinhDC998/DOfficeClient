import React, { useEffect, useState } from 'react';
import { Card, Button, Table, ListGroup, ListGroupItem, Modal, DropdownButton, Dropdown } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import TableRow from "./TableRow";
import workServices from '../../../services/work.services';
import StatusShow from './StatusShow';


export default () => {


  const [name, setName] = useState("Linh")
  const [works, setWorks] = React.useState();
  const [tableShow,setTableShow] = React.useState(true)
  const [statusShow,setStatusShow] = React.useState(false)

  const handleTableShow = () =>{
    setTableShow(true)
    setStatusShow(false)

  }

  const handleStatusShow = () =>{
    setTableShow(false)
    setStatusShow(true)

  }


  useEffect(() => {

    getListWork()


  }, [])

  const getListWork = async () => {
    const data = await workServices.getAll();

    setWorks(data);
    console.log(data)
  }





  const deleteWork = (workId) => {

    if (works) {
      const data = works;
      const newList = data.data.filter(i => i.id !== workId)
      data.data = newList
      setWorks(data)


    }
    setName(workId)
  }

  // console.log(works);

  return (
    <>



      <div className="" style={{ width: "25%" }}>
        <ListGroup horizontal>
          <ListGroup.Item action href={Routes.WorkManagement.path} className='active'>
            Work
          </ListGroup.Item>
          <ListGroup.Item action href={Routes.TaskManagement.path} >
            Task
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>

        <div className="d-block mb-4 mb-xl-0">
          <h4>Danh sách công việc</h4>
          {/* <p className="mb-0">
                    Dozens of reusable components built to provide buttons, alerts, popovers, and more.
                </p> */}

          <Button variant="secondary" className="m-1 mb-4">
            <Link to={Routes.AddWork.path}>Tạo công việc mới</Link>
          </Button>
        </div>
      </div>


      {works ? (
        <>
          <DropdownButton variant='secondary' id="dropdown-basic-button" title="Xem theo:" style={{ paddingBottom: '10px' }}>
            <Dropdown.Item  onClick={handleTableShow}>Bảng</Dropdown.Item>
            <Dropdown.Item onClick={handleStatusShow}>Trạng thái</Dropdown.Item>
            <Dropdown.Item >Something else</Dropdown.Item>
          </DropdownButton>





          <Card border="light" className="shadow-sm">

            <Card.Body className="p-0">

              {statusShow?(<StatusShow works={works.data} />

              ):null}

              {tableShow?(<Table className="table-centered rounded table-hover" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                <thead className="thead-dark ">
                  <th style={{ width: '10%' }}> Tiêu đề </th>
                  <th style={{ width: '10%' }}> Trạng thái </th>
                  <th style={{ width: '10%' }}> Thòi hạn </th>
                  <th > Nhân viên</th>
                  <th> Mô tả </th>
                  <th>  </th>
                </thead>
                <tbody>
                  {works.data.map?.(c => <TableRow key={`command-${c.id}`} {...c} deleteWork={deleteWork} />)}
                </tbody>
              </Table>):null}
              
            </Card.Body>
          </Card>
        </>
      ) : 'loading...'}
    </>
  )
}