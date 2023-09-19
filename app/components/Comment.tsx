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


const formatTime = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
};

const Comment: React.FC<CommentProps> = ({ comment, onCommentClick, deleteComment,index }) => {
  return (
		
    <div className={CommentCss.container} >
      <div className={CommentCss.upperContainer}>
				<div className={CommentCss.infoContainer} onClick={() => onCommentClick(comment.timestamp)}>
        <span>Note</span>
        <span> at {formatTime(comment.timestamp)}</span>
				</div>
				<div className={CommentCss.deleteBtnContainer}>
				<button className={CommentCss.deleteBtn} onClick={() => deleteComment(index)}><img src={"/assets/trashicon.svg"}/></button>
				
				</div>
				
      </div>
			<div className={CommentCss.commentText}>
      <span  onClick={() => onCommentClick(comment.timestamp)}>{comment.text}</span>
			</div>
    </div>
		
		
  );
}

export default Comment;