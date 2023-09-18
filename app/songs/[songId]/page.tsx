import AudioPlayerStripped from "@/app/components/AudioPlayerStripped";
import Songs from "../../../public/songs.json"

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
			<div>
				{selectedItem.versions.map((version: VersionType, index: number) => {
					return (
						<AudioPlayerStripped key={index} song={selectedItem} version = {index}/>
					)
				})}
			</div>
		</AudioProvider>
	)
}

export default SongPage;

