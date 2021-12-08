import React, { useEffect } from 'react';
import { Card, Button, Table, ListGroup, ListGroupItem } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import Preloader from "../../../components/Preloader";

import * as userApi from '../../../services/user';
import TableRow from "./TableRow";
import meetingService from '../../../services/meeting.services';

export default () => {
  const [meetings, setMeetings] = React.useState();

  useEffect(() => {

    getListMeeting()
  }, [])

  const getListMeeting = async () => {
    const data = await meetingService.getAll();

    setMeetings(data);
  }

  console.log(meetings);



  return (
    <>
     
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>

        <div className="d-block mb-4 mb-xl-0">
          <h4>CALENDAR</h4>
          {/* <p className="mb-0">
                    Dozens of reusable components built to provide buttons, alerts, popovers, and more.
                </p> */}

          <Button variant="secondary" className="m-1 mb-4">
            <Link to={Routes.AddWork.path}> Creat new work</Link>
          </Button>
        </div>
      </div>

      {meetings ? (
        <Card border="light" className="shadow-sm">
          <Card.Body className="p-0">
            <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              <thead className="thead-light ">
                <tr>
                  <th className="border-0" style={{ width: '15%' }}>Name</th>
                  <th className="border-0" style={{ width: '15%' }}>Venue</th>
                  <th className="border-0" style={{ width: '10%' }}>Start</th>
                  <th className="border-0" >End</th>
                
                </tr>
              </thead>
              <tbody>
                {meetings.data.map?.(c => <TableRow key={`command-${c.id}`} {...c} />)}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ) : 'loading...'}
    </>
  )
}