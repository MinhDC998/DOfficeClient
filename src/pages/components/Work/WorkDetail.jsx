import React, { useEffect } from 'react';
import moment from "moment";
import { Form, Button, InputGroup, } from '@themesberg/react-bootstrap';


import { useHistory } from 'react-router-dom';


// Icon
import { faCheck, faPlus, faPlay, faStoreSlash, faTimes, faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Multiselect } from 'multiselect-react-dropdown';
import './work.scss'

// import workServices from '../../../services/work.services'
import { useDispatch } from 'react-redux';
import workActions from '../../../actions/workActions';
import taskActions from '../../../actions/taskActions'
import staffActions from '../../../actions/staffActions'
import { useSelector } from 'react-redux';
import ListTask from './ListTask';

import CreateTaskModal from '../Task/CreateTaskModal';

import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import commentServices from "../../../services/comment.services"
import Comments from '../Comment/Comments';


const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success me-3',
        cancelButton: 'btn btn-gray'
    },
    buttonsStyling: false
}));



export default (props) => {
    const { user } = useSelector(state => state.authentication)
    const id = props.match.params.id
    const dispatch = useDispatch();


    const [disabled, setDisabled] = React.useState(true)
    const [showCreateTaskModal, setShowCreateTaskModal] = React.useState()


    const handleCreateTaskShow = () => {
        setShowCreateTaskModal(true);
    }

    const history = useHistory();

    const [input, setInput] =
        React.useState({
            title: '',
            description: '',
            beginDate: '',
            endDate: '',
            userAssign: ''
        });

    const { workDetail, assigns } = useSelector(state => state.work)
    const { tasks, } = useSelector(state => state.task)
    const { staffs, loading } = useSelector(state => state.staff)

    useEffect(() => {

        Promise.all(
            [dispatch(workActions.getWorkById(id)),
            dispatch(workActions.getAssignsByWorkId(id)),
            dispatch(taskActions.getTaskByWorkId(id)),
            dispatch(staffActions.getAllStaff())
            ]
        ).then(async result => {
            const work = result[0] ?? {};
            const workDTO = {
                title: work.title,
                description: work.description,
                beginDate: moment(work.beginDate).format('YYYY-MM-DD'),
                endDate: moment(work.endDate).format('YYYY-MM-DD'),
                userAssign: ''
            }
            setInput(workDTO)

        })
        componentDidMount()
      

    }, [])
    const componentDidMount = () => {
        document.title = "Thông tin công việc";
    }

    

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDisabled(false)
        setInput({ ...input, [name]: value });
    }

    const onSelect = (selectedList, selectedItem) => {
        dispatch(workActions.insertWorkAssign(id, selectedItem.id))
    }
    
    const onRemove = (selectedList, removedItem) => {
        dispatch(workActions.removeWorkAssign(id, removedItem.id))
    }



    const onSubmit = async (e) => {
        console.log(input)
        e.preventDefault();
        const formData = new FormData();
        Object.keys(input).forEach((key) => {
            console.log(input[key]);
            if (key === 'userAssign') {
                for (let i = 0; i < input[key].length; i++) {
                    formData.append(`${key}[${i}]`, input[key][i]);
                }
            } else {
                formData.append(key, input[key]);
            }
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
            dispatch(workActions.updateWorkByForm(formData, id)).then((result) => {
                if (result) {
                    dispatch(workActions.getWorkById(id))
                    // setSuccessShow(true)
                    setDisabled(true)
                }

            })
        }



        // history.push(Routes.WorkManagement.path);


    }

    const handleComplete = async () => {

        const val = !workDetail.isCompleted;
        const beginDate = moment(workDetail.beginDate).format('YYYY-MM-DD');
        const endDate = moment(workDetail.endDate).format('YYYY-MM-DD');
        const Edit = moment(workDetail.createAt).format('YYYY-MM-DD');


        var newWork = workDetail
        newWork.isCompleted = val
        newWork.createdAt = null;
        newWork.beginDate = beginDate
        newWork.endDate = endDate
        newWork.lastEdited = null

        console.log(newWork)
        dispatch(workActions.updateWorkDetail(newWork, id)).then(
            rs => {
                if (rs) {
                    dispatch(workActions.getWorkById(id))
                }

            }

        )



    }
    const handleStored = async (e) => {
        e.preventDefault()
        const val = !workDetail.isStored;
        const beginDate = moment(workDetail.beginDate).format('YYYY-MM-DD');
        const endDate = moment(workDetail.endDate).format('YYYY-MM-DD');
        const Edit = moment(workDetail.createAt).format('YYYY-MM-DD');


        var newWork = workDetail
        newWork.isStored = val
        newWork.createdAt = null;
        newWork.beginDate = beginDate
        newWork.endDate = endDate
        newWork.lastEdited = null

        console.log(newWork)
        dispatch(workActions.updateWorkDetail(newWork, id)).then(
            rs => {
                if (rs) {
                    dispatch(workActions.getWorkById(id))
                }

            }

        )



    }



    return (
        <>
            {workDetail ? (

                <div className="row">
                    <div className='col edit-form ' style={{ borderRight: '1px solid gray' }}>
                        <div style={{ display: "flex" }}>
                            <h4>Thông tin công việc</h4>
                        </div>

                        <div>
                            {workDetail.isCompleted ? (
                                <Button variant="outline-info" style={{ marginLeft: "auto", fontSize: 10 }} onClick={handleComplete}>
                                    <FontAwesomeIcon icon={faPlay} style={{ marginRight: 5, fontSize: 10 }} />
                                    Tiến hành công việc
                                </Button>
                            ) :
                                (<Button variant="outline-success" style={{ marginLeft: "auto", fontSize: 10 }} onClick={handleComplete}>
                                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: 5, fontSize: 10 }} />
                                    Đánh dấu hoàn thành
                                </Button>)}

                            {workDetail.isStored ? (
                                <Button variant="outline-danger" style={{ marginLeft: "auto", fontSize: 10 }} onClick={handleStored}>
                                    <FontAwesomeIcon icon={faBan} style={{ marginRight: 5, fontSize: 10 }} />
                                    Xoá khỏi danh sách lưu trữ
                                </Button>
                            ) :
                                (<Button variant="outline-warning" style={{ marginLeft: "auto", fontSize: 10 }} onClick={handleStored}>
                                    <FontAwesomeIcon icon={faSave} style={{ marginRight: 5, fontSize: 10 }} />
                                    Lưu trữ công việc
                                </Button>)}

                        </div>

                        <div>
                            {workDetail.isCompleted ? ('Đã hoàn thành') : 'Đang tiền hành'}
                        </div>

                        <Form className="mt-4" onSubmit={onSubmit} style={{ color: 'black', }} >
                            <Form.Group id="title" className="mb-4">
                                <Form.Label>Tên công việc</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>

                                    </InputGroup.Text>
                                    <Form.Control autoFocus required type="text" name='title' onChange={onChange} value={input.title} />
                                </InputGroup>
                            </Form.Group>


                            <Form.Group>
                                <Form.Group id="description" className="mb-4">
                                    <Form.Label>Nội dung tóm tắt</Form.Label>
                                    <InputGroup>



                                        <textarea required type="text" name='description' onChange={onChange} value={input.description} />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Group>

                            <Form.Group>
                                <Form.Group id="beginDate" className="mb-4">
                                    <Form.Label>Ngày bắt đầu công việc</Form.Label>
                                    <InputGroup>
                                        <Form.Control type="date" value={moment(input.beginDate).format('YYYY-MM-DD')} name="beginDate" onChange={onChange} required />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Group>

                            <Form.Group id="endDate" className="mb-4">
                                <Form.Label>Thời hạn (Dự tính) </Form.Label>
                                <InputGroup>
                                    <Form.Control type="date" name='endDate' onChange={onChange} value={moment(input.endDate).format('YYYY-MM-DD')} required />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group id="userAssign" className="mb-4" hidden>
                                <Form.Label>User</Form.Label>
                                <InputGroup>
                                    <Form.Control type="text" name='userAssign' value="6174d5109bf03f565fe5303d" />
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
                    <div className='col-6' style={{ marginTop: 20 }}>


                        <Form.Group id="staffs" className="mb-4">
                            <Form.Label>Nhân viên tham gia</Form.Label>
                            <div>
                                <Multiselect
                                    options={staffs} // Options to display in the dropdown
                                    selectedValues={assigns}
                                    displayValue="userName" // Property name to display in the dropdown options
                                    placeholder="Chọn nhân viên"
                                    onSelect={onSelect}
                                    onRemove={onRemove}

                                />


                            </div>
                        </Form.Group>

                        {tasks ? (
                            <div className='list-task' style={{ paddingBottom: 20 }}>

                                <p className="fw-bold pt-3" style={{ color: 'black' }}> Danh sách tác vụ : </p>


                                {tasks.length ? (
                                    tasks.map((task) =>
                                        <ListTask key={task.id} {...task} />

                                    )
                                ) : "Chưa có"}


                            </div>
                        ) : 'loading...'}
                        <Button size='small'
                            variant='outline-dark'
                            // style={{  borderRadius: 0, padding: '1px 10px 1px 10px' }}
                            onClick={handleCreateTaskShow}>
                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5, fontSize: 10, marginBottom: 2 }} />
                            Thêm tác vụ mới
                        </Button>
                        {
                            showCreateTaskModal ? (
                                <CreateTaskModal showModal={showCreateTaskModal}
                                    setshowModal={setShowCreateTaskModal}
                                    workId={id}
                                />
                            ) : null
                        }

                    </div>
                        <div style={{backgroundColor:'#fff', marginTop:20}}>
                        <Comments type = 'work' currentUserId={user.id} entityId={id} />
                        </div>


                </div>

            ) : 'loading...'
            }
        </>
    )
}