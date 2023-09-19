import React from "react"

import SongHeaderCss from "./SongHeader.module.css"

interface VersionType {
	v: string;
	url: string;
}

interface Song {
	id: number;
  title: string;
  artist: string;
  artwork: string;
  versions: VersionType[];
}

interface SongHeaderProps {
	song: Song;
}

const SongHeader: React.FC<SongHeaderProps> = ({song}) => {
	return(
		<div className={SongHeaderCss.headerWrapper}>
			<h1 className={SongHeaderCss.logo}>{song.title}</h1>
			<p className={SongHeaderCss.text}>{song.artist}</p>
		</div>
	)
}

export default SongHeader