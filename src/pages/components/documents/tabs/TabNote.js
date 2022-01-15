import React, { useState, useEffect } from 'react';
import documentServices from '../../../../services/document.services'

function TabNote({ docId, updateUI }) {
  
  const [notes, setNotes] = useState([])

  const getNotes = async () => {
    const data = await documentServices.getListNote(docId)
    setNotes(data.data)
  }

  useEffect(() => {
    getNotes()
  }, [docId, updateUI])

  // console.log(notes)

  return (
    <>
      {notes.length > 0 ? notes.map((note, index) => (
        <div key={index} style={{ paddingBottom:5 }}>
          <label>
            <span>
              <i
                style={{ marginRight: 10 }}
                className="fa fa-sticky-note mt-1"
                aria-hidden="true"
              ></i>
            </span>
            {note.date}
            <span style={{ marginLeft:10 }}>{note.text}</span>
          </label>
        </div>
      )) : 
      <p>Hiện tại chưa có ghi chú nào</p>
      }
    </>
  );
}

export default TabNote;
