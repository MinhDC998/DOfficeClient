import React, { useEffect, useState } from 'react';

import { Form, Button, InputGroup, Modal } from '@themesberg/react-bootstrap';

import { Multiselect } from 'multiselect-react-dropdown';

import { useDispatch } from 'react-redux';
import workActions from '../../../actions/workActions';
import staffActions from '../../../actions/staffActions';
import { useSelector } from 'react-redux';
import taskActions from '../../../actions/taskActions';



const CreateTaskModal = ({ showModal, setshowModal, workId }) => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(showModal);
    const handleClose = () => setshowModal(false);


    const [assignsList, setAssignsList] = React.useState()

    const [input, setInput] = React.useState({
        workId: '',
        title: '',
        description: '',
        priority: '',
        status: '',
        beginDate: '',
        endDate: '',
        userAssign: [],
    });
    const PRIORITY = ['low', 'medium', 'high']
    const STATUS = ['next up', 'in progress', 'completed']

    const { staffs } = useSelector(state => state.staff)
    const { works, assigns } = useSelector(state => state.work)


    useEffect(() => {

        Promise.all([
            dispatch(workActions.getAll()),
            dispatch(staffActions.getAllStaff())

        ])
        if (workId) {
            dispatch(workActions.getAssignsByWorkId(workId))
        }



    }, [])
    // console.log(data)



    const onSubmit = async (e) => {



        e.preventDefault();
        if (assigns) {
            for (var i = 0; i < assigns.length; i++)
                input.userAssign.push(assigns[i].id)

        }
        if (workId) {
            input.workId = workId
        }
        // console.log("input:" + input)
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

        // console.log(formData)
        dispatch(taskActions.createTaskByform(formData)).then(
            result => {
                if (result) {
                    if (workId) {
                        dispatch(taskActions.getTaskByWorkId(workId))
                    }
                    else
                        dispatch(taskActions.getAll())
                }

            })
        handleClose()

    }

    const onSelect = async (selectedList, selectedItem) => {
        setAssignsList(selectedList)
    }
    const onRemove = async (selectedList, removedItem) => {
        setAssignsList(selectedList)

    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    }

    const onChangeWorkId = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
        dispatch(workActions.getAssignsByWorkId(value))
    }






    return (
        <>


            <Modal
                slide="true"
                show={showModal} onHide={handleClose}
                size="lg"

            >
                <Modal.Header closeButton>
                    <Modal.Title>Tạo tác vụ mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-4" onSubmit={onSubmit} style={{ color: 'black' }}>
                        <Form.Group id="title" className="mb-4">
                            <Form.Label>Tên tác vụ</Form.Label>
                            <InputGroup>
                                <Form.Control autoFocus type="text" placeholder="Tên tác vụ" name='title' onChange={onChange} required />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Thuộc công việc</Form.Label>
                            <Form.Select name='workId' onChange={onChangeWorkId} style={{ color: 'black' }} >
                                <option defaultValue>Chọn công việc</option>
                                {works?.map((v, i) => (<option key={i} value={v.id} selected={(workId === v.id) ? true : null} >{v.title}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Group id="description" className="mb-4">
                                <Form.Label>Mô tả</Form.Label>
                                <InputGroup>

                                    <Form.Control type="text" placeholder="Nội dung tác vụ" name='description' onChange={onChange} required />
                                </InputGroup>
                            </Form.Group>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Độ ưu tiên</Form.Label>
                            <Form.Select name='priority' onChange={onChange} required>
                                <option disabled selected hidden>Chọn độ ưu tiên</option>
                                {PRIORITY.map(c => (<option key={c} value={c}>{c.toUpperCase()}</option>))}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select name='status' onChange={onChange} required>
                                <option disabled selected hidden>Chọn trạng thái</option>
                                {STATUS.map(c => (<option key={c} value={c}>{c.toUpperCase()}</option>))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Group id="beginDate" className="mb-4">
                                <Form.Label>Bắt đầu</Form.Label>
                                <InputGroup>
                                    <Form.Control type="date" name="beginDate" onChange={onChange} required />
                                </InputGroup>
                            </Form.Group>
                        </Form.Group>

                        <Form.Group id="endDate" className="mb-4">
                            <Form.Label>Thời hạn</Form.Label>
                            <InputGroup>
                                <Form.Control type="date" name='endDate' onChange={onChange} required />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group id="userAssign" className="mb-4">
                            <Form.Label>Nhân viên</Form.Label>

                            <InputGroup onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                                <Multiselect
                                    options={assigns.length ? assigns : staffs} // Options to display in the dropdown
                                    selectedValues={assignsList}
                                    displayValue="userName" // Property name to display in the dropdown options
                                    placeholder="Chọn nhân viên"
                                    onSelect={onSelect}
                                    onRemove={onRemove}
                                ></Multiselect>


                            </InputGroup>
                        </Form.Group>
                        <div style={{ display: 'flex', marginTop: 40, }}>

                            <Button variant="info" type="submit" style={{ marginLeft: 'auto' }}>
                                Thêm tác vụ
                            </Button>

                            <Button variant="danger" onClick={handleClose} style={{ marginLeft: 25 }}>
                                Huỷ
                            </Button>
                        </div>

                    </Form>


                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </>
    );

}
export default CreateTaskModal;


