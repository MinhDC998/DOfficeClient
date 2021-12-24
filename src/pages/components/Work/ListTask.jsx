import React from 'react';
import './work.scss'
import ModalTaskInfo from '../Task/ModalInfo';


const ListTask = (props) => {


    const [showTaskModal, setShowTaskModal] = React.useState(false)


    const handleTaskShow = () => {
        setShowTaskModal(true);
        console.log(showTaskModal)
    }



    return (
        <>
            <div style={{ marginBottom: '1rem' }}>
                <span className='sub-list-task' onClick={handleTaskShow}>
                    {props.title.charAt(0).toUpperCase() + props.title.slice(1)}
                </span>

            </div>
            {
                showTaskModal ? (
                    <ModalTaskInfo showModal={showTaskModal} setshowModal={setShowTaskModal} data={props} />
                ) : null
            }

        </>

    );

}
export default ListTask;