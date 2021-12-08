import React, { useState, useEffect } from 'react';
import CardWork from './CardWork';

import { Routes } from '../../../routes';

const StatusShow = props => {
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

        <>
            <div style={{ display: "flex" }}>
                <div style={{ width: 300, padding: 10 }}>Chưa có trạng thái
                </div>
                <div style={{ width: 300, padding: 10 }}>Đã hoàn thành
                    {listCompleted.map?.(c=><CardWork key={`command-${c.id}`} {...c}/>)}

                </div>
                <div style={{ width: 300, padding: 10 }}>Đang tiến hành</div>
            </div>


        </>


    )
}

export default StatusShow