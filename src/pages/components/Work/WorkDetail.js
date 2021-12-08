import React, { useEffect, useState } from 'react';
import moment from "moment";
import { Form, Button, ListGroup, InputGroup, ListGroupItem } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import taskServices from "../../../services/task.services";

import { Link, useHistory } from 'react-router-dom';
import { Routes } from '../../../routes';
import workServices from '../../../services/work.services'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Multiselect } from 'multiselect-react-dropdown';
import './work.scss'
import userServices from '../../../services/user.services';

export default (props) => {

    const id = props.match.params.id

    const [work, setWork] = React.useState()
    const [status, setStatus] = React.useState()

    const [staffs, setStaffs] = React.useState()
    const [assigns, setAssigns] = React.useState()

    const [listTask, setListTask] = React.useState()
    const [disabled, setDisabled] = React.useState(true)


    const history = useHistory();



    const [input, setInput] =
        React.useState({
            title: '',
            description: '',
            beginDate: '',
            endDate: '',
            userAssign: ''
        });

    useEffect(() => {
        getWorkById(id)
        getTaskByWorkId(id)
        getAllStaff()
        getAssign(id)

    }, [])
    {/*Hàm lấy thông tin của công việc */ }
    const getWorkById = async (workId) => {
        const data = await workServices.getWorkById(workId);
        setWork(data.data)
        const dTO = {
            title: data.data.title,
            description: data.data.description,
            beginDate: moment(data.data.beginDate).format('YYYY-MM-DD'),
            endDate: moment(data.data.endDate).format('YYYY-MM-DD'),
            userAssign: ''
        }
        setInput(dTO)
        console.log(data.data)

        setStatus(data.data.isCompleted)
    }

    {/*Hàm lấy danh sách tác vụ */ }
    const getTaskByWorkId = async (workId) => {
        const list = await taskServices.getTaskByWorkId(workId);
        setListTask(list.data);
        // console.log(list)

    }

    {/*Hàm lấy danh sách nhân viên */ }
    const getAllStaff = async () => {
        const list = await userServices.getAllStaff()
        setStaffs(list.data);

    }
    {/*Hàm lấy danh sách nhân viên tham gia cv */ }
    const getAssign = async (workId) => {
        const list = await workServices.getAssignByWorkId(workId)
        setAssigns(list.data)

        console.log(list.data)
    }


    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDisabled(false)

        setInput({ ...input, [name]: value });
    }

    const onSelect = async (selectedList, selectedItem) => {
        setAssigns(selectedList)
        await workServices.insertWorkAssign(id,selectedItem.id)
        
    }

    const onRemove = async (selectedList, removedItem) => {

        setAssigns(selectedList)
        // console.log(removedItem)
        await workServices.removeWorkAssign(id,removedItem.id)
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
        await workServices.updateWork(formData, id);
        

        history.push(Routes.WorkManagement.path);


    }

    const handleComplete = async () => {

        workServices.completeWork(id)
        const tmp = work
        
        setStatus(!status)
       
       
        
    }



    return (
        <>
            {work ? (

                <div className="row">
                    <div className='col edit-form ' >
                        <div style={{ display: "flex" }}>
                            <h4>Thông tin công việc</h4>
                            <Button variant="success" style={{ marginLeft: "auto", fontSize: 10 }} onClick={handleComplete}>
                                <FontAwesomeIcon icon={faCheck} style={{ marginRight: 5, fontSize: 10 }} />
                                Đánh dấu hoàn thành
                            </Button>
                        </div>
                        <div>
                            {status?('Đã hoàn thành'):'Đang tiền hành'}
                        </div>

                        <Form className="mt-4" onSubmit={onSubmit}>
                            <Form.Group id="title" className="mb-4">
                                <Form.Label>Tên công việc</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>

                                    </InputGroup.Text>
                                    <Form.Control autoFocus required type="text" name='title' onChange={onChange} value={input.title} />
                                </InputGroup>
                            </Form.Group>

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
                                        <Form.Control required type="date" value={moment(input.beginDate).format('YYYY-MM-DD')} name="beginDate" onChange={onChange} required />
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
                                <Button variant="dark" style={{ marginLeft: "auto" }} onClick={() => { history.push(Routes.WorkManagement.path) }} >
                                    Quay lại
                                </Button>
                            </div>
                        </Form>

                    </div>
                    <div className='col-6' style={{ marginTop: 20 }}>

                        <p>Các nhân viên tham gia :</p>

                        {listTask ? (
                            <div className='list-task'>
                                <ListGroup >
                                    <p className="fw-bold pt-3"> Danh sách tác vụ : </p>


                                    {listTask.length ? (
                                        listTask.map((task) =>
                                            <ListGroupItem key={task.id}  >
                                                + <code> {task.title}</code>
                                            </ListGroupItem>
                                        )
                                    ) : "Chưa có"}

                                </ListGroup>
                            </div>
                        ) : 'loading...'}
                        Thêm tác vụ mới

                    </div>
                </div>
            ) : 'loading...'
            }
        </>
    )
}