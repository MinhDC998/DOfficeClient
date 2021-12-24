import React from 'react';
import { Table } from '@themesberg/react-bootstrap';
import './work.scss'
import TableRow from './TableRow'


const TableWork = (props) => {
    console.log(props.works)


    return (
        <>
            <Table className="table-centered rounded table-hover" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                <thead className="thead-dark ">
                    <th style={{ width: '10%' }}> Tiêu đề </th>
                    <th style={{ width: '10%' }}> Trạng thái </th>
                    <th style={{ width: '10%' }}> Thòi hạn </th>
                    <th> Nhân viên</th>
                    <th> Mô tả </th>
                    <th>  </th>
                </thead>
                <tbody>
                    {props.works.map?.(c => <TableRow key={`command-${c.id}`} {...c} />)}
                </tbody>
            </Table>
        </>
    );
};

export default TableWork;