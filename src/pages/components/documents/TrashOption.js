import React, { useState } from 'react';
import { Modal, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import documentServices from '../../../services/document.services'
import Swal from 'sweetalert2'
import './option.scss'
import { useSelector } from 'react-redux';

function TrashOption({ document, reupdateDocument }) {

    const username = localStorage.getItem('username')
    const {user} = useSelector(state => state.authentication)
    // console.log({user: user, document: document});

    const Swal = require('sweetalert2')

    const handleRestore = async () => {
      const result = await documentServices.restoreDocument(document.id)
      if(result.code === '200') {
        reupdateDocument()
        alertSuccess('Khôi phục tài liệu thành công!')
      }
    }

    // need to test
    const checkPermissionPurgeDelete = () => {
      if(username === 'administrator' || document.userId === user.id) {
        return Swal.fire({
          title: 'Bạn có chắc muốn xóa hoàn toàn tài liệu này không?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xóa nó!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            const result = await documentServices.purgeDelete(document.id)
            if(result.code === '200') {
              reupdateDocument()
            }
    
            Swal.fire(
              'Đã xóa!',
              'success'
            )
          }
        })
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Bạn không có quyền xóa hoàn toàn tài liệu này!',
          showConfirmButton: false,
          timer: 2000
        })
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

    return (
      <>
        <Dropdown as={ButtonGroup} className="dropdown-style">
          <Dropdown.Toggle split variant="light" className="btn-sm">
            ...
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRestore}>
              Khôi phục
            </Dropdown.Item>
            <Dropdown.Item onClick={checkPermissionPurgeDelete}>
              Xóa vĩnh viễn
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
}

export default TrashOption;
