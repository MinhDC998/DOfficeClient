import React, { useState, useEffect, useCallback } from 'react';
import { Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';

import TableRow from "./TableRow";
import ModalUpload from './ModalUpload';
import MainContent from './MainContent'

import documentServices from '../../../services/document.services'
import MainContentProvider from './MainContentProvider';
import { useDispatch, useSelector } from 'react-redux';
import folderActions from '../../../actions/folder.actions'
import ModalAddCategory from './ModalAddCategory';

export default () => {
    const {user} = useSelector(state => state.authentication)

    return (
        <>
            <div className="d-block">
                <ModalUpload />
                { user.userName === 'administrator' &&
                  <div style={{ display:"inline-block", marginLeft:10 }}><ModalAddCategory /></div>
                }
                {/* <Button variant="secondary" className="my-3 m-lg-1">
                    <Link to={Routes.SearchDocument.path}> Tìm kiếm tài liệu </Link>
                </Button> */}
                
            </div>

            <MainContentProvider
            />
        </>
    )
}