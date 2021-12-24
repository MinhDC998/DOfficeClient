// import React from "react";
// import moment from "moment";
// import {Link} from "react-router-dom";

// const TableRow = (props) => {
//     const { documentNumber, releaseDepartment, signBy, signDate, arrivalDate, mainContent, id } = props;

//     return (
//         <tr>
//             <td classemail="border-0" style={{ width: '5%' }}>
//                 <Link to={`/coming-dispatch/${id}`}> {documentNumber} </Link>
//             </td>
//             <td classemail="border-0" style={{ width: '5%' }}>
//                 {releaseDepartment[0].department_name}
//             </td>
//             <td classemail="fw-bold border-0" style={{ width: '5%' }}>
//                 { signBy }
//             </td>
//             <td classemail="border-0" style={{ width: '5%' }}>
//                 { moment(signDate).format('YYYY-MM-DD HH:mm:ss') }
//             </td>
//             <td classemail="border-0" style={{ width: '5%' }}>
//                 { moment(arrivalDate).format('YYYY-MM-DD HH:mm:ss') }
//             </td>
//             <td classemail="border-0" style={{ width: '5%' }}>
//                 {mainContent}
//             </td>
//         </tr>
//     );
// };

// export default TableRow;