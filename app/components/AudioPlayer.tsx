"use client"

import React from "react";

import AudioPlayerCss from "./AudioPlayer.module.css"

import Link from "next/link";

import { useAudioPlayer } from "../customHooks/audioHooks";




interface Song {
	id: number;
	title: string;
	artist: string;
	artwork: string;
	versions: { v: string; url: string} [];
}

interface AudioPlayerProps {
	song: Song;
}

interface AudioPlayerHookReturnType {
isPlaying: boolean;
duration: number;
currentTime: number;
audioPlayerRef: React.RefObject<HTMLDivElement>;
isLoaded: boolean;
calculateTime: (secs: number) => string;
handlePlayPause: (shouldPlay: boolean) => void
}

const AudioPlayer: React.FC <AudioPlayerProps> = ({song}) => {

	const version = 0;
	const label = "mainPage";

	const {
isPlaying,
duration,
currentTime,
audioPlayerRef,
calculateTime,
handlePlayPause,
}: AudioPlayerHookReturnType = useAudioPlayer(song, version , label)

const copyToClipboard = async () => {
	const audioId = song.id;
	const baseUrl = window.location.origin // Gets the base URL
	const dynamicUrl = `${baseUrl}/songs/${audioId}`

	try {
		await navigator.clipboard.writeText(dynamicUrl)
	} catch	(error) {
		console.log("Failed to copy URL:", error)
	}

	
	
}


	return(
		<div className={AudioPlayerCss.audioPlayerWrapper}>
<div className={AudioPlayerCss.flexContainer}>
<div className={AudioPlayerCss.imgContainer}>
<img src={song.artwork} alt={`${song.artist} - ${song.title} cover art`}
className={AudioPlayerCss.img} />
</div>
<div className={AudioPlayerCss.innerFlexContainer}>
	<div className={AudioPlayerCss.topContainer}>
		<div className={AudioPlayerCss.leftUpperCorner}>
			<button onClick={() => handlePlayPause(!isPlaying)}
			className={AudioPlayerCss.playPauseBtn}
			aria-label="Play or Pause">
			{!isPlaying ? (<div className={AudioPlayerCss.playPauseWrapper}><img src="/assets/playicon.svg" className={AudioPlayerCss.playIcon}/></div>) :( <div className={AudioPlayerCss.playPauseWrapper}><img src="/assets/pauseicon.svg" className={AudioPlayerCss.pauseIcon}/></div>)}
			</button>
		
		<Link key={song.id} href={`/songs/${song.id}`}>
		<div className={AudioPlayerCss.textContainer}>
		<div className={AudioPlayerCss.smallerText}>{song?.artist}</div>
			<div className={AudioPlayerCss.biggerText}>{song?.title}</div>
			
		</div>
		</Link>
		</div>
		<div className={AudioPlayerCss.topRightCorner}>
		
				<div className={AudioPlayerCss.lowerContainer}>
	<button className={AudioPlayerCss.btns}onClick={() => {
	copyToClipboard()
	alert("Link copied to clipboard")
}}>Share</button>
</div>
{/* <div className={AudioPlayerCss.version}>
			{song.versions[0].v}
				</div> */}
				</div>

	</div>

	<div className={AudioPlayerCss.waveformContainer}>
		<div className={`${AudioPlayerCss.durationWrapper} ${AudioPlayerCss.durationCount}`}>
			<div className={AudioPlayerCss.duration}>
				{calculateTime(currentTime)}
			</div>
			</div>

				<div id={`wavesurfer-container${song.id}${label}${version}`}
				className={AudioPlayerCss.waveform} ref={audioPlayerRef}></div>
<div className={`${AudioPlayerCss.durationWrapper} ${AudioPlayerCss.durationCalc}`}>
				<div className={AudioPlayerCss.duration}>
					{duration && calculateTime(duration)}
				</div>
				</div>
		</div>
		
</div>





</div>

		</div>
	)
}

export default AudioPlayer

