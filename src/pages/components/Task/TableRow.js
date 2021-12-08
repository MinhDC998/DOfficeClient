import React, { useEffect } from 'react';
import workServices from '../../../services/work.services';






const TableRow = (props) => {
    const { workId, title, priority, status, beginDate, endDate, workTitle } = props;

    const [work, setWork] = React.useState();

    useEffect(() => {

        getWorkById(workId)

    }, [])

    const getWorkById = async (workId) => {
        const data = await workServices.getWorkById(workId);

        setWork(data);
        console.log(data)
    }
    console.log(work)











    return (
      
                <tr >
                    <td className=" fw-bold border-0" style={{ width: '15%' }}>
                        {title}
                    </td>

                    <td className=" fw-bold border-0" style={{ width: '15%' }}>
                        {work?.data.title}
                    </td>

                    <td className="fw-bold border-0" style={{ width: '15%' }}>
                        {priority.toUpperCase()}
                    </td>

                    <td className="fw-bold border-0" style={{ width: '15%' }}>
                        {status.toUpperCase()}
                    </td>

                    <td className="border-0" style={{ width: '10%' }}>
                        {beginDate}
                    </td>
                    <td className="border-0" style={{ width: '10%' }}>
                        {endDate}
                    </td>

                </tr >
     
    )

}
export default TableRow;