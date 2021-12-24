import React, { useState, useEffect } from 'react';
import { Routes } from '../../../routes';
import './meeting.scss'

const StaffList = ({ staffs }) => {
    

    return (
        <>
            <div className='list-staff'>
                {
                    staffs.map?.(c => (
                        <span key={c.id} >
                            {c.userName}
                        </span>
                    )
                    )
                }
            </div>
        </>
    )

}
export default StaffList
