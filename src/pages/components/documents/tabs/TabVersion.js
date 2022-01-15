import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'

import versionActions from "../../../../actions/version.actions";
import documentActions from "../../../../actions/document.actions";
import categoryActions from "../../../../actions/category.actions";
import documentServices from "../../../../services/document.services";

function TabVersion({ documentId, versionName, update, updateUI }) {

  const dispatch = useDispatch();
  
  const Swal = require('sweetalert2')

  // const [versions, setVersions] = useState([])

  // const getVersions = async () => {
  //   const data = await documentServices.getVersionsOfDocument(documentId)
  //   // console.log(data);
  //   setVersions(data.data)
  // }

  useEffect(() => {
    // getVersions()
    dispatch(versionActions.getVersionOfDocument(documentId))
  }, [documentId, updateUI])

  const {versions} = useSelector(state => state.version)

  const handleRestore = async (version) => {
    const result = await documentServices.restoreVersion(
      documentId,
      version.name
    );
    if (result.code === "200") {
      update(version);
      alertSuccess('Khôi phục phiên bản thành công!')
    }
  };

  const convertSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

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

  return (
    <>
      <table className="table border-0">
        <thead className="thead-light">
          <tr>
            <th style={{ textAlign: "center"}}>Phiên bản</th>
            <th style={{ textAlign: "center"}}>Ngày tạo</th>
            <th style={{ textAlign: "center"}}>Tác giả</th>
            <th style={{ textAlign: "center"}}>Kích thước</th>
            <th style={{ textAlign: "center"}}>...</th>
          </tr>
        </thead>
        <tbody>
          {versions.map((version, index) => (
            <tr key={index} style={{ textAlign: "center"}}>
              <td>{version.name}</td>
              <td>{version.created}</td>
              <td>{version.author}</td>
              <td>{convertSize(version.size)}</td>
              <td>
                {version.name !== versionName && (
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      handleRestore(version);
                    }}
                  >
                    Khôi phục
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TabVersion;
