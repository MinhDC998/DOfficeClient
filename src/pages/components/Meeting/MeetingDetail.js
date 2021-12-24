import React, { useEffect } from 'react';
import moment from "moment";
import { Form, Button, InputGroup, } from '@themesberg/react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../routes';

import { faCheck, faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import { useDispatch } from 'react-redux';

import staffActions from '../../../actions/staffActions'
import { useSelector } from 'react-redux';


import meetingActions from '../../../actions/meetingActions';
import StaffList from './StaffList';

import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";


const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success me-3',
        cancelButton: 'btn btn-gray'
    },
    buttonsStyling: false
}));

export default (props) => {

    const id = props.match.params.id
    const dispatch = useDispatch();

    const [disabled, setDisabled] = React.useState(true)
    const [date, setDate] = React.useState()
    const [showCreateTaskModal, setShowCreateTaskModal] = React.useState()
    const [acceptList, setAcceptList] = React.useState([])
    const [refuseList, setRefuseList] = React.useState([])




    const handleCreateTaskShow = () => {
        setShowCreateTaskModal(true);
    }

    const history = useHistory();

    const [input, setInput] = React.useState({
        id: '',
        title: '',
        venue: '',
        start: '',
        end: '',
        userAttend: [],
    });


    const { meetingDetail, attendees, loading } = useSelector(state => state.meeting)
    const { staffs, } = useSelector(state => state.staff)

    useEffect(() => {

        dispatch(meetingActions.getMeetingById(id)).then(
            rs => {
                if (rs) {

                    const meeting = {
                        id: rs.id,
                        title: rs.title,
                        venue: rs.venue,
                        start: moment(rs.start).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
                        end: moment(rs.end).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
                        isDeleted: rs.isDeleted,
                        isCanceled: rs.isCanceled,

                    }
                    setDate(moment(rs.start).format('YYYY-MM-DD'))
                    setInput(meeting)
                    dispatch(staffActions.getAllStaff())
                    dispatch(meetingActions.getAssignByMeetingId(rs.id)).then(rs => {
                        var acp = []
                        var rfs = []
                        for (var i = 0; i < rs.length; i++) {
                            if (rs[i].isConfirm && rs[i].isAttend) {
                                acp.push(rs[i])
                            }
                            if (rs[i].isConfirm && !rs[i].isAttend) {
                                rfs.push(rs[i])
                            }

                        }
                        setAcceptList(acp)
                        setRefuseList(rfs)
                    }


                    )
                }
            }
        )
        componentDidMount()

    }, [])
    const componentDidMount = () => {
        document.title = "Thông tin cuộc họp";
    }
    console.log(acceptList)


    const onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'start' || name === 'end') {
            var tmp = moment(input.start).format('YYYY-MM-DD') + 'T' + value + ':00.000+00:00'
            var m = moment(tmp).subtract(7, 'h')
            value = moment(m).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
        }
        setDisabled(false)
        setInput({ ...input, [name]: value });

    }

    const changeDate = (e) => {

        let value = e.target.value;

        var date = moment(value).format('YYYY/MM/DD')

        var startTime = moment(input.start).format('HH:mm')
        var endTime = moment(input.end).format('HH:mm')

        var startStr = moment(date).format('YYYY-MM-DD') + 'T' + startTime + ':00.000+00:00'
        var endStr = moment(date).format('YYYY-MM-DD') + 'T' + endTime + ':00.000+00:00'


        var start = moment(startStr).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
        var end = moment(endStr).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')

        var newInput = { ...input, ['start']: start, ['end']: end }
        setInput(newInput);

        setDate(value)

        setDisabled(false)


    }



    const handleCanel = async (e) => {
        e.preventDefault();
        const name = 'isCanceled'
        const value = !input.isCanceled
        let newInput = { ...input, [name]: value }
        setInput(newInput)
        await SwalWithBootstrapButtons.fire('Thành công!', 'Đã thay đổi trạng thái cuộc họp', 'success');
        dispatch(meetingActions.updateMeetingDetail(newInput, id)).then((result) => {
            if (result)
                dispatch(meetingActions.getMeetingById(id))

        })


    }


    const onSubmit = async (e) => {

        e.preventDefault();
        const result = await SwalWithBootstrapButtons.fire({
            icon: 'question',
            title: 'Xác nhận lưu chỉnh sửa',
            text: 'Bạn có chắc muốn lưu thay đổi?',
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: 'Huỷ'
        });
        if (result.isConfirmed) {
            await SwalWithBootstrapButtons.fire('Đã lưu!', 'Thông tin công việc đã được cập nhật', 'success');
            dispatch(meetingActions.updateMeetingDetail(input, id)).then((result) => {
                if (result) {
                    dispatch(meetingActions.getMeetingById(id))
                    setDisabled(true)
                }
            })
        }








    }





    return (
        <>
            {!loading ? (

                <div className="row">
                    <div className='col-7 edit-form  ' style={{ borderRight: '1px solid gray' }}>
                        <div style={{ display: "flex", }}>
                            <div>
                                <h4>Thông tin tác vụ</h4>
                                {meetingDetail?.isCanceled ? 'Đã hoãn' : null}
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                {!meetingDetail?.isCanceled ? (
                                    <Button variant='danger' onClick={handleCanel} >
                                        Hoãn cuộc họp
                                    </Button>
                                ) : (<Button variant='success' onClick={handleCanel} >
                                    Huỷ hoãn
                                </Button>)}
                            </div>
                        </div>



                        <Form className="mt-4 " onSubmit={onSubmit}

                        >
                            <Form.Group id="title" className="mb-4" >
                                <Form.Label>Tên tác vụ</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>

                                    </InputGroup.Text>
                                    <Form.Control autoFocus required type="text" name='title' onChange={onChange} value={input.title} />
                                </InputGroup>
                            </Form.Group>



                            <Form.Group className="mb-3">
                                <Form.Label>Phòng họp</Form.Label>
                                <InputGroup>
                                    <Form.Control autoFocus required type="text" name='venue' onChange={onChange} value={input.venue} />


                                </InputGroup>
                            </Form.Group>



                            <Form.Group>
                                <Form.Group id="beginDate" className="mb-4">
                                    <Form.Label>Ngày</Form.Label>
                                    <InputGroup>
                                        <Form.Control type="date" value={date} onChange={changeDate} />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Group>

                            <Form.Group id="start" className="mb-4">
                                <Form.Label>Bắt đầu </Form.Label>
                                <InputGroup>
                                    <Form.Control type="time" name='start' onChange={onChange} value={moment(input.start).format('HH:mm:ss')} required />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group id="endDate" className="mb-4">
                                <Form.Label>Kết thúc </Form.Label>
                                <InputGroup>
                                    <Form.Control type="time" name='end' onChange={onChange} value={moment(input.end).format('HH:mm:ss')} required />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group id="userAssign" className="mb-4" hidden>
                                <Form.Label>User</Form.Label>
                                <InputGroup>
                                    <Form.Control type="text" name='userAssign' value="" />
                                </InputGroup>
                            </Form.Group>

                            <div style={{ display: "flex" }}>
                                <Button disabled={disabled} variant="info" type="submit" >
                                    Lưu thông tin
                                </Button>
                                <Button variant="dark" style={{ marginLeft: "auto" }} onClick={() => { history.goBack() }} >
                                    Quay lại
                                </Button>
                            </div>
                        </Form>

                    </div>
                    <div className='col' style={{ marginTop: 20 }}>


                        <Form.Group id="staffs" className="mb-4">
                            <Form.Label>Nhân viên được mời ({attendees.length}) :</Form.Label>
                            <StaffList staffs={attendees} />
                        </Form.Group>

                        <Form.Group id="staffs" className="mb-4">
                            <Form.Label>Nhân viên tham gia ({acceptList.length}) :</Form.Label>
                            <StaffList staffs={acceptList} />
                        </Form.Group>

                        <Form.Group id="staffs" className="mb-4">
                            <Form.Label>Nhân viên không tham gia ({refuseList.length}) :</Form.Label>
                            <StaffList staffs={refuseList} />
                        </Form.Group>




                    </div>



                </div>

            ) : 'Hi...'
            }
        </>
    )
}