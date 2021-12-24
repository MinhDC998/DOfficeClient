import React, { useEffect, useState } from 'react';
import { Card, Button, Table, ListGroup, ListGroupItem, Modal } from '@themesberg/react-bootstrap';
import ModalInfo from "./modal/ModalInfo";

import workServices from '../../../services/work.services';
import Optional from './Optional';
import moment from "moment";
import './work.scss'


const TableRow = props => {



    const [showModal, setshowModal] = useState(false)
    const [show, setShow] = useState(false);

    const [assigns, setAssigns] = React.useState()

    const [assignsList, setAssignsList] = React.useState()
    useEffect(() => {

        getAssign(props.id)

    }, [])




    const getAssign = async (workId) => {
        const list = await workServices.getAssignByWorkId(workId)
        setAssigns(list.data)
        let str = ''
        list.data.map(c => {
            str = str + c.userName + ', '
        })
        if (str) {
            str = str.slice(0, str.length - 2);
            setAssignsList(str)
        }
        else
            setAssignsList('Chưa có nhân viên, nhấn để thêm')

        console.log(list.data)
    }



    const handleShow = () => {
        setshowModal(true);


    }


    return (
        <>
            {assigns ? (<tr style={{ cursor: 'pointer' }} >
                <td className="fw-bold border-0" onClick={handleShow}>
                    <code>{props.title}</code>
                </td>
                <td >
                    {props.isCompleted ? (
                        <span style={{ backgroundColor: '#65eb7e', borderRadius: 5 }} > Completed</span>
                    ) : <span style={{ backgroundColor: '#f56c6c', borderRadius: 5 }} > In Propgress</span>}
                </td>
                <td className="border-0">
                    {moment(props.endDate).format('YYYY-MM-DD')}
                </td>
                {assignsList ? (
                    <td className='assigns' >
                        <div >
                            {assignsList}
                        </div>
                    </td>
                ) : (<td>
                    Chưa có
                </td>)}
                <td className="border-0">
                    {props.description}
                </td>
                <td className="border-0" >

                    <Optional data={props} />
                </td>
            </tr>) : null}

            {
                showModal ? (
                    <ModalInfo showModal={showModal} setshowModal={setshowModal} data={props} assigns={assignsList} />
                ) : null
            }


        </>
    );
};

export default TableRow;