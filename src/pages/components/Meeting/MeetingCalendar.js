import React, { useEffect } from 'react';
// import { render } from 'node-sass';

import moment from "moment";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import withReactContent from "sweetalert2-react-content";

import meetingServices from '../../../services/meeting.services'

import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import meetingActions from '../../../actions/meetingActions';
import EventModal from './EventModal'





const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));



const MeetingCalendar = () => {

  const dispatch = useDispatch()
  const defaultModalProps = { id: "", title: "", start: null, end: null };
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [modalProps, setModalProps] = React.useState(defaultModalProps);
  const [events, setEvents] = React.useState([]);

  const [update, setUpdate] = React.useState(false);

  const { meetings } = useSelector(state => state.meeting)
  const { tasks } = useSelector(state => state.task)


  useEffect(() => {



    dispatch(meetingActions.getAll())
      .then(rs => {
        let ListEvent = []

        if (rs) {
          for (var i = 0; i < rs.length; i++) {
            const tmp = {
              id: rs[i].id,
              title: rs[i].title,
              groupId: 'meeting',
              start: moment(rs[i].start).format('YYYY-MM-DD HH:mm:ss'),
              end: moment(rs[i].end).format('YYYY-MM-DD HH:mm:ss'),
            }
            ListEvent.push(tmp)
            console.log(tmp)
          }
        }


        setEvents(ListEvent)

      })

  }, [update])


  const calendarRef = React.useRef();
  const currentDate = moment().format("YYYY-MM-DD");

  const onDateClick = (props) => {
    const { date } = props;

    const endDate = new Date(date).setDate(date.getDate() + 1);

    setModalProps({ ...modalProps, id: null, start: date, end: endDate });
    setShowAddModal(true);
  };

  const onEventClick = (props) => {
    const { event: { id, title, groupId, start, end } } = props;

    setModalProps({ id, title, groupId, start, end });
    setShowEditModal(true);
  };

  const onEventUpdate = (props) => {
    const { id, title, start, end } = props;
    const calendarApi = calendarRef.current.getApi();
    const calendarElem = calendarApi.getEventById(id);

    if (calendarElem) {
      calendarElem.setProp("title", title);
      calendarElem.setStart(start);
      calendarElem.setEnd(end);
    }

    setShowEditModal(false);
  };

  const onEventAdd = (props) => {
    const newEvent = { ...props, dragable: true, className: 'bg-blue text-white', allDay: true };

    setShowAddModal(false);
    setEvents([...events, newEvent]);
    setModalProps(defaultModalProps);
  };

  const onEventDelete = async function (id) {
    const result = await SwalWithBootstrapButtons.fire({
      icon: 'error',
      title: 'Xác nhận xoá',
      text: 'Bạn có chắc muốn xoá event này?',
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: 'Huỷ'
    });

    setShowEditModal(false);
    setModalProps(defaultModalProps);

    if (result.isConfirmed) {
      await SwalWithBootstrapButtons.fire('Deleted!', 'The event has been deleted.', 'success');
      await meetingServices.deleteMeetingById(id)
      const newEvents = events.filter(e => e.id !== id);
      setEvents(newEvents);
    }
  };

  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  return <>
    {showEditModal ? (
      <EventModal
        {...modalProps}
        edit={true}
        show={showEditModal}
        setShow={setShowEditModal}
        update={update}
        setUpdate={setUpdate}
        onUpdate={onEventUpdate}
        onDelete={onEventDelete}
        onHide={handleClose}
      />
    ) : null}

    {showAddModal ? (
      <EventModal
        {...modalProps}
        show={showAddModal}
        update={update}
        setUpdate={setUpdate}
        setShow={setShowAddModal}
        onAdd={onEventAdd}
        onHide={handleClose}
      />
    ) : null}
    <h1>Lịch công việc</h1>
    <div style={{ padding: 10, borderTop: '1px solid black', color: 'black' }}>

      <FullCalendar
        editable
        selectable
        events={events}
        ref={calendarRef}
        themeSystem="standard"
        initialView="dayGridMonth"
        displayEventTime={false}
        initialDate={currentDate}
        dateClick={onDateClick}
        eventClick={onEventClick}
        plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin, interactionPlugin]}
        buttonText={{
          prev: "Previous",
          next: "Next",
          month: "Month",
          week: "Week",
          day: "Day",
          today: "Today",
        }}
      />
    </div>

  </>;
};

export default MeetingCalendar;