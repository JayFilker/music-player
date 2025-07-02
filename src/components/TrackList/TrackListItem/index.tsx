import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import eventBus from '../../../utils/eventBus.ts'
import { SvgIcon } from '../../SvgIcon'
import { TItemSvgList } from './TItemSvgList.tsx'
import './index.less'

export function TrackListItem(track: any) {
    const { content, playingTrack, index, setPlayingTrack, songList, setFirst } = track
    const [searchParams] = useSearchParams()
    const [showIcon, setShowIcon] = useState(false)
    const [showRow, setShowRow] = useState(false)
    const msToMinutes = (ms: number): string => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
    return (
        <div
            className={`track ${searchParams.get('type') === 'playlists' ? 'playlist' : 'album'} ${showRow ? 'focus' : ''} ${playingTrack[index] ? 'playing' : ''}`}
            onMouseEnter={() => {
                setShowIcon(true)
                setShowRow(true)
            }}
            onMouseLeave={() => {
                setShowIcon(false)
                setShowRow(false)
            }}
            style={{ margin: '0 0' }}
            onDoubleClick={(e) => {
                const demo = Array.from({ length: playingTrack.length }).fill(false)
                demo[index] = true
                setPlayingTrack(demo)
                eventBus.emit('playList-playing', {
                    e,
                    id: songList?.id,
                    img: searchParams.get('type') === 'playlists' ? content?.track?.album.images[0].url : songList?.images[0].url,
                    count: index,
                })
                setFirst(false)
            }}
        >
            {searchParams.get('type') === 'playlists'
                ? (
                        <img
                            src={content?.track?.album?.images[0]?.url}
                            style={{ display: searchParams.get('type') === 'playlists' ? '' : 'none' }}
                            loading="lazy"
                            alt=""
                        />
                    )
                : ''}
            <div
                className="no"
                style={{ display: searchParams.get('type') === 'playlists' ? 'none' : '' }}
            >
                <button
                    style={
                        {
                            display: showRow && !playingTrack[index] ? '' : 'none',
                        }
                    }
                >
                    <SvgIcon>
                        {TItemSvgList.stopButton}
                    </SvgIcon>
                </button>
                <span
                    style={
                        {
                            display: !playingTrack[index] && !showRow ? '' : 'none',
                        }
                    }
                >
                    {index + 1}
                </span>
                <button
                    style={
                        {
                            display: playingTrack[index] ? '' : 'none',
                        }
                    }
                >
                    <SvgIcon>
                        {TItemSvgList.playingIcon}
                    </SvgIcon>
                </button>
            </div>
            <div className="title-and-artist">
                <div className="container" style={{ alignItems: 'normal' }}>
                    <div className="title">
                        {searchParams.get('type') === 'playlists' ? content?.track?.name : content?.name}
                        {searchParams.get('type') !== 'playlists'
                            ? (
                                    <span className="featured">
                                        <span className="artist-in-line">
                                            -
                                            {content?.artists?.map((track: any, index: number) => (

                                                <span>
                                                    <a href={`/artist?id=${track.id}`}>
                                                        {track.name}
                                                    </a>
                                                    {index < content?.artists.length - 1
                                                        && <span className="separator">，</span>}
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                )
                            : ''}
                        <span
                            className="explicit-symbol"
                        >
                        </span>

                    </div>
                    {searchParams.get('type') === 'playlists'
                        ? (
                                <div v-if="!isAlbum" className="artist">
                                    <span
                                        className="explicit-symbol before-artist"
                                        style={{ opacity: '0.88' }}
                                    >
                                        {/*    <ExplicitSymbol :size="15" */}
                                        {/* /> */}
                                        <span className="artist-in-line">
                                            {' '}
                                            {content?.track?.artists.map((track: any, index: number) => (

                                                <span>
                                                    <a href={`/artist?id=${track.id}`}>
                                                        {track.name}
                                                    </a>
                                                    {index < content?.track?.artists.length - 1
                                                        && <span className="separator">，</span>}
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                </div>
                            )
                        : ''}
                </div>
                <div></div>
            </div>

            {
                searchParams.get('type') === 'playlists'
                    ? (
                            <div
                                v-if="showAlbumName"
                                className="album"
                                style={{ display: searchParams.get('type') === 'playlists' ? '' : 'none' }}
                            >
                                <Link
                                    to={`/playsList?id=${content?.track?.album?.id}&type=albums`}
                                >
                                    {content?.track?.album?.name}
                                </Link>
                                <div></div>
                            </div>
                        )
                    : ''
            }
            <div className="actions">
                <button style={{ display: showIcon ? 'block' : 'none' }}>
                    <SvgIcon>
                        {TItemSvgList.like}
                    </SvgIcon>
                </button>
            </div>
            <div className="time">
                {searchParams.get('type') === 'playlists' ? msToMinutes(content?.track?.duration_ms) : msToMinutes(content?.duration_ms)}
            </div>
        </div>
    )
}
