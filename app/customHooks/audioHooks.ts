"use client"

import { request } from "http";
import { AudioContext } from "../context/AudioContext";

import React, {useState, useEffect, useRef, useContext} from "react"

import WaveSurfer from "wavesurfer.js"

interface Song {
	id: number;
	versions: {url: string}[];
}

interface UseAudioPlayerReturnType {
isPlaying: boolean;
duration: number;
currentTime: number;
isLoaded: boolean;
audioPlayerRef: React.RefObject<HTMLDivElement>;
wavesurferRef: React.RefObject<WaveSurfer>
timeTravel: (newTime: number) => void;
calculateTime: (secs: number) => string;
handlePlayPause: () => void;
changeRange: () => void;
setDuration: React.Dispatch<React.SetStateAction<number>>;
setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
}

const useAudioPlayer = (song: Song, version: number, label: string): UseAudioPlayerReturnType => {
const uniqueID: string = `${song.id}-${version}`

const [isPlaying, setIsPlaying] = useState(false)
const [duration, setDuration] = useState(0)
const [currentTime, setCurrentTime] = useState(0)
const [isLoaded, setIsLoaded] = useState(false)
const { currentID, setCurrentID } = useContext(AudioContext)??{}; 

const audioPlayerRef = useRef<HTMLDivElement>(null)
const animationRef = useRef<number | null> (null)
const wavesurferRef = useRef<WaveSurfer | null >(null)

useEffect (()=> {
	const container = document.querySelector(
`#wavesurfer-container${song.id}${label}${version}`
	);

	const wavesurfer = WaveSurfer.create({
		container: container as HTMLElement,
		waveColor: "#8C8C8C",
		progressColor: "#4C47F6",
		barWidth: 2, 
		barHeight: 0.75,
		height: 80,
	})

	console.log("WaveSurfer instance created");

wavesurfer.load(song.versions[version].url)

//check if waveform is ready + load duration

wavesurfer.on("ready", ()=> {

	console.log("Waveform is ready.");

	setIsLoaded(true)

	const seconds = Math.floor(wavesurfer.getDuration())
	setDuration(Number(seconds))
})

//upadte current time

wavesurfer.on("audioprocess",()=> {
	setCurrentTime(wavesurfer.getCurrentTime())
})

//play and set duration on waveform click

const waveformClickHandler = (e: MouseEvent) => {
	const bounding = (e.target as HTMLElement).getBoundingClientRect()
	const x = (e.clientX - bounding.left) / bounding.width;

	wavesurfer.seekTo(x)

	setCurrentTime(x * wavesurfer.getDuration())

	if (!isPlaying) {
		handlePlayPause()
	}
}

if (audioPlayerRef.current) {
	audioPlayerRef.current.addEventListener("click", waveformClickHandler)
}

(wavesurfer as any).on("error", (e: any) => {
	console.error(e)
})

// set wavesurferRef

wavesurferRef.current = wavesurfer

//clean up

return () => {
	if (audioPlayerRef.current) {
		audioPlayerRef.current.removeEventListener("click", waveformClickHandler)
	}

	wavesurfer.destroy();
}

},[song.id])

//when song ends, reset to begining

useEffect(()=> {
	if (duration > 0 && currentTime === duration && isLoaded) {
		handlePlayPause()
		timeTravel(0)
	}
}, [currentTime, duration, isLoaded])

const calculateTime = (secs: number) => {
	const minutes = Math.floor(secs / 60);
	const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const seconds = Math.floor(secs % 60);
	const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
	return `${returnedMinutes}:${returnedSeconds}`;
};

const handlePlayPause = () => {
	//if another player is playing, stop it
if (currentID !== null && currentID !== uniqueID) {
	setIsPlaying(false);
	wavesurferRef.current?.pause();
	cancelAnimationFrame(animationRef.current!) 
}

 // Update the play/pause status for this player.
 const prevValue = isPlaying;
 setIsPlaying(!prevValue)

 
 if (!prevValue) {
	//play this player
wavesurferRef.current?.play();
animationRef.current = requestAnimationFrame(whilePlaying);

// Mark this as the current playing audio
if (setCurrentID) {
	setCurrentID(uniqueID)
}
 } else {
	//pause this player
	wavesurferRef.current?.pause();
	cancelAnimationFrame(animationRef.current!)

	// Mark that no audio is currently playing
	if (setCurrentID) {
		setCurrentID(null)
	}
 }
}

// pause the current audio player when current id changes

useEffect (() => {
	if (currentID !== uniqueID && isPlaying) {
		setIsPlaying(false);
		wavesurferRef.current?.pause();
		cancelAnimationFrame(animationRef.current!)
	}
}, [currentID, isPlaying, song.id])

const whilePlaying = () => {
setCurrentTime(Math.floor(Number(wavesurferRef.current?.getCurrentTime())))

animationRef.current = requestAnimationFrame(whilePlaying);
}

const changeRange = () => {
	setCurrentTime(wavesurferRef.current!.getCurrentTime())
}

const timeTravel = (newTime: number) => {
	wavesurferRef.current?.seekTo(newTime / wavesurferRef.current.getDuration())
	changeRange()
}

	return {
		isPlaying,
		isLoaded,
		duration,
		currentTime,
		audioPlayerRef,
		wavesurferRef,
		timeTravel,
		calculateTime,
		handlePlayPause,
		changeRange,
		setDuration,
		setCurrentTime
	}
}

export {useAudioPlayer}