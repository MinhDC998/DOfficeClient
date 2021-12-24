import React, { useEffect } from 'react';
import moment from "moment";
import { Form, Button, InputGroup, } from '@themesberg/react-bootstrap';


import { useHistory } from 'react-router-dom';
import { Routes } from '../../../routes';

// Icon
import { faCheck, faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Multiselect } from 'multiselect-react-dropdown';


// import workServices from '../../../services/work.services'
import { useDispatch } from 'react-redux';
import workActions from '../../../actions/workActions';
import taskActions from '../../../actions/taskActions'
import staffActions from '../../../actions/staffActions'
import taskServices from '../../../services/task.services';
import { useSelector } from 'react-redux';



import CreateTaskModal from './CreateTaskModal';
import SuccessModal from '../Work/modal/SuccessModal'
import Comments from '../Comment/Comments';
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
    const { user } = useSelector(state => state.authentication)

    const dispatch = useDispatch();

    const [successShow, setSuccessShow] = React.useState()
    const [disabled, setDisabled] = React.useState(true)
    const [showCreateTaskModal, setShowCreateTaskModal] = React.useState()
    const PRIORITY = ['low', 'medium', 'high']
    const STATUS = ['next up', 'in progress', 'completed']


    const handleCreateTaskShow = () => {
        setShowCreateTaskModal(true);
    }

    const history = useHistory();

    const [input, setInput] =
        React.useState({
            workId: '',
            title: '',
            description: '',
            priority: '',
            status: '',
            beginDate: '',
            endDate: '',
            userAssign: '',
        });

    const { workDetail, assigns } = useSelector(state => state.work)
    const { taskDetail, taskAssigns } = useSelector(state => state.task)
    const { staffs, loading } = useSelector(state => state.staff)
    const [reload, setReLoad] = React.useState(false)

    useEffect(() => {

        dispatch(taskActions.getTaskById(id)).then(
            rs => {
                if (rs) {

                    const taskDTO = {
                        workId: rs.workId,
                        title: rs.title,
                        description: rs.description,
                        priority: rs.priority,
                        status: rs.status,
                        beginDate: moment(rs.beginDate).format('YYYY-MM-DD'),
                        endDate: moment(rs.endDate).format('YYYY-MM-DD'),
                        userAssign: '',
                    }
                    setInput(taskDTO)
                    dispatch(workActions.getWorkById(rs.workId)).then(rs => {
                        if (rs)
                            dispatch(workActions.getAssignsByWorkId(rs.id))
                    })
                    dispatch(taskActions.getAssignByTaskId(rs.id))
                    // dispatch(staffActions.getAllStaff())
                }
            }
        )
        componentDidMount()

    }, [reload])
    const componentDidMount = () => {
        document.title = "Thông tin Tác vụ";
    }


    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDisabled(false)
        setInput({ ...input, [name]: value });
    }

    const onSelect = (selectedList, selectedItem) => {
        dispatch(taskActions.insertTaskAssign(id, selectedItem.id))

    }

    const onRemove = (selectedList, removedItem) => {

        dispatch(taskActions.removeTaskAssign(id, removedItem.id))
    }



    const onSubmit = async (e) => {
        console.log(input)
        e.preventDefault();
        const formData = new FormData();
        Object.keys(input).forEach((key) => {
            console.log(input[key]);
            formData.append(key, input[key]);

        });


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
            taskServices.updateTask(id, formData)
            setDisabled(true)
        }

    }




    console.log(taskAssigns)
    return (
        <>
            {taskDetail ? (

                <div className="row">
                    <div className='col-7 edit-form  ' style={{ borderRight: '1px solid gray' }}>
                        <div style={{ display: "flex", }}>
                            <h4>Thông tin tác vụ</h4>


                        </div>
                        <div>

                        </div>

                        <Form className="mt-4 " onSubmit={onSubmit}
                            style={{
                                padding: '5px 5px  20px  10px ',
                                borderRadius: 5,
                                color: 'black', height: 400,
                                overflowY: 'auto', borderTop: '1px solid lightgray',
                                boxShadow: '0px 0px 5px 0px gray',
                                backgroundColor: '#fff'

                            }}
                        >
                            <Form.Group id="title" className="mb-4" >
                                <Form.Label>Tên tác vụ</Form.Label>
                                <InputGroup>
                                    <Form.Control autoFocus required type="text" name='title' onChange={onChange} value={input.title} />
                                </InputGroup>
                            </Form.Group>



                            <Form.Group className="mb-3">
                                <Form.Label>Thuộc công việc</Form.Label>
                                <InputGroup>
                                    <Form.Control type="text" value={input.workId} name='workId' onChange={onChange} hidden />
                                    {workDetail ? (
                                        <div style={{ backgroundColor: '#fff', width: '100%', padding: '10px 5px 10px 10px', border: '.5px solid lightgray', borderRadius: 5 }} >
                                            {workDetail.title}
                                        </ div >

                                    ) : null}
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <Form.Group id="description" className="mb-4">
                                    <Form.Label>Mô tả</Form.Label>
                                    <InputGroup>
                                        <textarea type="text" placeholder="Nội dung tác vụ" name='description' value={input.description} onChange={onChange} required />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Độ ưu tiên</Form.Label>
                                <Form.Select name='priority' onChange={onChange} required>
                                    <option disabled selected hidden>Chọn độ ưu tiên</option>
                                    {PRIORITY.map(c => (<option key={c} value={c} selected={(input.priority === c ? true : null)} >{c.toUpperCase()}</option>))}
                                </Form.Select>
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Trạng thái</Form.Label>
                                <Form.Select name='status' onChange={onChange} required>
                                    <option disabled selected hidden>Chọn trạng thái</option>
                                    {STATUS.map(c => (<option key={c} value={c} selected={(input.status === c ? true : null)} >{c.toUpperCase()}</option>))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Group id="beginDate" className="mb-4">
                                    <Form.Label>Ngày bắt đầu </Form.Label>
                                    <InputGroup>
                                        <Form.Control type="date" value={moment(input.beginDate).format('YYYY-MM-DD')} name="beginDate" onChange={onChange} required />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Group>

                            <Form.Group id="endDate" className="mb-4">
                                <Form.Label>Thời hạn </Form.Label>
                                <InputGroup>
                                    <Form.Control type="date" name='endDate' onChange={onChange} value={moment(input.endDate).format('YYYY-MM-DD')} required />
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
                            <Form.Label>Nhân viên tham gia</Form.Label>
                            <div>
                                <Multiselect
                                    options={assigns} // Options to display in the dropdown
                                    selectedValues={taskAssigns}
                                    displayValue="userName" // Property name to display in the dropdown options
                                    placeholder="Chọn nhân viên"
                                    onSelect={onSelect}
                                    onRemove={onRemove}

                                />


                            </div>
                        </Form.Group>


                        {
                            showCreateTaskModal ? (
                                <CreateTaskModal showModal={showCreateTaskModal}
                                    setshowModal={setShowCreateTaskModal}
                                    workId={id}
                                />
                            ) : null
                        }

                    </div>


                    <SuccessModal showModal={successShow} setshowModal={setSuccessShow} content={"Linnh"} />

                    <div style={{ backgroundColor: '#fff', marginTop: 20 }}>
                        <Comments type='task' currentUserId={user.id} entityId={id} />
                    </div>
                </div>

            ) : 'Hi...'
            }
        </>
    )
}