"use client"

import {useState, useEffect} from "react"

import Comment from "./Comment"

import AudioPlayerStrippedCss from "./AudioPlayerStripped.module.css"

import { useAudioPlayer } from "../customHooks/audioHooks"


interface VersionsType {
	v: string;
	url: string;
}

interface SongType {
	id: number;
	versions: VersionsType[];
}

interface AudioPlayerStrippedProps {
	song: SongType;
	version: number;
}

const AudioPlayerStripped: React.FC<AudioPlayerStrippedProps> = ({song, version}) => {
const label = "songPage"

const {isPlaying, duration, currentTime, audioPlayerRef, calculateTime, handlePlayPause, timeTravel} = useAudioPlayer(song, version, label);

const [comments, setComments] = useState <{text: string; timestamp: number}[]>([])
const [newComment, setNewComment] = useState("");

useEffect(() => {
	const storedComments = localStorage.getItem(`comments-${song.id}${version}`)
	if (storedComments) {
		setComments(JSON.parse(storedComments))
	}
}, [song.id])

const addComment = () => {
	const updatedComments = [
		...comments,
		{
			text: newComment,
			timestamp: currentTime
		}
	]
	setComments(updatedComments);
	localStorage.setItem(`comments-${song.id}${version}`, JSON.stringify(updatedComments));
	setNewComment("");
 };

 const deleteComment = (index: number) => {
	const updatedComments = comments.filter((_, i) => i !== index);
	setComments(updatedComments);
	localStorage.setItem(
		`comments-${song.id}${version}`, JSON.stringify(updatedComments)
	);
 }

 const jumpToTimestamp = (timestamp: number) => {
	handlePlayPause(); // First pause if needed
	timeTravel(timestamp); // Define in your custom hook
	handlePlayPause()
 }
return(<div className={AudioPlayerStrippedCss.audioPlayerWrapper}>
<div className={AudioPlayerStrippedCss.flexContainer}>
<div className={AudioPlayerStrippedCss.innerFlexContainer}>
<div className={AudioPlayerStrippedCss.topContainer}>
<button onClick={() => handlePlayPause()}
			className={AudioPlayerStrippedCss.playPauseBtn}
			aria-label="Play or Pause">
				{isPlaying ? "Stop" : "Play"}
			</button>
	</div>
	<div className={AudioPlayerStrippedCss.waveformContainer}>
			<div className={AudioPlayerStrippedCss.duration}>
				{calculateTime(currentTime)}
			</div>

				<div id={`wavesurfer-container${song.id}${label}${version}`}
				className={AudioPlayerStrippedCss.waveform} ref={audioPlayerRef}></div>

				<div className={AudioPlayerStrippedCss.duration}>
					{duration && calculateTime(duration)}
				</div>

		</div>
</div>
<div>
	<input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}
	placeholder="Add a comment"/>
	<button onClick={addComment}>Comment</button>
</div>
<div>
	{comments.map((comment, index) => (
		<Comment key={index} comment={comment} onCommentClick={jumpToTimestamp} deleteComment={deleteComment} index={index}/>
	))}
</div>
</div>
</div>)
}

export default AudioPlayerStripped

