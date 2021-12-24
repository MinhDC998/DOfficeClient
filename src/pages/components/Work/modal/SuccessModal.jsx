import React, { useEffect, useState } from 'react';

import { Form, Button, ListGroup, InputGroup, ListGroupItem, Modal } from '@themesberg/react-bootstrap';

import { Multiselect } from 'multiselect-react-dropdown';

import { useDispatch } from 'react-redux';
import workActions from '../../../../actions/workActions';
import staffActions from '../../../../actions/staffActions';
import { useSelector } from 'react-redux';




const SuccessModal = ({ showModal, setshowModal, content }) => {

    const [show, setShow] = useState(showModal);
    const handleClose = () => setshowModal(false);



    useEffect(() => {

    }, [])
    // console.log(data)




    return (
        <>
            <Modal
                slide="true"
                show={showModal} onHide={handleClose}
                style={{ paddingLeff: 30 }}
                aria-labelledby="contained-modal-title-vcenter">

                <Modal.Header closeButton>
                    <Modal.Title >Chỉnh sửa thành công</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Đã lưu chỉnh sửa


                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Xác nhận</Button>

                </Modal.Footer>
            </Modal>

        </>
    );

}
export default SuccessModal;


