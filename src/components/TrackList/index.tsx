import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { PlayingTrack } from '../../store/store.ts'
import { TrackListDemo } from './TrackListDemo'
import { TrackListItem } from './TrackListItem'
import './index.less'

export function TrackList(props: {
    songListInfo?: any
    tracks?: any[]
    itemKey?: string
    highlightPlayingTrack?: boolean
    extraContextMenuItem?: string[]
    songList?: any
    trackDemo?: any
}) {
    const { songListInfo, songList, trackDemo } = props
    const [playingTrack, setPlayingTrack] = useAtom(PlayingTrack)
    useEffect(() => {
        if (songListInfo) {
            setPlayingTrack(Array.from({ length: songListInfo?.items?.length }).fill(false))
        }
        else if (trackDemo) {
            setPlayingTrack(Array.from({ length: trackDemo?.items?.length }).fill(false))
        }
    }, [songListInfo, trackDemo])
    return (
        <div className="track-list">
            <div>
                {songListInfo && songListInfo.items?.map((track: any, index: number) => {
                    return (
                        <TrackListItem
                            key={index}
                            songList={songList}
                            content={track}
                            playingTrack={playingTrack}
                            index={index}
                            setPlayingTrack={setPlayingTrack}
                        >
                        </TrackListItem>
                    )
                })}
                {trackDemo && trackDemo.items?.map((track: any, index: number) => {
                    return (
                        <TrackListDemo
                            key={index}
                            content={track}
                            songList={trackDemo}
                            playingTrack={playingTrack}
                            index={index}
                            setPlayingTrack={setPlayingTrack}
                        >
                        </TrackListDemo>
                    )
                })}
            </div>
        </div>
    )
}
