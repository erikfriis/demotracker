
import React from "react";

import SongFooterCss from "./Footer.module.css"

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

const SongFooter: React.FC<SongHeaderProps> = ({song}) => {
	return (
		<div className={SongFooterCss.container}>
			<div className={SongFooterCss.text}>
			 <div className={SongFooterCss.line}></div>
			 <div className={SongFooterCss.textContent}>{song.title}</div>
<div className={SongFooterCss.line}></div>
</div>
		</div>
	)
}

export default SongFooter