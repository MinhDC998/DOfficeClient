import React, { useState, useEffect } from 'react';

import { Routes } from '../../../routes';
import { Button, Dropdown, ButtonGroup, Text } from '@themesberg/react-bootstrap';
import { withRouter } from 'react-router';
import { faFile, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import workServices from '../../../services/work.services';
import userServices from '../../../services/user.services';
import moment from "moment";
import { useDispatch } from 'react-redux';
import workActions from '../../../actions/workActions';

import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";


const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success me-3',
        cancelButton: 'btn btn-gray'
    },
    buttonsStyling: false
}));

function Optional(props) {


    const dispatch = useDispatch();


    const [showDelete, setShowDelete] = useState(false)
    const [work, setWork] = useState(props.data)


    const [createName, setCreateName] = React.useState();
    const [editName, setEditName] = React.useState();

    const getCreateName = async (userId) => {
        const data = await userServices.getUserNameById(userId)
        setCreateName(data);
    }
    const getEditName = async (userId) => {
        const data = await userServices.getUserNameById(userId)
        setEditName(data);
    }
    useEffect(() => {


        getCreateName(props.data.createdBy)
        getEditName(props.data.lastEditedBy)




    }, [])





    const handleDelete = async (workId) => {
        workId = props.data.id
        const result = await SwalWithBootstrapButtons.fire({
            icon: 'warning',
            title: 'Xác nhận ',
            text: 'Bạn có chắc muốn xoá?',
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: 'Huỷ'
        });


        if (result.isConfirmed) {
            await SwalWithBootstrapButtons.fire('Đã lưu!', 'xoá công việc thành công', 'success');
            dispatch(workActions.deleteWork(workId)).then(result => {
                if (result) {
                    const userId = props.match.params.userId
                    if (userId) {
                        dispatch(workActions.getWorkByUserId(userId))
                    }
                    else
                        dispatch(workActions.getAll())


                }
            })


        }


        // console.log(result)
        setShowDelete(false)

    }
    const handleStored = async (workId) => {


        const beginDate = moment(work.beginDate).format('YYYY-MM-DD');
        const endDate = moment(work.endDate).format('YYYY-MM-DD');
        const Edit = moment(work.createAt).format('YYYY-MM-DD');
        const stored = !work.isStored


        var newWork = {
            beginDate: beginDate,
            createdAt: null,
            createdBy: work.createdBy,
            description: work.description,
            endDate: endDate,
            id: work.id,
            isCompleted: false,
            isDeleted: false,
            isStored: stored,
            lastEdited: null,
            lastEditedBy: work.lastEditedBy,
            title: work.title,

        }


        var result
        if (props.data.isStored) {
            result = await SwalWithBootstrapButtons.fire({
                icon: 'warning',
                title: 'Xác nhận ',
                text: 'Bạn có chắc muốn xoá công việc khỏi danh sách lưu trữ?',
                showCancelButton: true,
                confirmButtonText: "Xác nhận",
                cancelButtonText: 'Huỷ'
            });
        }
        else {
            result = await SwalWithBootstrapButtons.fire({
                icon: 'info',
                title: 'Xác nhận ',
                text: 'Bạn có chắc muốn lưu trữ công việc?',
                showCancelButton: true,
                confirmButtonText: "Xác nhận",
                cancelButtonText: 'Huỷ'
            });
        }




        if (result.isConfirmed) {
            await SwalWithBootstrapButtons.fire('Đã lưu!', 'Công việc đã được lưu', 'success');
            dispatch(workActions.updateWorkDetail(newWork, newWork.id)).then((result) => {
                if (result) {
                    const userId = props.match?.params.userId

                    if (userId) {
                        dispatch(workActions.getWorkByUserId(userId))
                    }
                    if (props.data.isStored)
                        dispatch(workActions.getAllStoredWorks())

                    else
                        dispatch(workActions.getAll())

                }

            })
        }





    }





    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm" style={{ borderRadius: 5, padding: 4 }}>
                    ...
                </Dropdown.Toggle>

                <Dropdown.Menu id='dropdown-basic'>
                    {/* Mở để sửa */}
                    <Dropdown.Item href={'/work/detail/' + props.data.id}>
                        <FontAwesomeIcon icon={faFile} style={{ marginRight: 5 }} />
                        Mở trong trang</Dropdown.Item>

                    {/* Nút xoá */}
                    <Dropdown.Item className='text-danger' onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: 5 }} />
                        Xoá công việc
                    </Dropdown.Item>

                    <Dropdown.Item onClick={handleStored} >

                        {props.data.isStored ? (
                            <>
                                <FontAwesomeIcon icon={faTimes} style={{ marginRight: 5 }} />
                                Xoá khỏi danh sách lưu trữ
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                Lưu trữ công việc
                            </>

                        )}
                    </Dropdown.Item>

                    <Dropdown.Divider />
                    <div style={{ paddingLeft: 20, paddingRight: 20, fontSize: 12, color: 'gray' }}>
                        <div className='fw-bold' style={{ color: 'black' }} >Chỉnh sửa lần cuối bởi:</div>

                        {editName ? (editName.data) : props.data.lastEditedBy}

                        <br></br>
                        {moment(props.data.lastEdited).format('MM-DD-YYYY HH:mm:ss')}
                        <br></br>
                        <div className='fw-bold' style={{ color: 'black' }}>Tạo bởi :</div>

                        {createName ? (createName.data) : props.data.createdBy}
                        <br></br>
                        {moment(props.data.createdAt).format('MM-DD-YYYY HH:mm:ss')}

                    </div>
                </Dropdown.Menu>
            </Dropdown>


        </>
    );
}

export default withRouter(Optional)