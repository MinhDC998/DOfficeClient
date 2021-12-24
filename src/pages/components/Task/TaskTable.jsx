import React, { useEffect } from 'react';
import { Card, Button, Table, ListGroup, ListGroupItem, Form } from '@themesberg/react-bootstrap';
import { useDispatch } from 'react-redux';
import TableRow from "./TableRow";

import taskActions from '../../../actions/taskActions';



const TaskTable = ({ tasks, works }) => {


    const dispatch = useDispatch()
    const PRIORITY = ['low', 'medium', 'high']
    const STATUS = ['next up', 'in progress', 'completed']

    const [workId, setWorkId] = React.useState('all')
    const [priority, setPriority] = React.useState('all')
    const [status, setStatus] = React.useState('all')

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'workId')
            setWorkId(value)
        if (name === 'priority')
            setPriority(value)
        if (name === 'status')
            setStatus(value)
    }

    return (
        <>
            <Form>
                <Table responsive className="table-centered rounded table-hover" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    <thead className="thead-light ">
                        <tr>
                            <th className="border-0" style={{ width: '15%' }}>Tiêu đề</th>
                            <th className="border-0" style={{ width: '15%' }}>


                                <Form.Select name='workId' onChange={onChange} style={{ color: 'black', border: 0 }} >

                                    <option defaultValue value='all'>Công việc</option>
                                    {/* <option value='all'>Tất cả công việc</option> */}
                                    {works?.map((v, i) => (<option key={i} value={v.id} selected={(workId === v.id) ? true : null} >{v.title}</option>))}

                                </Form.Select>


                            </th>
                            <th className="border-0" style={{ width: '10%' }}>Nhân viên</th>
                            <th className="border-0" style={{ width: '18%' }}>
                                <Form.Select name='priority' onChange={onChange} style={{ color: 'black', border: 0 }}>
                                    <option selected value='all'>Độ ưu tiên</option>
                                    {PRIORITY.map(c => (<option key={c} value={c} selected={(priority === c ? true : null)} >{c.toUpperCase()}</option>))}
                                </Form.Select>
                            </th>
                            <th className="border-0" style={{ width: '16%' }}>

                                <Form.Select name='status' onChange={onChange} style={{ color: 'black', border: 0 }} >
                                    <option selected value='all'>Trạng Thái</option>
                                    {STATUS.map(c => (<option key={c} value={c} selected={(status === c ? true : null)} >{c.toUpperCase()}</option>))}
                                </Form.Select>

                            </th>
                            <th className="border-0" style={{ width: '10%' }}>Thời hạn</th>
                            <th className="border-0" >Mô tả</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map?.(c => <TableRow key={`command-${c.id}`} task={c} workId={workId} priority={priority} status={status} />)}
                    </tbody>
                </Table>
            </Form>
        </>


    )

}
export default TaskTable;