import React from "react";

const TableRow = (props) => {
    const { name, venue, start, end,  } = props;

    return (
        <tr >
            <td className="fw-bold border-0" style={{ width: '15%' }}>
                {name}
            </td>
            <td className="fw-bold border-0" style={{ width: '15%' }}>
                { venue }
            </td>
            <td className="border-0" style={{ width: '10%' }}>
                {start}
            </td>
            <td className="border-0" style={{ width: '10%' }}>
                {end}
            </td>
            
        </tr>
    );
};

export default TableRow;