import React, { useEffect } from 'react';
import workServices from '../../../services/work.services';
import moment from "moment";
import ModalInfo from '../Work/modal/ModalInfo'

import ModalTaskInfo from './ModalInfo';
import taskServices from '../../../services/task.services';






const TableRow = ({ task, workId, priority, status }) => {


    const [work, setWork] = React.useState();

    const [showModal, setShowModal] = React.useState(false)
    const [showTaskModal, setShowTaskModal] = React.useState(false)
    const [workAssignsList, setWorkAssignsList] = React.useState()
    const [taskAssignsList, setTaskAssignsList] = React.useState()


    const [priorityStyle, setPriorityStyle] = React.useState(() => {

        if (task.priority === 'low')
            return { backgroundColor: 'lightcyan', borderRadius: 5, padding: 2 }
        if (task.priority === 'medium')
            return { backgroundColor: '#fdffa3', borderRadius: 5, padding: 2 }
        if (task.priority === 'high')
            return { backgroundColor: 'lightpink', borderRadius: 5, padding: 2 }
    })

    const [statusStyle, setStatusStyle] = React.useState(() => {
        if (task.status === 'in progress')
            return { backgroundColor: 'lightpink', borderRadius: 5, padding: 2 }
        if (task.status === 'completed')
            return { backgroundColor: 'lightgreen', borderRadius: 5, padding: 2 }
        if (task.status === 'next up')
            return { backgroundColor: 'lightcyan', borderRadius: 5, padding: 2 }
    })

    useEffect(() => {
        getWorkById(task.workId)
        getWorkAssign(task.workId)
        getTaskAssign(task.id)

    }, [])

    const getWorkAssign = async (workId) => {
        const list = await workServices.getAssignByWorkId(workId)
        // setAssigns(list.data)
        let str = ''
        list.data.map(c => {
            str = str + c.userName + ', '
        })
        if (str) {
            str = str.slice(0, str.length - 2);
            setWorkAssignsList(str)
        }
        else {
            setWorkAssignsList('Chưa có nhân viên, hãy nhấn thêm')
        }

        console.log(list.data)
    }

    const getTaskAssign = async (TaskId) => {
        const list = await taskServices.getAssignByTaskId(TaskId)
        // setAssigns(list.data)
        let str = ''
        list.data.map(c => {
            str = str + c.userName + ', '
        })
        if (str) {
            str = str.slice(0, str.length - 2);
            setTaskAssignsList(str)
        }
        else {
            setTaskAssignsList('Chưa có nhân viên, hãy nhấn thêm')
        }


        console.log(list.data)
    }

    const getWorkById = async (workId) => {
        const data = await workServices.getWorkById(workId);

        setWork(data);
        // console.log(data)
    }
    console.log(work)


    const handleShow = () => {
        setShowModal(true);
    }
    const handleTaskShow = () => {
        setShowTaskModal(true);
    }







    return (
        <>
            {work
                && (task.workId === workId || workId === 'all')
                && (task.priority === priority || priority === 'all')
                && (task.status === status || status === 'all')
                && taskAssignsList && work.data.isStored === false

                && <tr style={{ cursor: 'pointer' }}   >
                    <td className=" fw-bold border-0" onClick={handleTaskShow}>
                        {task.title}
                    </td>

                    <td className=" fw-bold border-0" onClick={handleShow}>
                        {work?.data.title}
                    </td>
                    <td className="border-0 assigns" >

                        <div>
                            {taskAssignsList}
                        </div>

                    </td>

                    <td className="fw-bold border-0">
                        <span style={priorityStyle} >
                            {task.priority.toUpperCase()}
                        </span>
                    </td>

                    <td className="fw-bold border-0">
                        <span style={statusStyle} >
                            {task.status.toUpperCase()}
                        </span>


                    </td>

                    <td className="border-0" >
                        {moment(task.endDate).format('YYYY-MM-DD')}

                    </td>

                    <td className="border-0" >
                        {task.description}
                    </td>

                </tr >}

            {
                showModal ? (
                    <ModalInfo showModal={showModal} setshowModal={setShowModal} data={work.data} assigns={workAssignsList} />
                ) : null
            }

            {
                showTaskModal ? (
                    <ModalTaskInfo showModal={showTaskModal} setshowModal={setShowTaskModal} data={task} assigns={taskAssignsList} />
                ) : null
            }
        </>


    )

}
export default TableRow;