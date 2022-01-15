import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import moment from "moment";
import swal from 'sweetalert2';
import Swal from 'sweetalert2'

import Comment from "./Comment";
import commentServices from "../../../../services/comment.services";
import "./comment.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

const Comments = ({ currentUserId, versionId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === ""
  );

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
      );

  const addComment = async (text, parentId) => {

    const parentid = parentId ? parentId : ""

    await commentServices.createCommentApi(versionId, text, parentid).then((comment) => {
        console.log({cmt: comment});
      setBackendComments([comment.data, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = async (text, commentId) => {
    const updateDTO = {
      parentId: null,
	    versionId: null,
	    text: text
    }
    await commentServices.updateCommentApi(updateDTO, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, text: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  // const deleteComment = async (commentId) => {
  //   if (window.confirm("Are you sure you want to remove comment?")) {
  //     await commentServices.deleteCommentApi(commentId).then(() => {
  //       const updatedBackendComments = backendComments.filter(
  //         (backendComment) => backendComment.id !== commentId
  //       );
  //       setBackendComments(updatedBackendComments);
  //     });
  //   }
  // };

  const deleteComment = (commentId) => {
    Swal.fire({
      title: 'Bạn có chắc không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nó!'
    }).then(async (result) =>  {
      if (result.isConfirmed) {
        Swal.fire(
          'Đã xóa!',
          'Nhận xét này đã bị xóa.',
          'success'
        )

        await commentServices.deleteCommentApi(commentId).then(() => {
          const updatedBackendComments = backendComments.filter(
            (backendComment) => backendComment.id !== commentId
          );
          setBackendComments(updatedBackendComments);
        });
      }
    })
  }

  useEffect(() => {
    initData();
  }, [versionId]);

  const initData = async () => {
    var rs;
    rs = await commentServices.getListCommentOfVersion(versionId)
    setBackendComments(rs.data);
  };
  // console.log("comment", rootComments);

  const Swal = require('sweetalert2')

  return (
    <div className="comments">
      <h5>
        <FontAwesomeIcon icon={faCommentAlt} style={{ paddingRight: 5 }} />
        Nhận xét
      </h5>
      <div>Viết nhận xét</div>
      <CommentForm submitLabel="Gửi" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
