import React, { useState, useEffect } from "react";
import { Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { Modal } from "@themesberg/react-bootstrap";
import Swal from 'sweetalert2'

import documentServices from "../../../../services/document.services";
import { useDispatch, useSelector } from "react-redux";
import documentActions from "../../../../actions/document.actions";
import { ContextProvider } from '../MainContentProvider'

function TabSecurity({ docId, type, shared, owner, updateList }) {
  const dispatch = useDispatch();
  
  const [showGrantPermission, setShowGrantPermission] = useState(false);

  const [listUsers, setListUsers] = useState([])
  const [listUserGrant, setListUserGrant] = useState([])
  // const [grantbtn, setGrantbtn] = useState(true)
  const [showEditPermission, setShowEditPermission] = useState(false)
  const [permissionDoc, setPermissionDoc] = useState({})
  const [editChecked, setEditChecked] = useState([])
  const [tmpArr, setTmpArr] = useState([])

  const username = localStorage.getItem('username')
  const Swal = require('sweetalert2')

  const contentProvider = React.useContext(ContextProvider)

  const pers = [
    {
      id: 1,
      name: 'Đọc'
    },
    {
      id: 2,
      name: 'Sửa'
    },
    {
      id: 3,
      name: 'Xóa'
    },
    {
      id: 4,
      name: 'Bảo mật'
    }
  ]

  useEffect(() => {
    dispatch(documentActions.getListUserGrantedPermission(docId));
    getListUser();
  }, [docId, updateList])

  const {permissions, permissionOfUsers} = useSelector(state => state.permissions)
  
  const getListUser = async () => {
    const data = await documentServices.getAllUser()
    if(type === 'private') {
      setListUsers(shared)
    } else {
      setListUsers(data.data)
    }
    // console.log(data.data);
  }

  const handleCheck = (id, username) => {
    const data = listUserGrant.map(v => {
      if (v.username === username) {
        if (v.roles.includes(id)) {
          v.roles = v.roles.filter(v => v !== id)
        } else {
          v.roles = [...v.roles, id];
        }
      }
      
      return v;
    });

    setListUserGrant(data);
  }

  // call api submit
  const handleSubmit = async () => {
    const result = await documentServices.grantPermissionDocument(docId, listUserGrant)
    if(result.code === '200') {
      dispatch(documentActions.getListUserGrantedPermission(docId))
    }
    setShowGrantPermission(false)
    setListUserGrant([])

  }

  const handleGetUser = (username) => {
    const userGrant = {
      username,
      roles: [1]
    };

    setListUserGrant([...listUserGrant, userGrant])

    setListUsers(prev => {
      return prev.filter(item => item !== username)
    })
  }

  const handleReject = (username) => {
    setListUserGrant(prev => {
      return prev.filter(item => item.username !== username)
    })
    // setListUsers([...listUsers, username])
    const tmp = [...listUsers]
    tmp.unshift(username)
    tmp.sort()
    setListUsers(tmp)
  }

  // in case user pick but not grant permission
  const handleClose = () => {
    if(listUserGrant.length > 0) {
      const tmp = [...listUsers]
      listUserGrant.map(user => {
        tmp.push(user.username)
      })
      setListUsers(tmp.sort())
      setListUserGrant([])
    }
  }

  const handleEditPermission = async () => {
    // console.log({abc: editChecked.sort()})
    // console.log({name: permissionDoc.username})
    // console.log({docId: permissionDoc.documentId})
    const ar = editChecked.sort()
    const result = await documentServices.updatePermissionDocument(
      permissionDoc.documentId,
      permissionDoc.username,
      ar
    )
    if(result.code === '200') {
      // update UI
      dispatch(documentActions.getListUserGrantedPermission(docId));
      alertSuccess('Thay đổi quyền thành công!')
    }
    setShowEditPermission(false)
  }

  const handleEditCheck = (id) => {
    setEditChecked(prev => {
      const isChecked = editChecked.includes(id)
      if(isChecked) {
        return editChecked.filter(item => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const preProcess = (arr) => {
    if(arr.length <= 4 && arr.length > 0) {
      let tmp = [...arr]
      for(var i = 1; i <= 4; i++) {
        if(tmp.indexOf(i.toString()) === -1) {
          tmp.push(i.toString())
        }
      }
      tmp.sort()
      setTmpArr(tmp)
    }
  }

  const checkShowGrantBtn = () => {
    let grantbtn = false
    permissions.map(v => {
      if(v.username === username && v.documentId === docId) {
        if(v.listPermission?.indexOf('4') > 0) {
          grantbtn = true
        } else {
          grantbtn = false
        }
      }
    })
    return grantbtn
  }

  // console.log({check: checkShowGrantBtn()});

  // remove user granted in initial list user
  const removeUserGranted = () => {
    let tmp = [...listUsers]
    const index = tmp.indexOf('administrator')
    if(index > -1) {
      tmp.splice(index, 1)
    }
    for(var i = 0; i < tmp.length; i++) {
      for(var j = 0; j < permissionOfUsers.length; j++) {
        if(tmp[i] === permissionOfUsers[j].username && 
          checkPermission(permissionOfUsers[j].listPermission) === true) {
          const ind = tmp.indexOf(tmp[i])
          if(ind > -1) {
            tmp.splice(ind, 1)
          }
        }
      }
    }
    // tmp.splice(tmp.indexOf(username), 1)
    setListUsers(tmp)
  }

  // console.log({list: listUsers});

  const checkPermission = (arr) => {
    const index = arr.indexOf('1')
    if(arr.length === 1 && index > -1) {
      return false
    }
    return true
  }

  const alertSuccess = (text) => {
    return Swal.fire({
      position: 'centered',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 2000
    })
  }
  
  // console.log({data: contentProvider});

  // danh sách tài liệu sẽ chỉ lấy với tài liệu công khai
  // chỉ hiện cấp quyền trong tài liệu của tôi
  // nếu tài liệu công khai, quyền đọc được cấp mặc định cho tất cả mọi người
  // còn những quyền khác cần được cấp
  // nếu tài liệu riêng tư, cần người dùng thực hiện cấp quyền
  // chỉ hiện nút chia sẻ với tài liệu riêng tư

  return (
    <>
      <table className="table border-0">
        <thead className="thead-light">
          <tr style={{ textAlign:'center' }}>
            <th>Người dùng</th>
            <th>Đọc</th>
            <th>Sửa</th>
            <th>Xóa</th>
            <th>Bảo mật</th>
            <th>...</th>
            <th>
              {
                <button
                  className={`btn btn-outline-primary btn-sm ${checkShowGrantBtn() === true ? '' : 'disabled'}`}
                  onClick={() => {
                    removeUserGranted()
                    setShowGrantPermission(!showGrantPermission)
                  }}
                >
                  Cấp quyền
                </button>
              }
            </th>
          </tr>
        </thead>
        <tbody style={{ textAlign:'center', borderBottom:0 }}>
          { permissionOfUsers?.length > 0 ?
            permissionOfUsers?.map((v, i) => (
              v.username !== 'administrator' && checkPermission(v.listPermission) === true ?
              <tr key={v.id}>
                <td>{v.username}</td>
                <td><input type="checkbox" checked={v.listPermission.includes('1')} readOnly /></td>
                <td><input type="checkbox" checked={v.listPermission.includes('2')} readOnly /></td>
                <td><input type="checkbox" checked={v.listPermission.includes('3')} readOnly /></td>
                <td><input type="checkbox" checked={v.listPermission.includes('4')} readOnly /></td>
                {/* {console.log({v, owner})} */}
                {v.username !== owner && checkShowGrantBtn() === true ? 
                  <td onClick={() => {
                    setPermissionDoc(v)
                    setEditChecked(v.listPermission)
                    preProcess(v.listPermission)
                    setShowEditPermission(!showEditPermission)
                  }}>
                    <i className="fas fa-edit"></i>
                  </td>
                  : <td></td>
                }
              </tr>
              : <tr key={v.id}></tr>
            ))
            : <tr><td colSpan={5}>Chưa có người dùng nào được cấp quyền</td></tr>
            // console.log(listPermission)
          }
        </tbody>
      </table>

      {/* modal grant permission */}
      <Modal
        // as={Modal.Dialog}
        size="lg"
        centered
        show={showGrantPermission}
        onHide={() => setShowGrantPermission(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Cấp quyền tài liệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
              <div className="col-3" style={{ maxHeight:320, minHeight:320, minWidth:110, overflowY:'scroll', cursor:'pointer'}}>
                <table className="table border-0">
                  <thead 
                    style={{ position:"sticky", top: 0 }}
                    className="thead-light"
                  >
                    <tr>
                      <th>Danh sách</th>
                    </tr>
                  </thead>
                  <tbody>
                    { listUsers?.length > 0 &&
                      listUsers.map((user, index) => (
                        <tr 
                          key={index}
                          onDoubleClick={() => {                
                            handleGetUser(user)
                          }}
                        >
                          <td className="border-0">{user}</td>
                        </tr>
                      ))
                      // console.log({list: listUsers})
                    }
                  </tbody>
                </table>
              </div>

              <div className="col-9" style={{ maxHeight:300, overflowY:'scroll', cursor:'pointer'}}>
                <table className="table border-0">
                  <thead className="thead-light" style={{ position:"sticky", top:0 }}>
                    <tr style={{ textAlign:'center' }}>
                      <th>...</th>
                      <th>Người dùng</th>
                      <th>Đọc </th>
                      <th>Sửa </th>
                      <th>Xóa</th>
                      <th>Bảo mật</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listUserGrant.length > 0 ?
                      listUserGrant.map((user, index) => (
                        <tr key={index} style={{ textAlign:'center' }}>
                          <td
                            onClick={() => handleReject(user.username)}
                          ><i className="fa fa-arrow-left"></i>
                          </td>
                          <td>{user.username}</td>
                          {pers.map((permission, index) => {
                            let isChecked = false;

                            for (let i = 0; i < user.roles.length; i++) {
                              if (!user.roles.includes(permission.id)) break;

                              if(user.roles[i] === permission.id) {
                                isChecked = true;
                                break;
                              }
                            }
                            return (
                              <td key={index}>
                                <input 
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleCheck(permission.id, user.username)}                            
                                />
                              </td>
                            )
                          })}
                        </tr>
                      ))
                      : <tr style={{ textAlign:'center', paddingTop:10, borderBottom:0 }}>
                        <td colSpan={6}>
                          {type === 'private' && listUsers.length === 0 ? 
                          'Bạn cần chia sẻ tài liệu trước' : ''}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleSubmit()}
          >
            Thay đổi
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => {
              setShowGrantPermission(false)
              handleClose()
            }}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal edit permission */}
      <Modal
        as={Modal.Dialog}
        centered
        show={showEditPermission}
        onHide={() => setShowEditPermission(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Chỉnh sửa quyền tài liệu</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setShowEditPermission(false)}
          />
        </Modal.Header>
        <Modal.Body>
        <table className="table border-0">
        <thead className="thead-light">
          <tr style={{ textAlign:'center' }}>
            <th>Người dùng</th>
            <th>Đọc</th>
            <th>Sửa</th>
            <th>Xóa</th>
            <th>Bảo mật</th>
          </tr>
        </thead>
        <tbody style={{ textAlign:'center', borderBottom:0 }}>
          <tr>
            <td>{permissionDoc.username}</td>
            {tmpArr.map((p, index) => (
            <td key={index}>
              <input 
                type="checkbox"
                checked={editChecked.includes(p)}
                onChange={() => handleEditCheck(p)}
              />
            </td>
            ))}
          </tr>
        </tbody>
      </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleEditPermission}
          >
            Thay đổi
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setShowEditPermission(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TabSecurity;
