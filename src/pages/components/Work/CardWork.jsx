import React, { useState, useEffect } from 'react';
import { Routes } from '../../../routes';
import workServices from '../../../services/work.services';
import ModalInfo from './modal/ModalInfo';
import Optional from './Optional';
import './work.scss'

const CardWork = props => {


    const [showModal, setshowModal] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [styleOptional, setStyleOptional] = useState({ display: 'none', marginLeft: 'auto', });

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

        
    }



    const handleShow = () => {
        setshowModal(true);

    }






    return (

        <>
            {assigns ? (<>
                <div className='card-work'
                    onMouseEnter={e => {
                        setStyleOptional({ marginLeft: 'auto' });
                    }}
                    onMouseLeave={e => {
                        setStyleOptional({ display: 'none' })
                    }} >

                    <div className='card-work-header'
                        style={{ fontWeight: 'bold', display: 'flex', paddingTop: 5, height: 30 }}>
                        <div className='card-work-title'
                            onClick={handleShow}
                            style={{ paddingRight: 20 }}
                        >
                            {props.title}

                        </div>

                        <div style={styleOptional}>
                            <Optional data={props} />
                        </div>

                    </div>

                    <div className='card-work-body' onClick={handleShow}>
                        <div >
                            {assignsList ? (
                                <div style={{
                                    maxWidth: 180,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }} >
                                    {assignsList}
                                </div>) : null}

                        </div>
                        <div style={{ fontSize: 'small' }}>
                            {props.endDate}
                        </div>

                        <div style={{ fontSize: 'small' }}>
                            {props.description}
                        </div>

                    </div>


                </div>
            </>) : null}

            {
                showModal ? (
                    <ModalInfo showModal={showModal} setshowModal={setshowModal} data={props} assigns={assignsList} />
                ) : null
            }


        </>


    )
}

export default CardWork