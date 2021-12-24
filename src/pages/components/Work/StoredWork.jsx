import React, { useEffect, useState } from 'react';
import { Card, Button,  ListGroup,  DropdownButton, Dropdown } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import CreateWorkModal from './modal/CreateWorkModal'
import { Routes } from '../../../routes';


import {  faBoxOpen, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StatusShow from './StatusShow';
import { useDispatch } from 'react-redux';
import workActions from '../../../actions/workActions';
import { useSelector } from 'react-redux';
import TableWork from './TableWork';





export default (props) => {


    const dispatch = useDispatch();

    const [createForm, setCreateForm] = useState(false)
    const [tableShow, setTableShow] = React.useState(false)
    const [statusShow, setStatusShow] = React.useState(true)

    const { userLoaded, user } = useSelector(state => state.authentication);

    const handleTableShow = () => {
        setTableShow(true)
        setStatusShow(false)

    }

    const handleCreateShow = () => {
        setCreateForm(true)


    }

    const handleStatusShow = () => {
        setTableShow(false)
        setStatusShow(true)

    }

    const { works, loading } = useSelector(state => state.work);
    useEffect(() => {

        dispatch(workActions.getAllStoredWorks())
        componentDidMount()

    }, [])

    const componentDidMount = () => {
        document.title = "Công việc được lưu trữ";
    }


    return (
        <>



            <div className="" style={{ maxWidth: "40%" }}>

                <ListGroup horizontal>
                    <ListGroup.Item style={{ width: 'auto' }} action href={Routes.WorkManagement.path} className='active'>
                        Công việc
                    </ListGroup.Item>
                    <ListGroup.Item style={{ width: 'auto' }} action href={Routes.TaskManagement.path} >
                        Tác vụ
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>

                <div className="d-block mb-4 mb-xl-0">
                    <h4>
                        <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: 10 }} />
                        Danh sách công việc được lưu trữ</h4>
                    {/* <p className="mb-0">
                    Dozens of reusable components built to provide buttons, alerts, popovers, and more.
                </p> */}

                    <Button variant="secondary" className="m-1 mb-4" onClick={handleCreateShow}>
                        Thêm công việc
                    </Button>
                </div>
            </div>


            {!loading ? (
                <>
                    <DropdownButton variant='light' id="dropdown-basic-button" title="Xem theo:" style={{ paddingBottom: '10px' }}>
                        <Dropdown.Item onClick={handleTableShow} className={tableShow ? 'active' : null}><Link>Dạng bảng</Link ></Dropdown.Item>
                        <Dropdown.Item onClick={handleStatusShow} className={statusShow ? 'active' : null} ><Link>Trạng thái</Link ></Dropdown.Item>
                        <Dropdown.Item  ><Link to={Routes.WorkManagement.path}>Tất cả công việc </Link> </Dropdown.Item>
                        <Dropdown.Item ><Link to={'/work/user/' + user.id}>Công việc của tôi</Link></Dropdown.Item>
                    </DropdownButton>





                    <Card border="light" className="shadow-sm">

                        <Card.Body className="p-0">

                            {statusShow ? (<StatusShow works={works} />
                            ) : null}

                            {tableShow ? (
                                <TableWork works={works} />
                            ) : null}

                        </Card.Body>
                    </Card>
                </>
            ) : 'loading...'
            }
            {
                createForm ? (
                    <CreateWorkModal showModal={createForm} setshowModal={setCreateForm} />

                ) : null
            }

        </>
    )
}