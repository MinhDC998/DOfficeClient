import React from "react";
import moment from "moment";

import { useHistory } from 'react-router-dom';

const TableRow = (props) => {
    const { id, title, venue, start, end, } = props;
    const [styleRow] = React.useState(() => {
        if (props.isCanceled)
            return { backgroundColor: 'lightPink', cursor: 'pointer' }
        return { cursor: 'pointer' }
    }
    )

    const history = useHistory();



    return (

        <tr style={styleRow} onClick={() => { history.push('meeting/detail/' + id) }}>

            <td className="fw-bold border-0" style={{ width: '15%' }}>
                {title}
            </td>
            <td className="fw-bold border-0" style={{ width: '15%' }}>
                {venue}
            </td>
            <td className="border-0" style={{ width: '10%' }}>
                Ngày  {moment(start).format('DD/MM/YYYY HHg:mm')}
            </td>
            <td className="border-0" style={{ width: '10%' }}>
                Ngày {moment(end).format('DD/MM/YYYY HHg:mm ')}

            </td>

        </tr >


    );
};

export default TableRow;