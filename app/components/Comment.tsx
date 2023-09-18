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
      <div className={CommentCss.upperContainer}>
				<div>
        <span>Name</span>
        <span> - at {comment.timestamp}</span>
				</div>
				<div>
				<button onClick={() => deleteComment(index)}>Delete</button>
				</div>
				
      </div>
      <span>{comment.text}</span>
			
    </div>
		
		</div>
  );
}

export default Comment;