import AudioPlayerStripped from "@/app/components/AudioPlayerStripped";
import Songs from "../../../public/songs.json"

import PageCss from "./page.module.css"

import SongHeader from "@/app/components/SongHeader";
import SongFooter from "@/app/components/SongFooter";

import { AudioProvider } from "@/app/context/AudioContext";

interface Params {
	songId: string;
}

interface SongPageProps {
	params: Params;
}

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

const SongPage: React.FC<SongPageProps> = ({params}) => {
const selectedItem = Songs.find((song: Song) => song.id === Number(params.songId));

if (!selectedItem) {
	return <p>Item not found</p>
}

	return (
		<AudioProvider>
			<div className={PageCss.mainWrapper}>
<SongHeader song={selectedItem}/>
<div className={PageCss.divider}>
		<h2>Versions</h2>
	</div>
			<div className={PageCss.songWrapper}>
				{selectedItem.versions.map((version: VersionType, index: number) => {
					return (
						<div className={PageCss.innerSongWrapper}>
						<AudioPlayerStripped key={index} song={selectedItem} version = {index}/>
						</div>
					)
				})}
			</div>
			<SongFooter song={selectedItem}/>
			</div>
		</AudioProvider>
		
	)
}

export default SongPage;

