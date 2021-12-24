import React, { useState, useEffect } from 'react';
import CardWork from './CardWork';

import { Routes } from '../../../routes';
import { Container } from '@themesberg/react-bootstrap';

const StatusShow = props => {

    console.log("works:" + props.works)
    const [listCompleted, setListCompleted] = React.useState(() => {
        let tmp = []
        for (var i = 0; i < props.works?.length; i++) {
            if (props.works[i].isCompleted)
                tmp.push(props.works[i])
        }
        return tmp
    })
    const [listProgress, setListProgress] = React.useState(() => {
        let tmp = []
        for (var i = 0; i < props.works?.length; i++) {
            if (!props.works[i].isCompleted)
                tmp.push(props.works[i])
        }
        return tmp
    })




    console.log(listProgress)



    return (

        <>  <div style={{ paddingTop: 10 }} className="responsive" >
            <div className="row" style={{ display: 'flex' }} >


                <div className="col-3" style={{ maxWidth: '300', padding: 10 }} >
                    <div style={{ marginBottom: 15 }}>
                        <span style={{ backgroundColor: 'lightgray', padding: 5, borderRadius: 5 }}>
                            Chưa có trạng thái</span>
                    </div>
                </div>
                {/* Danh sách công việc đang tiến hành */}

                <div className="col-3" style={{ maxWidth: '250', padding: 10 }}>
                    <div style={{ marginBottom: 15 }}>
                        <span style={{ backgroundColor: 'lightpink', padding: 5, borderRadius: 5 }}>
                            Đang tiến hành</span>
                        <span style={{ fontSize: 'small', marginLeft: 10 }}> {listProgress.length} </span>
                    </div>
                    {listProgress.map?.(c => <CardWork key={`command-${c.id}`} {...c} />)}
                </div>
                {/* Danh sách công việc đã hoàn thành */}
                <div className="col-3" style={{ maxWidth: '250', padding: 10 }}>
                    <div style={{ marginBottom: 15 }}>
                        <span style={{ backgroundColor: 'lightgreen', padding: 5, borderRadius: 5 }}>
                            Đã hoàn thành</span>
                        <span style={{ fontSize: 'small', marginLeft: 10 }}> {listCompleted.length} </span>
                    </div>
                    {listCompleted.map?.(c => <CardWork key={`command-${c.id}`} {...c} />)}
                </div>
            </div>
        </div>


        </>


    )
}

export default StatusShow