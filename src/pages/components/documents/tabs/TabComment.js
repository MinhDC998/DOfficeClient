import React, { useState } from 'react';
import commentServices from '../../../../services/comment.services'

function TabComment({ versionId, rerender }) {
  
  const [text, setText] = useState('')

  const handleSubmit = async () => {
    await commentServices.addNewComment(versionId, text)
    // console.log(result)
    setText('')
    rerender()
  }

  const author = localStorage.getItem('username')
  // console.log(localStorage.getItem('username'))

  return (
    <>
      <div className="row d-flex mb-3">
        <div className="col-sm-1 mt-4" style={{ width: 50 }}>
          <span>
            <i className="fa fa-user fa-3x" aria-hidden="true"></i>
          </span>
        </div>
        <div className="col">
          <label className="p-0">{author}</label>
          <div className="mb-2">
            <textarea 
              className="form-control" 
              rows="2"
              value={text}
              onChange={(e) => setText(e.target.value)}
            >
            </textarea>
          </div>
          <button 
            type="button" 
            className="btn btn-light float-end"
            onClick={handleSubmit}  
          >
            Nhận xét
          </button>
        </div>
      </div>
    </>
  );
}

export default TabComment;
