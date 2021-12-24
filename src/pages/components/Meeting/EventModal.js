
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';

import moment from "moment";
import { Col, Row, Form, Modal, Button, InputGroup, ModalTitle } from "@themesberg/react-bootstrap";


// Icon
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import staffActions from '../../../actions/staffActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import meetingActions from '../../../actions/meetingActions';



const EventModal = (props) => {

  const dispatch = useDispatch()

  const [title, setTitle] = React.useState(props.title);
  const [start, setStart] = React.useState(props.start);
  const [date, setDate] = React.useState(props.start)
  const [end, setEnd] = React.useState(props.end);




  const { show = false, edit = false, id } = props;
  const startDate = start ? moment(start).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
  const endDate = end ? moment(end).endOf("day").format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
  const { staffs } = useSelector(state => state.staff)
  const [attends, setAttends] = React.useState()
  const [attendString, setAttendString] = React.useState()


  const [input, setInput] = React.useState({
    title: '',
    venue: '',
    start: moment(start).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
    end: moment(end).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
    userAttend: [],
  });

  useEffect(() => {

    dispatch(staffActions.getAllStaff());

    if (id) {
      dispatch(meetingActions.getMeetingById(id)).then(
        rs => {
          const meetingDTO = {
            id: rs.id,
            title: rs.title,
            venue: rs.venue,
            start: moment(rs.start).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
            end: moment(rs.end).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
            userAttend: [],
          }
          setInput(meetingDTO);
        }
      )
      dispatch(meetingActions.getAssignByMeetingId(id)).then(
        rs => {
          var tmp = ''
          for (var i = 0; i < rs.length; i++) {
            tmp = tmp + rs[i].userName + ', '
          }
          if (tmp) {
            tmp = tmp.slice(0, tmp.length - 2);
            setAttendString(tmp)
          }
          else {
            setAttendString('Chưa có nhân viên, hãy nhấn thêm')
          }

        }
      )

    }
    else {
      const meetingDTO = {
        title: '',
        venue: '',
        start: moment(start).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
        end: moment(end).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
        userAttend: [],
      }
      setInput(meetingDTO);

    }

  }, []);
  const onChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'start' || name === 'end') {
      var tmp = moment(input.start).format('YYYY-MM-DD') + 'T' + value + ':00.000+00:00'
      var m = moment(tmp).subtract(7, 'h')
      value = moment(m).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
    }
    setInput({ ...input, [name]: value });

  }

  const onConfirm = async (e) => {
    e.preventDefault();

    console.log(input.start)
    let meetingDTO = {
      title: input.title,
      venue: input.venue,
      start: moment(input.start).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      end: moment(input.end).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      userAttend: [],
    }
    console.log('New: ', meetingDTO.start)


    setInput(meetingDTO)



    if (attends) {
      for (var i = 0; i < attends.length; i++)
        meetingDTO.userAttend.push(attends[i].id)
    }


    const formData = new FormData();
    Object.keys(meetingDTO).forEach((key) => {
      if (key === 'userAttend') {
        for (let i = 0; i < meetingDTO[key].length; i++) {
          formData.append(`${key}[${i}]`, meetingDTO[key][i]);
        }
      } else {
        formData.append(key, meetingDTO[key]);
      }
    });
    if (id) {
      formData.append('id', id);


    }

    if (edit) {
      dispatch(meetingActions.updateMeetingByForm(formData, id))
      dispatch(meetingActions.getAll())
      props.setUpdate(!props.update)
      props.setShow(false)


    }
    else {
      dispatch(meetingActions.createMeetingByForm(formData))
      dispatch(meetingActions.getAll())
      props.setUpdate(!props.update)
      props.setShow(false)

    }


  }
  const onDelete = () => {
    edit && props.onDelete && props.onDelete(id);


  }

  const onSelect = async (selectedList, selectedItem) => {
    setAttends(selectedList)
  }
  const onRemove = async (selectedList, removedItem) => {
    setAttends(selectedList)

  }
  const onHide = () => props.onHide && props.onHide();

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>

      <ModalTitle>
        <div style={{ paddingLeft: 25, paddingTop: 10 }} >
          {edit ? "" : "Tạo cuộc họp mới"}
        </div>
        {edit ? (
          <div style={{ display: 'flex' }}>
            <div style={{ paddingLeft: 25, paddingTop: 10 }}>
              Thông tin cuộc họp
            </div>

            <Button variant="outline-light" className=" ms-auto " >
              <FontAwesomeIcon icon={faExpand} style={{ marginRight: 5, fontSize: 10 }} />

              <Link to={'meeting/detail/' + id}>
                Xem Chi Tiết
              </Link>

            </Button>



          </div>

        ) : null}
      </ModalTitle>

      <Form className="modal-content">
        <Modal.Body>
          <Form.Group id="title" className="mb-4">
            <Form.Label>Cuộc họp</Form.Label>
            <InputGroup>
              <Form.Control autoFocus type="text" value={input.title} name='title' onChange={onChange} required />
            </InputGroup>
          </Form.Group>
          <Form.Group id="venue" className="mb-4">
            <Form.Label>Phòng họp</Form.Label>
            <Form.Control
              required
              type="text"
              name='venue'
              value={input.venue}
              onChange={onChange} />
          </Form.Group>

          {edit ? (
            <Row>
              <Col xs={12} lg={6}>
                <Form.Label>Nhân viên được mời</Form.Label>
              </Col>
              <Col xs={12} lg={6}>
                {attendString}

              </Col>

            </Row>
          ) : (
            <Form.Group id="userAttend" className="mb-4">
              <Form.Label>Nhân viên</Form.Label>
              <InputGroup onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                <Multiselect
                  options={staffs} // Options to display in the dropdown
                  selectedValues={attends}
                  displayValue="userName" // Property name to display in the dropdown options
                  placeholder="Chọn nhân viên"
                  onSelect={onSelect}
                  onRemove={onRemove}
                ></Multiselect>
              </InputGroup>
            </Form.Group>
          )}


          <Row>
            <Col xs={12} lg={6}>
              <Form.Group id="start">
                <Form.Label>Bắt đầu : Ngày {moment(input.start).format('DD-MM-YYYY')}</Form.Label>
                <InputGroup>
                  <Form.Control type="time" name='start' defaultValue={moment(input.start).format('HH:mm:ss')} onChange={onChange} required />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group id="end" className="mb-2">
                <Form.Label>Kết thúc</Form.Label>
                <InputGroup>
                  <Form.Control type="time" name='end' defaultValue={moment(input.end).format('HH:mm:ss')} onChange={onChange} required />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="me-2" onClick={onConfirm}>
            {edit ? "Cập nhật" : "Thêm cuộc họp"}
          </Button>

          {edit ? (
            <Button variant="danger" onClick={onDelete}>
              Xoá cuộc họp
            </Button>
          ) : null}

          <Button variant="link" className="text-gray ms-auto" onClick={onHide}>
            Đóng
          </Button>

        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default EventModal;