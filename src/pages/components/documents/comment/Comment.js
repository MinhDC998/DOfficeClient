import React from "react";
import moment from "moment";

import CommentForm from "./CommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./comment.scss";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment && activeComment.id === comment.id && activeComment.type === "editing";
  const isReplying =
    activeComment && activeComment.id === comment.id && activeComment.type === "replying";

  const canDelete = currentUserId === comment.userId;
  const canReply = true;
  const canEdit = currentUserId === comment.userId;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = moment(comment.createdAt).format("DD/MM/YYYY HH:mm:ss");

  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <FontAwesomeIcon
          icon={faUserCircle}
          style={{
            marginRight: 5,
            marginTop: 2,
            fontSize: 45,
            color: "lightskyblue",
          }}
        />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div style={{ fontSize: "small" }}>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.text}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Sửa"
            hasCancelButton
            initialText={comment.text}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}

        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Trả lời
            </div>
          )}

          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Sửa
            </div>
          )}

          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Xóa
            </div>
          )}

        </div>

        {isReplying && (
          <CommentForm
            submitLabel="Phản hồi"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
