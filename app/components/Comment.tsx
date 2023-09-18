import React from 'react';
import CommentCss from "./Comment.module.css";

interface CommentProps {
	index: number
  comment: {
    text: string;
    timestamp: number;
  };
  onCommentClick: (timestamp: number) => void;
	deleteComment: (index: number) => void;
	
}

const Comment: React.FC<CommentProps> = ({ comment, onCommentClick, deleteComment,index }) => {
  return (
		<div>
    <div
      className={CommentCss.container}
      onClick={() => onCommentClick(comment.timestamp)}
    >
      <div>
        <span>Name</span>
        <span> - at {comment.timestamp}</span>
      </div>
      <span>{comment.text}</span>
			
    </div>
		<button onClick={() => deleteComment(index)}>Delete</button>
		</div>
  );
}

export default Comment;