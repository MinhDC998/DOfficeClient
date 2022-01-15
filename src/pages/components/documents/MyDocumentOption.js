import React, { useState, useEffect } from "react";
import { Button, Dropdown, ButtonGroup } from "@themesberg/react-bootstrap";
import { Modal } from "@themesberg/react-bootstrap";
import './option.scss'
import Swal from 'sweetalert2'

import documentServices from "../../../services/document.services";
import { useDispatch, useSelector } from 'react-redux'
import documentActions from '../../../actions/document.actions'
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { ContextProvider } from './MainContentProvider'
import folderActions from '../../../actions/folder.actions'
import versionActions from "../../../actions/version.actions";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function MyDocumentOption({ documentId, nameDocument, is_lock, author, format, updateInfo, reupdateDocument, setUpdateList }) {
  const dispatch = useDispatch()

  const usrname = localStorage.getItem('username')
  const [content, setContent] = useState('')
  const contextProvider = React.useContext(ContextProvider)

  useEffect(() => {
    dispatch(documentActions.getPermissionDocumentOfUser())
  }, [])

  // fix it
  // const myDocumentFolderId = '61c3380a3bd80918d64ec4e7'

  const {permissions} = useSelector(state => state.permissions)

  const Swal = require('sweetalert2')

  const splitName = (str) => {
    const tmp = str.split(".");
    const format = tmp[tmp.length - 1];
    tmp.splice(tmp.length - 1, 1);
    const name = tmp.join(".");
    return {
      format,
      name,
    };
  };

  const [isLock, setIsLock] = useState(is_lock)
  const [showRename, setShowRename] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAddKeyword, setAddShowKeyword] = useState(false);
  const [showShare, setShowShare] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  
  const [subscribeInfo, setSubscribeInfo] = useState([])
  const [lockInfo, setLockInfo] = useState({});
  const [keywords, setKeywords] = useState("");
  const [newName, setNewName] = useState(() => {
    return nameDocument ? splitName(nameDocument).name : "";
  });
  const [selectedFile, setSelectedFile] = useState();
  const [listUser, setListUser] = useState([])
  const [listUserShare, setListUserShare] = useState([])
  const [urlPreview, setUrlPreview] = useState('')

  const handleRename = async () => {
    const tmp = newName + "." + splitName(nameDocument).format;
    const result = await documentServices.rename(documentId, tmp);
    if(result.code === '200') {
      // setNameDoc(tmp)
      // console.log({tmp: nameDoc});
      reupdateDocument(documentId)
    }
    setShowRename(false);
    alertSuccess('Đổi tên thành công!')
    setNewName("");
  };

  // error: not update list version of document
  const handleUpdate = async () => {
    const file = selectedFile;
    if(file === undefined) {
      alertCheckUpdateFile('Bạn cần chọn file để cập nhật!')
      return false
    }
    if(nameDocument !== selectedFile.name) {
      alertCheckUpdateFile('Tên file mới và file cũ cần trùng nhau!')
      return false
    }
    // const result = await documentServices.updates(file, documentId);
    // if(result.code === '200') {
    //   reupdateDocument(documentId)
    // }
    dispatch(documentActions.updateDocument(file, documentId)).then(result => {
      // console.log({res: result});
      if(result.code === '200') {
        reupdateDocument(documentId)
      }
    })
    setShowUpdate(false);
    setSelectedFile();
    alertSuccess('Cập nhật thành công!');
  };

  const handleDelete = () => {
    return Swal.fire({
      title: 'Bạn có chắc muốn xóa không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nó!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await documentServices.deleteDocument(documentId);
        if(result.code === '200') {
          reupdateDocument(documentId)
        }

        Swal.fire(
          'Đã xóa!',
          'Tài liệu đã bị xóa!'
        )
      }
    })
  };

  const handleDownload = async () => {
    const data = await documentServices.downloadDocument(documentId)
    let type = ''
    const img = ['png', 'jpg', 'jpeg', 'PNG', 'JPEG', 'JPG']
    if(format === 'pdf') {
      type = "application/pdf"
    } else if(img.includes(format)) {
      type = "image/jpeg"
    } else {
      type = "application/msword"
    }

    const blob = base64ToBlob(data.data, type)
    const url = URL.createObjectURL(blob)
    var tempLink = ''
    tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', nameDocument);
    tempLink.click();

    alertSuccess('Đã tải xuống!')
  }

  const handleLock = async () => {
    const result = await documentServices.lock(documentId);
    if(result.code === '200') {
      reupdateDocument(documentId)
      alertSuccess('Khóa thành công!')
    } else {
      reupdateDocument(documentId)
      alertCheckUpdateFile('Tài liệu đã bị khóa bởi người dùng khác. Vui lòng thử lại sau.')
    }
  };

  const handleUnlock = async () => {
    const result = await documentServices.unlock(documentId);
    if(result.code === '200') {
    //   dispatch(folderActions.getResponseFolderEntity(myDocumentFolderId))
      reupdateDocument(documentId)
      alertSuccess('Mở khóa thành công!')
    }
  };

  const handleSubscribe = async () => {
    const result = await documentServices.subscribes(documentId);
    if(result.code === '200') {
      reupdateDocument(documentId)
      alertSuccess('Theo dõi thành công!')
    }
  };

  const handleUnsubscribe = async () => {
    const result = await documentServices.unsubscribe(documentId);
    if(result.code === '200') {
      reupdateDocument(documentId)
      alertSuccess('Bỏ theo dõi thành công!')
    }
  };

  const handleAddKeyword = async () => {
    const result = await documentServices.addNewKeyword(keywords, documentId);
    if(result.code === '200') {
      reupdateDocument(documentId)
      alertSuccess('Thêm mới thành công!')
    }
    setAddShowKeyword(false);
  };

  const handleGetUser = (username) => {
    setListUserShare([...listUserShare, username])
    
    setListUser(prev => {
      return prev.filter(item => item !== username)
    })
  }

  // khi chia sẻ 1 tài liệu cho người dùng khác,
  // thêm tài liệu đó vào thư mục chia sẻ của người dùng đó
  // error: not update list user in security tab
  const handleShare = async () => {
    console.log(listUserShare);
    const result = await documentServices.shareDocument(documentId, listUserShare)
    if(result.code === '200') {
      reupdateDocument(documentId)
      setUpdateList((v) => !v)
    }
    setShowShare(false)
    alertSuccess('Chia sẻ thành công!')
  }

  const getListUser = async () => {
    const data = await documentServices.getAllUser()
    data.data.map(v => {
      if(v === usrname) data.data.splice(data.data.indexOf(v), 1)
    })
    setListUser(data.data)
  }

  const getLockData = async () => {
    const data = await documentServices.getLockInfo(documentId);
    if (data.data) {
      setLockInfo(data.data);
    }
  };

  const getSubscribeInfo = async () => {
    const data = await documentServices.getListSubscriber(documentId)
    setSubscribeInfo(data.data)
  }

  // get content file
  const getContent = async () => {
    // const data = await documentServices.getContent(nameDocument)
    const data = await documentServices.getContent(documentId)
    setContent(data.data)
  }

  useEffect(() => {
    getLockData();
    getSubscribeInfo();
    checkPermission();
    getContent();
    setNewName(splitName(nameDocument).name)
  }, [documentId, updateInfo]);

  const checkShowLock = (lock) => {
    if (lock === 1) {
      if (usrname === lockInfo.username)
        return {
          lockbtn: false,
          unlockbtn: true,
          renamebtn: true,
          updatebtn: true,
          addkeywordbtn: true,
          deletebtn: true,
        };
      else
        return {
          lockbtn: false,
          unlockbtn: false,
          renamebtn: false,
          updatebtn: false,
          addkeywordbtn: false,
          deletebtn: false,
        };
    } else {
      return {
        lockbtn: true,
        unlockbtn: false,
        renamebtn: false,
        updatebtn: false,
        addkeywordbtn: false,
        deletebtn: true,
      };
    }
  };

  // check if user subscribe document
  const checkSubscribe = () => {
    if(subscribeInfo.includes(usrname))
      return true
    else return false
  }

  // check user have what permission
  const checkPermission = () => {
    let downloadbtn = false, previewbtn = false, updatebtn = false, renamebtn = false, 
    addkeywordbtn = false, deletebtn = false, securitybtn = false

    if(author === usrname) {
      return {
        downloadbtn: true, previewbtn: true, updatebtn: true, renamebtn: true, 
        addkeywordbtn: true, deletebtn: true, securitybtn: true
      }
    }
    
    for(var i = 0; i < permissions.length; i++) {
      if(permissions[i].documentId === documentId) {
        // console.log(permissions[i]);
        if(permissions[i].listPermission.includes('1')) {
          downloadbtn = true
          previewbtn = true
        }
        if(permissions[i].listPermission.includes('2')) {
          updatebtn = true
          renamebtn = true
          addkeywordbtn = true
        }
        if(permissions[i].listPermission.includes('3')) {
          deletebtn = true
        }
        if(permissions[i].listPermission.includes('4')) {
          securitybtn = true
        }
      }
    }

    contextProvider.securityBtn.onChangeSecurityBtn({documentId: documentId, securitybtn: securitybtn})
    
    return {
      downloadbtn, previewbtn, updatebtn, renamebtn, 
      addkeywordbtn, deletebtn, securitybtn
    }
  }

  // modal alert
  const alertSuccess = (text) => {
    return Swal.fire({
      position: 'centered',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 2000
    })
  }

  const alertCheckUpdateFile = (text) => {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }

  // convert base64 to blob
  const base64ToBlob = (data, type) => {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
        var ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return new Blob([bytes], {type: type});
  }

  const handlePreview = () => {
    let type = ''
    const img = ['png', 'jpg', 'jpeg', 'PNG', 'JPEG', 'JPG']
    if(format === 'pdf') {
      type = "application/pdf"
    } else if(img.includes(format)) {
      type = "image/jpeg"
    } else {
      // type = "application/msword"
      type = "application/pdf"
    }
    // const data = await documentServices.getContent(nameDocument)
    // const data = await documentServices.getContent(nameDoc)
    // const tmp = data.data
    const blob = base64ToBlob(content, type)
    // const blob = base64ToBlob(tmp, type)
    setUrlPreview(URL.createObjectURL(blob))
  }

  // check format of document
  const judge = () => {
    let isPdf = false, isImg = false, isWord = false
    const img = ['png', 'jpg', 'jpeg', 'PNG', 'JPEG', 'JPG']
    if(format === 'pdf') {
      isPdf = true
    } else if(img.includes(format)) {
      isImg = true
    } else {
      // isWord = true
      isPdf = true
    }
    return {
      isPdf, isImg, isWord
    }
  }

  // remove user in modal share
  const handleReject = (username) => {
    setListUserShare(prev => {
      return prev.filter(item => item !== username)
    })

    const tmp = [...listUser]
    tmp.unshift(username)
    tmp.sort()
    setListUser(tmp)
  }

  return (
    <>
      <Dropdown as={ButtonGroup} className="my-3 m-lg-1 dropdown-style">
        <Dropdown.Toggle split variant="light" className="btn-sm">
          ...
        </Dropdown.Toggle>

        <Dropdown.Menu>
          { checkPermission().downloadbtn == true &&
            <Dropdown.Item onClick={handleDownload}>
              Tải xuống
            </Dropdown.Item>
          }

          { checkPermission().previewbtn == true &&
            <Dropdown.Item onClick={() => {
              handlePreview()              
              setShowPreview(!showPreview)
            }}>
              Xem trước
            </Dropdown.Item>
          }
          
          { checkShowLock(is_lock).updatebtn == true &&
            checkPermission().updatebtn == true &&
            <Dropdown.Item
              onClick={() => setShowUpdate(!showUpdate)}
            >
              Cập nhật
            </Dropdown.Item>
          }

          { checkShowLock(is_lock).addkeywordbtn == true &&
            checkPermission().addkeywordbtn == true &&
            <Dropdown.Item
              onClick={() => setAddShowKeyword(!showAddKeyword)}
            >
              Thêm từ khóa
            </Dropdown.Item>
          }

          { checkShowLock(is_lock).renamebtn == true &&
            checkPermission().renamebtn == true &&
            <Dropdown.Item
              onClick={() => setShowRename(!showRename)}
            >
              Đổi tên
            </Dropdown.Item>  
          }

          { checkShowLock(is_lock).lockbtn == true &&
            <Dropdown.Item
              onClick={handleLock}
            >
              Khóa
            </Dropdown.Item>
          }

          { checkShowLock(is_lock).unlockbtn == true &&
            <Dropdown.Item
              onClick={handleUnlock}
            >
              Mở khóa
            </Dropdown.Item>
          }

          <Dropdown.Item
            onClick={() => {
              setShowShare(!showShare);
              getListUser();
            }}
          >
            Chia sẻ
          </Dropdown.Item>

          { checkSubscribe() === false &&
            <Dropdown.Item 
              onClick={handleSubscribe}
            >
              Theo dõi
            </Dropdown.Item>
          }

          { checkSubscribe() === true &&
            <Dropdown.Item 
              onClick={handleUnsubscribe}
            >
              Bỏ theo dõi
            </Dropdown.Item>
          }

          <Dropdown.Divider />

          { checkShowLock(is_lock).deletebtn == true &&
            checkPermission().deletebtn == true &&
            <Dropdown.Item
              onClick={handleDelete}
            >
              Xóa tài liệu
            </Dropdown.Item>
          }

        </Dropdown.Menu>
      </Dropdown>

      {/* modal add keyword */}
      <Modal
        as={Modal.Dialog}
        centered
        show={showAddKeyword}
        onHide={() => setAddShowKeyword(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Tải xuống tài liệu</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setAddShowKeyword(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nhập các từ khóa muốn thêm</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập các từ khóa ..."
              aria-describedby="helpId"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <small className="text-muted">
              Các từ khóa cách nhau bởi dấu ","
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleAddKeyword}
          >
            Thêm mới
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setAddShowKeyword(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal rename */}
      <Modal
        as={Modal.Dialog}
        centered
        show={showRename}
        onHide={() => setShowRename(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Đổi tên</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setShowRename(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nhập tên mới</label>
            <input
              className="form-control"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRename}>
            Thay đổi
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setShowRename(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal update */}
      <Modal
        as={Modal.Dialog}
        centered
        show={showUpdate}
        onHide={() => setShowUpdate(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Cập nhật</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setShowUpdate(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="panel panel-default mb-3">
            <div className="panel-body">
              <label className="form-label">Chọn tài liệu</label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <small className="text-muted">
                Tên file mới và file cũ cần phải trùng nhau
              </small>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdate}>
            Cập nhật
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setShowUpdate(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal share */}
      <Modal
        as={Modal.Dialog}
        size="lg"
        centered
        show={showShare}
        onHide={() => setShowShare(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">Chia sẻ tài liệu</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setShowShare(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Tên tài liệu</label>
            <input type="text" className="form-control" value={nameDocument} readOnly />
          </div>
          <div className="row mt-3">
            <div
              className="col-4"
              style={{
                maxHeight: 300,                
                overflowY: "scroll",
                cursor: "pointer",
              }}
            >
              <table className="table border-0">
                <thead className="thead-light" style={{ position:"sticky", top:0 }}>
                  <tr><th>Danh sách</th></tr>
                </thead>
                <tbody>
                  {listUser.map((user, index) => (
                    <tr
                      key={index}
                      onDoubleClick={() => {
                        handleGetUser(user);
                      }}
                    >
                      <td className="border-0">{user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-8"
              style={{
                maxHeight: 300,
                overflowY: "scroll",
                cursor: "pointer",
              }}
            >
              <table className="table border-0">
                <thead 
                  className="thead-light" 
                  style={{ position:"sticky", top:0, textAlign: "center" }}
                >
                  <tr>
                    <th>...</th>
                    <th>Người dùng được chia sẻ</th>
                  </tr>
                </thead>
                <tbody>
                  {listUserShare.length > 0 ? (
                    listUserShare.map((username, index) => (
                      <tr key={index} style={{ textAlign:"center" }}>
                        <td
                          onClick={() => handleReject(username)}
                        ><i className="fa fa-arrow-left"></i>
                        </td>
                        <td>{username}</td>
                      </tr>
                    ))
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleShare}
          >
            Chia sẻ
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setShowShare(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* modal preview */}
      <Modal
        as={Modal.Dialog}
        size="lg"
        centered
        show={showPreview}
        onHide={() => setShowPreview(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">{nameDocument}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {judge().isPdf == true && <Viewer fileUrl={urlPreview} plugins={[defaultLayoutPlugin]} />}
          {judge().isImg == true && <img src={urlPreview} />}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setShowPreview(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyDocumentOption;
