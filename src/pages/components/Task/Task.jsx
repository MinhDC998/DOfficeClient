import React, { useEffect } from 'react';
import { Card, Button, Table, ListGroup, ListGroupItem, Form } from '@themesberg/react-bootstrap';



import { Routes } from '../../../routes';



import CreateTaskModal from './CreateTaskModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import taskActions from '../../../actions/taskActions';
import workActions from '../../../actions/workActions';
import TaskTable from './TaskTable';

export default () => {


  const [showCreateModal, setShowCreateModal] = React.useState()

  const { works } = useSelector(state => state.work)


  const handleCreateShow = () => {
    setShowCreateModal(true);
  }

  const dispatch = useDispatch()


  useEffect(() => {

    dispatch(taskActions.getAll())
    dispatch(workActions.getAll())
    componentDidMount()
  }, [])

  const componentDidMount = () => {
    document.title = "Quản lý tác vụ";
  }

  const { tasks, loading } = useSelector(state => state.task)






  return (
    <>
      <div className="" style={{ maxWidth: "40%" }}>
        <ListGroup horizontal>
          <ListGroup.Item style={{ width: 'auto' }} action href={Routes.WorkManagement.path} >
            Công việc

          </ListGroup.Item>
          <ListGroup.Item style={{ width: 'auto' }} action href={Routes.TaskManagement.path} active >
            Tác vụ
          </ListGroup.Item>
        </ListGroup>
      </div>

      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>

        <div className="d-block mb-4 mb-xl-0">
          <h4>Danh sách tác vụ</h4>
          {/* <p className="mb-0">
                    Dozens of reusable components built to provide buttons, alerts, popovers, and more.
                </p> */}

          <Button variant="secondary" className="m-1 mb-4" onClick={handleCreateShow}>

            Tạo tác vụ mới
          </Button>
        </div>
      </div>


      {!loading ? (
        <Card border="light" className="shadow-sm">
          <Card.Body className="p-0">
            {works &&
              <TaskTable tasks={tasks} works={works} />
            }
          </Card.Body>
        </Card>
      ) : 'loading...'}


      {
        showCreateModal ? (
          <CreateTaskModal showModal={showCreateModal} setshowModal={setShowCreateModal} />
        ) : null
      }



    </>
  )
}