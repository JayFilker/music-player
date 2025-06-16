import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { CountDemo, CurrentSongList, Playing } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import './index.less'

interface Props {
    track?: any
    index: number
}

export function TrackItem(props: Props) {
    const { track, index } = props
    const [play, setPlay] = useAtom(Playing)
    useEffect(() => {
        setPlay((prev) => {
            const newPlay = [...prev]
            newPlay[index] = false
            return newPlay
        })
    }, [])
    // console.log(play[index])
    const [focus, setFocus] = useState(false)
    const [, setCurrentSong] = useAtom<{ items: Array<any>, imgPic: string }>(CurrentSongList)
    const [, setCount] = useAtom(CountDemo)
    // console.log(track)
    return (
        <div
            className={`track tracklist ${focus ? 'focus' : ''} ${play[index] ? 'track-playing' : ''}`}
            // dblclick={() => {
            //     return console.log(1)
            // }}
            onDoubleClick={() => {
                setCurrentSong({ items: [track], imgPic: track.album.images[0].url })
                setCount(0)
                setPlay((prev) => {
                    const newPlay = prev.map(() => {
                        return false
                    })
                    newPlay[index] = true
                    return newPlay
                })
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
            {/* v-if="!isAlbum" */}
            {/* :src="imgUrl" */}
            {/* loading="lazy" */}
            {/* :class="{ hover: focus }" */}
            {/* @click="goToAlbum" */}
            <div className="no" style={{ display: 'none' }}>
                <button>
                    {/*    <svg-icon */}
                    {/* icon-class="play" */}
                    {/* style="height: 14px; width: 14px" */}
                    {/*    ></svg-icon> */}
                </button>
                <span>55</span>
                <button>
                    {/* <svg-icon */}
                    {/*    icon-class="volume" */}
                    {/*    style="height: 16px; width: 16px" */}
                    {/* ></svg-icon> */}
                </button>
            </div>
            <div className="title-and-artist">
                <div className="container">
                    <div className="title">
                        {track.name}
                        <span>
                            66
                        </span>
                        <span className="featured">
                            {/*  <ArtistsInLine */}
                            {/*      :artists="track.ar" */}
                            {/*    :exclude="$parent.albumObject.artist.name" */}
                            {/*    prefix="-" */}
                            {/* /> */}
                        </span>
                        <span
                            className="explicit-symbol"
                        >
                            {/* <ExplicitSymbol /> */}
                        </span>
                    </div>
                    <div className="artist">

                        {/* <span */}
                        {/*    className="explicit-symbol before-artist" */}
                        {/* > */}
                        {/*    <ExplicitSymbol :size="15" */}
                        {/* /> */}
                        {/* </span> */}
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
                        {/* <ArtistsInLine :artists="artists" /> */}
                    </div>
                </div>
                <div></div>
            </div>

            <div className="album" style={{ display: 'none' }}>
                {/*    <router-link v-if="album && album.id" :to="`/album/${album.id}`">{{ */}
                {/*    album.name */}
                {/* }}</router-link> */}
                <div></div>
            </div>

            <div className="actions" style={{ display: 'none' }}>
                <button>
                    {/*    <svg-icon */}
                    {/*        icon-class="heart" */}
                    {/*    :style="{ */}
                    {/*    visibility: focus && !isLiked ? 'visible' : 'hidden', */}
                    {/* }" */}
                    {/*    ></svg-icon> */}
                    {/* <svg-icon v-show="isLiked" icon-class="heart-solid"></svg-icon> */}
                </button>
            </div>
            <div className="time" style={{ display: 'none' }}>
                66
            </div>

            <div className="count" style={{ display: 'none' }}>11</div>
        </div>
    )
}
