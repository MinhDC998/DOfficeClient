import React, { useEffect } from 'react';
import { Card, Button, Table, ListGroup, ListGroupItem } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import TableRow from "./TableRow";
import meetingActions from '../../../actions/meetingActions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default () => {

  const dispatch = useDispatch()
  const { meetings, loading } = useSelector(state => state.meeting)


  useEffect(() => {

    dispatch(meetingActions.getAll())
  }, [])


  console.log(meetings);



  return (
    <>


      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>

        <div className="d-block mb-4 mb-xl-0">
          <h4>CUỘC HỌP</h4>
          {/* <p className="mb-0">
                    Dozens of reusable components built to provide buttons, alerts, popovers, and more.
                </p> */}
          <Button variant="secondary" className="m-1 mb-4">
            <Link to={Routes.MeetingCalendar.path}> Tạo cuộc họp mới</Link>
          </Button>
        </div>
      </div>

      {!loading ? (
        <Card border="light" className="shadow-sm">
          <Card.Body className="p-0">
            <Table  className="table-centered rounded table-hover" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              <thead className="thead-dark ">
                <tr>
                  <th className="border-0" style={{ width: '15%' }}>Tiêu đề</th>
                  <th className="border-0" style={{ width: '15%' }}>Phòng họp</th>
                  <th className="border-0" style={{ width: '10%' }}>Bắt đầu:</th>
                  <th className="border-0" >Kết thúc</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map?.(c => <TableRow key={`command-${c.id}`} {...c} />)}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ) : 'loading...'}
    </>
  )
}