import React, { useState, useEffect } from 'react';

import { Routes } from '../../../routes';
import { Button, Dropdown, ButtonGroup, Text } from '@themesberg/react-bootstrap';
import { Modal } from "@themesberg/react-bootstrap";
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import workServices from '../../../services/work.services';
import userServices from '../../../services/user.services';
import moment from "moment";


function Optional(props) {


    const [showDelete, setShowDelete] = useState(false)


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
        props.deleteWork(workId)
        const result = await workServices.deleteWork(workId)
        console.log(result)
        setShowDelete(false)

    }





    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    ...
                </Dropdown.Toggle>

                <Dropdown.Menu id='dropdown-basic'>
                    {/* Mở để sửa */}
                    <Dropdown.Item href={'work/detail/' + props.data.id}>
                        <FontAwesomeIcon icon={faFile} style={{ marginRight: 5 }} />
                        Mở trong trang</Dropdown.Item>

                    {/* Nút xoá */}
                    <Dropdown.Item className='text-danger' onClick={() => setShowDelete(!showDelete)}>
                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: 5 }} />
                        Xoá công việc
                    </Dropdown.Item>

                    <Dropdown.Item >Something else</Dropdown.Item>

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

            {/* modal delete */}
            <Modal as={Modal.Dialog} centered show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header>
                    <Modal.Title className="h6">Xóa tài liệu</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={() => setShowDelete(false)} />
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa tài liệu này?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={(id) => handleDelete(id)}>
                        Xóa
                    </Button>
                    <Button
                        variant="link"
                        className="text-gray ms-auto"
                        onClick={() => setShowDelete(false)}
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Optional