import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Routes } from '../../../routes';
import meetingServices from '../../../services/meeting.services';
import './meeting.scss'
import InviModal from './InviModal'

const MeetingList = (props) => {

    const [show, setShow] = useState(false)

    console.log('meeting', props)
    const [meeting, setMeeting] = React.useState()

    useEffect(() => {
        getMeetingById(props.meetingId)

    }, [])

    const getMeetingById = async (id) => {
        const rs = await meetingServices.getMeetingById(id)
        console.log(rs)
        setMeeting(rs.data)
    }

    const handleShow = (id) => {
       setShow(!show)
    }


    return (
        <>
            <div className='meeting-list' >
                {meeting ? (
                    <div style={{
                        backgroundColor: 'lightskyblue',
                        width: '500px', padding: 4,
                        marginLeft: 10, borderRadius: 5,
                        color: '#fff', cursor: 'pointer'
                    }}
                    onClick={handleShow}
                    >
                        Cuộc họp <span className='fw-bold'> {meeting.title}</span>  Bắt đầu : {moment(meeting.start).format('DD/MM/YYYY HH:mm')}
                    </div>

                ) : null}

                {show ? (
                    <InviModal showModal={show} setshowModal={setShow} meeting={meeting} attend={props} />
                ) : null}
            </div>
        </>
    )

}
export default MeetingList
