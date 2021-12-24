import React, { useEffect } from 'react';
import { Card, Button, Table, ListGroup, ListGroupItem } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import moment from "moment";


import meetingActions from '../../../actions/meetingActions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import MeetingList from './MeetingList';


export default () => {

    const dispatch = useDispatch()
    const { attendances, loading } = useSelector(state => state.meeting)
    const { user } = useSelector(state => state.authentication)
    const [invitations, setInvitations] = React.useState([])
    const [acceptList, setAcceptList] = React.useState([])
    const [refuseList, setRefuseList] = React.useState([])

    useEffect(() => {

        dispatch(meetingActions.getAssignByUserId(user.id)).then(rs => {
            if (rs) {
                var invi = []
                var acp = []
                var rfs = []
                for (var i = 0; i < rs.length; i++) {

                    if (!rs[i].isComfirm) {
                        console.log('loi moi')
                        invi.push(rs[i])
                    }
                    if (rs[i].isComfirm && rs[i].isAttend) {
                        acp.push(rs[i])
                    }
                    if (rs[i].isComfirm && !rs[i].isAttend) {
                        rfs.push(rs[i])
                    }
                }
                setInvitations(invi)
                setAcceptList(acp)
                setRefuseList(rfs)
            }



        }
        )


    }, [])






    return (
        <>


            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>

                <div className="d-block mb-4 mb-xl-0">
                    <h4>Lời mời họp của tôi</h4>
                </div>
            </div>

            {!loading ? (
                <>
                    <div>
                        Danh sách lời mời
                        {invitations ? (
                            invitations.map(c => <MeetingList key={`command-${c.id}`} {...c} />)
                        ) : null}
                    </div>
                    <div>
                        Các cuộc họp tham gia
                        {acceptList ? (
                            acceptList.map?.(c => <MeetingList key={`command-${c.id}`} {...c} />)
                        ) : null}

                    </div>
                    <div>
                        Các cuộc họp từ chối
                        {refuseList ? (
                            refuseList.map?.(c => <MeetingList key={`command-${c.id}`} {...c} />)
                        ) : null}
                    </div>
                </>


            ) : 'loading...'}
        </>
    )
}