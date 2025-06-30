import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { CountDemo, CurrentSongList, Playing } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import './index.less'

interface Props {
    track?: any
    index: number
    tracks?: any
}

export function TrackItem(props: Props) {
    const { track, index, tracks } = props
    const [play, setPlay] = useAtom(Playing)
    const [focus, setFocus] = useState(false)
    const [, setCurrentSong] = useAtom<{ items: Array<any>, imgPic: string }>(CurrentSongList)
    const [count, setCount] = useAtom(CountDemo)
    useEffect(() => {
        setPlay((prev) => {
            const newPlay = prev.map(() => {
                return false
            })
            newPlay[count] = true
            return newPlay
        })
    }, [count])

    return (
        <div
            className={`track tracklist ${focus ? 'focus' : ''} ${play[index] ? 'track-playing' : ''}`}
            onDoubleClick={() => {
                setCurrentSong({ items: [...tracks], imgPic: track.album.images[0].url })
                setCount(index)
                // @ts-ignore
                eventBus.emit('play-track', track.uri)
            }}
            onMouseEnter={() => {
                setFocus(true)
            }}
            onMouseLeave={() => {
                setFocus(false)
            }}
        >
            <img src={track.album.images[0].url} alt="album" className={focus ? 'hover' : ''} />
            <div className="no" style={{ display: 'none' }}>
                <button>
                </button>
                <span></span>
                <button>
                </button>
            </div>
            <div className="title-and-artist">
                <div className="container">
                    <div className="title">
                        {track.name}
                        <span>
                        </span>
                        <span className="featured">
                        </span>
                        <span className="explicit-symbol">
                        </span>
                    </div>
                    <div className="artist">
                        <span className="artist-in-line">
                            {track.artists.map((artist: any, index: number) => {
                                return (
                                    <>
                                        <a key={index} href={`/artist?id=${artist.id}`}>
                                            {artist.name}

                                        </a>
                                        {index < track.artists.length - 1 ? ', ' : ''}
                                    </>
                                )
                            })}
                        </span>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="album" style={{ display: 'none' }}>
                <div></div>
            </div>
            <div className="actions" style={{ display: 'none' }}>
                <button>
                </button>
            </div>
            <div className="time" style={{ display: 'none' }}></div>
            <div className="count" style={{ display: 'none' }}></div>
        </div>
    )
}
