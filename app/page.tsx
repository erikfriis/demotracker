
import styles from './page.module.css'
import React from 'react'
import PageCss from "./page.module.css"

import songs from "../public/songs.json"
import AudioPlayer from './components/AudioPlayer'

import { AudioProvider } from './context/AudioContext'

interface Version {
  v: string;
  url: string;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  artwork: string;
  versions: Version[]
}

const Home: React.FC = () => {

if (!songs.length) {
  return <p>No songs was found</p>
}

  return (
    <AudioProvider>
    <main className={styles.main}>
     <div className={PageCss.songContainer}>
      {songs.map((song: Song) => {
        return (
          <AudioPlayer
          key={song.id}
          song={song}
          />
        )
      })}
     </div>
    </main>
    </AudioProvider>
  )
}

export default Home
