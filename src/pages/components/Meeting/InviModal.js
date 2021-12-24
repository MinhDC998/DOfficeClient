import React, { useEffect, useState } from 'react';

import { Form, Button, InputGroup, Modal, Row, Col } from '@themesberg/react-bootstrap';

import moment from 'moment';






const InviModal = ({ showModal, setshowModal, meeting, attend }) => {
    console.log(attend)

    const [show, setShow] = useState(showModal);
    const handleClose = () => setshowModal(false);
    const textInput = React.createRef();


    const [date, setDate] = React.useState(moment(meeting.start).format('YYYY-MM-DD'))



    useEffect(() => {



    }, [])


    return (
        <>
            <Modal
                slide="true"
                show={showModal} onHide={handleClose}
                style={{ paddingLeff: 30 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: 'large', marginTop: 10 }}>Cuộc họp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-4" >


                        <Form.Group id="title"  >
                            <Form.Label>Tên tác vụ</Form.Label>
                            <InputGroup>
                                <Form.Control autoFocus required type="text" name='title' value={meeting.title} />
                            </InputGroup>
                        </Form.Group>



                        <Form.Group >
                            <Form.Label>Phòng họp</Form.Label>
                            <InputGroup>
                                <Form.Control autoFocus required type="text" name='venue' value={meeting.venue} />
                            </InputGroup>
                        </Form.Group>



                        <Form.Group id="beginDate">
                            <Form.Label>Ngày</Form.Label>
                            <InputGroup>
                                <Form.Control type="date" value={date} readOnly />
                            </InputGroup>
                        </Form.Group>



                        <Row>
                            <Col xs={12} lg={6}>
                                <Form.Group id="start">
                                    <Form.Label>Bắt đầu </Form.Label>
                                    <InputGroup>
                                        <Form.Control type="time" name='start' defaultValue={moment(meeting.start).format('HH:mm:ss')} readOnly />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group id="end" className="mb-2">
                                    <Form.Label>Kết thúc</Form.Label>
                                    <InputGroup>
                                        <Form.Control type="time" name='end' defaultValue={moment(meeting.end).format('HH:mm:ss')} readOnly />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div style={{ display: 'flex', marginTop: 40, }}>

                            <Button variant="info" style={{ marginLeft: 'auto' }}>
                                {(!attend.isConfirm) || (!attend.isAttend) ? 'Tham gia' : 'Không thể tham gia'}
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
export default InviModal;


