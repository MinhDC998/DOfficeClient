import React, { useState, useEffect, useRef, useCallback } from "react";
import documentServices from "../../../../services/document.services";

import { Document, Page } from 'react-pdf';
import SinglePage from "../pdf/singlepage";
import AllPages from "../pdf/allpages";

function TabPreview({ encodedString }) {

  const [url, setUrl] = useState('')

  const base64ToBlob = () => {
    var bString = window.atob(encodedString);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
        var ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return new Blob([bytes], {type: "application/pdf"});
  };

  useEffect(() => {
    const tmp = base64ToBlob()
    setUrl(URL.createObjectURL(tmp))
  }, [])

  return (
    <div>
      <hr />
      <div>
        <SinglePage pdf={url} />
      </div>

      <hr />
    </div>
  );
}

export default TabPreview;
