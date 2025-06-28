import { useAtom } from 'jotai/index'
import { TrackListDemo } from '../../components/TrackList/TrackListDemo'
import { CountDemo, CurrentSongList, PlayingTrack } from '../../store/store.ts'
import './index.less'

export default function NextTracks() {
    const [count] = useAtom(CountDemo)
    const [currentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [playingTrack, setPlayingTrack] = useAtom(PlayingTrack)
    return (
        <div className="next-tracks">
            <h1>正在播放</h1>
            <TrackListDemo
                songList={currentSong}
                content={currentSong?.items?.[count]}
                playingTrack={playingTrack}
                index={count}
                setPlayingTrack={setPlayingTrack}
            >
            </TrackListDemo>
            {currentSong?.items?.length > 1
                ? (
                        <>
                            <h1>即将播放</h1>
                            <TrackListDemo
                                songList={currentSong}
                                content={currentSong?.items?.[count + 1]}
                                playingTrack={playingTrack}
                                index={count + 1}
                                setPlayingTrack={setPlayingTrack}
                            >
                            </TrackListDemo>
                        </>
                    )
                : ''}
        </div>
    )
}
