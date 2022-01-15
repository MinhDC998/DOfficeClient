import React, { useState, useEffect } from "react";
import Optional from "./Optional";
import documentServices from "../../../services/document.services";
import OptionSearch from "./OptionSearch";
import './maincontent.scss';

const TableRow = (props) => {
    const { docId, name, size, createdTime, is_lock, author, version, updateInfo, reupdateSearch, reupdateDel } = props;

    // const [updateUI, setUpdateUI] = useState(false)
    // const [active, setActive] = useState('')
    // const [showModalDetail, setShowModalDetail] = useState(false)

    return (
      <>
        <tr
          style={{ cursor: "pointer" }}
          className={`
            ${is_lock === 1 ? "table-warning lock-style" : ""}
          `}
        >
          <td className="border-0" style={{ width: "40%" }}>
            {name}
          </td>
          <td
            className="fw-bold border-0"
            style={{ width: "5%", textAlign: "center" }}
          >
            {size}
          </td>
          <td
            className="border-0"
            style={{ width: "20%", textAlign: "center" }}
          >
            {createdTime}
          </td>
          <td
            className="border-0"
            style={{ width: "15%", textAlign: "center" }}
          >
            {author}
          </td>
          <td
            className="border-0"
            style={{ width: "15%", textAlign: "center" }}
          >
            {version}
          </td>
          <td className="border-0" style={{ width: "5%", textAlign: "center" }}>
            <OptionSearch
              documentId={docId}
              nameDocument={name}
              author={author}
              reupdateDel={reupdateDel}
              reupdateSearch={reupdateSearch}
              updateInfo={updateInfo}
              is_lock={is_lock}
            />
          </td>
        </tr>

      </>
    );
};

export default TableRow;