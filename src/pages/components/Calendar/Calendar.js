import React, { useEffect } from 'react';
// import { render } from 'node-sass';

import moment from "moment";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import withReactContent from "sweetalert2-react-content";

import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import taskActions from '../../../actions/taskActions';
import workActions from '../../../actions/workActions';
import EventModal from './EventModal'





const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));



const Calendar = () => {

  const dispatch = useDispatch()
  const defaultModalProps = { id: "", title: "", start: null, end: null };
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [modalProps, setModalProps] = React.useState(defaultModalProps);
  const [events, setEvents] = React.useState([]);

  const { works } = useSelector(state => state.work)
  const { tasks } = useSelector(state => state.task)


  useEffect(() => {
    Promise.all(
      [
        dispatch(workActions.getAll()),
        dispatch(taskActions.getAll())
      ]).then(rs => {
        const listWork = rs[0] ?? [];
        const listTask = rs[1] ?? [];
        let ListEvent = []
        if (listWork) {
          for (var i = 0; i < listWork.length; i++) {
            const tmp = {
              id: listWork[i].id,
              title: 'Công việc: ' + listWork[i].title,
              groupId: 'work',
              start: moment(listWork[i].endDate).format('YYYY-MM-DD'),
              end: moment(listWork[i].endDate).format('YYYY-MM-DD'),
            }
            ListEvent.push(tmp)
          }
        }

        if (listTask) {
          for (var i = 0; i < listTask.length; i++) {
            const tmp = {
              id: listTask[i].id,
              title: 'Tác vụ: ' + listTask[i].title,
              groupId: 'task',
              start: moment(listTask[i].endDate).format('YYYY-MM-DD'),
              end: moment(listTask[i].endDate).format('YYYY-MM-DD'),
            }
            ListEvent.push(tmp)
          }
        }
        setEvents(ListEvent)


      })




  }, [])


  const calendarRef = React.useRef();
  const currentDate = moment().format("YYYY-MM-DD");

  const onDateClick = (props) => {
    const { date } = props;
    const id = events.length + 1;
    const endDate = new Date(date).setDate(date.getDate() + 1);

    setModalProps({ ...modalProps, id, start: date, end: endDate });
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
        onUpdate={onEventUpdate}
        onDelete={onEventDelete}
        onHide={handleClose}
      />
    ) : null}

    {showAddModal ? (
      <EventModal
        {...modalProps}
        show={showAddModal}
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

export default Calendar;