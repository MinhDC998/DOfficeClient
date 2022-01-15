import React, { useState, useEffect } from "react";
import { Card, Table } from "@themesberg/react-bootstrap";
import { Button, Dropdown, ButtonGroup } from "@themesberg/react-bootstrap";
import { Modal } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'

import documentServices from "../../../services/document.services";
import { useDispatch, useSelector } from 'react-redux'
import documentActions from '../../../actions/document.actions'
import categoryActions from "../../../actions/category.actions";
import { Viewer } from '@react-pdf-viewer/core';

function OptionSearch({ documentId, nameDocument, is_lock, format, author, reupdateSearch, reupdateDel, updateInfo }) {
  const dispatch = useDispatch()

  const usrname = localStorage.getItem('username')
  const [content, setContent] = useState('')

  useEffect(() => {
    dispatch(documentActions.getPermissionDocumentOfUser())
  }, [])

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
      reupdateSearch(documentId)
      alertSuccess('Đổi tên thành công!')
    }
    setShowRename(false);
    setNewName("");
  };

  const handleUpdate = async () => {
    const file = selectedFile;
    if(nameDocument !== selectedFile.name) {
      alertCheckUpdateFile('Tên file mới và file cũ cần trùng nhau!')
      return false
    }
    const result = await documentServices.updates(file, documentId);
    if(result.code === '200') {
      reupdateSearch(documentId)
      alertSuccess('Cập nhật thành công!')
    }
    setShowUpdate(false);
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
          reupdateDel(documentId)
        }

        Swal.fire(
          'Đã xóa!',
          'success'
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
      reupdateSearch(documentId)
      alertSuccess('Khóa thành công!')
    }
  };

  const handleUnlock = async () => {
    const result = await documentServices.unlock(documentId);
    console.log(result);
    if(result.code === '200') {
      reupdateSearch(documentId)
      alertSuccess('Mở khóa thành công!')
    }
  };

  const handleSubscribe = async () => {
    const result = await documentServices.subscribes(documentId);
    if(result.code === '200') {
      reupdateSearch(documentId)
      alertSuccess('Theo dõi thành công!')
    }
  };

  const handleUnsubscribe = async () => {
    const result = await documentServices.unsubscribe(documentId);
    if(result.code === '200') {
      reupdateSearch(documentId)
      alertSuccess('Bỏ theo dõi thành công!')
    }
  };

  const handleAddKeyword = async () => {
    const result = await documentServices.addNewKeyword(keywords, documentId);
    if(result.code === '200') {
      reupdateSearch(documentId)
      alertSuccess('Thêm mới thành công!')
    }
    setAddShowKeyword(false);
    setKeywords('')
  };

  const handleGetUser = (username) => {
    setListUserShare([...listUserShare, username])
    
    setListUser(prev => {
      return prev.filter(item => item !== username)
    })
  }

  const handleShare = async () => {
    // console.log(listUserShare);
    const result = await documentServices.shareDocument(documentId, listUserShare)
    if(result.code === '200') {
      reupdateSearch(documentId)
      alertSuccess('Chia sẻ thành công!')
    }
    setShowShare(false)
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
    // console.log({ docId: documentId });
    if (data.data) {
      setLockInfo(data.data);
    }
  };

  const getSubscribeInfo = async () => {
    const data = await documentServices.getListSubscriber(documentId)
    setSubscribeInfo(data.data)
  }

  const getContent = async () => {
    const data = await documentServices.getContent(documentId)
    setContent(data.data)
  }

  useEffect(() => {
    getLockData();
    getSubscribeInfo();
    checkPermission();
    getContent();
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
    return {
      downloadbtn, previewbtn, updatebtn, renamebtn, 
      addkeywordbtn, deletebtn, securitybtn
    }
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

  const alertCheckUpdateFile = (text) => {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }

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
      type = "application/pdf"
    }
    // const data = await documentServices.getContent(documentId)
    // const tmp = data.data
    const blob = base64ToBlob(content, type)
    setUrlPreview(URL.createObjectURL(blob))
  }

  // console.log({url: urlPreview});

  const judge = () => {
    let isPdf = false, isImg = false, isWord = false
    const img = ['png', 'jpg', 'jpeg', 'PNG', 'JPEG', 'JPG']
    if(format === 'pdf') {
      isPdf = true
    } else if(img.includes(format)) {
      isImg = true
    } else {
      isWord = true
    }
    return {
      isPdf, isImg, isWord
    }
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
          <Modal.Title className="h6">Đổi tên</Modal.Title>
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
                <thead>
                  <tr>
                    <td>Danh sách</td>
                  </tr>
                </thead>
                <tbody>
                  {listUser.map((user, index) => (
                    <tr
                      key={index}
                      onDoubleClick={() => {
                        handleGetUser(user.userName);
                      }}
                      // className={`tr ${rowActive === user.userName ? 'active' : ''}`}
                    >
                      <td className="border-0">{user.userName}</td>
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
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <td>Người dùng được chia sẻ</td>
                  </tr>
                </thead>
                <tbody>
                  {listUserShare.length > 0 ? (
                    listUserShare.map((username, index) => (
                      <tr key={index}>
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
          {judge().isPdf == true && <Viewer fileUrl={urlPreview} />}
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

export default OptionSearch;
