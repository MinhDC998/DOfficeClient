import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import moment from "moment";

import Comment from "./Comment";
import commentsServices from "../../../services/comment.services";
import './comment.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
const Comments = ({ comments, currentUserId, type, entityId }) => {

    const [cmts, setCmts] = useState(comments);
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === ''
    );
    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                   moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
            );
    const addComment = async (text, parentId) => {

        const commentDTO = {
            id: null,
            parentId: parentId ? parentId : "",
            body: text,
            userId: currentUserId,
            entityId: entityId,
            type: type,
            userName: null,
            createdAt: null,

        }

        await commentsServices.createCommentApi(commentDTO).then((comment) => {
          
            setBackendComments([comment.data, ...backendComments]);
            setActiveComment(null);
        });
    };

    const updateComment = async (text, commentId) => {

        const commentDTO = {
            id: null,
            parentId: null,
            body: text,
            userId: null,
            entityId: null,
            type: null,
            userName: null,
            createdAt: null,
        

        }
        await commentsServices.updateCommentApi(commentDTO, commentId).then(() => {
            const updatedBackendComments = backendComments.map((backendComment) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    };
    const deleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to remove comment?")) {
            await commentsServices.deleteCommentApi(commentId).then(() => {
                 const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(updatedBackendComments);
            });
        }
    };

    useEffect(() => {
        initData()


    }, []);

    const initData = async () => {
        var rs;
        if (type == 'work')
            rs = await commentsServices.getWorkComment(entityId)
        if (type == 'task')
            rs = await commentsServices.getTaskComment(entityId)

        setBackendComments(rs.data)

    }
    console.log("comment", rootComments)

    return (
        <div className="comments">
            <h5 >
                <FontAwesomeIcon icon={faCommentAlt} style={{paddingRight:5}}/>
                Nhận xét</h5>
            <div >Viết nhận xét</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
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
