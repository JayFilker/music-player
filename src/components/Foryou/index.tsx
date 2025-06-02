import { useAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import {
    BadLike,
    CountDemo,
    CurrentSongList,
    FirstPlay,
    IsPlayingDemo,
    IsPlayingDemoTwo,
    Link,
} from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import { ButtonIcon } from '../ButtonIcon'
import { SvgIcon } from '../SvgIcon'
import { Info } from './Info'
import { Left } from './Left'
import { svgList } from './svg.tsx'
import './index.less'

export function Foryou() {
    const [, setFirstPlay] = useAtom(FirstPlay)
    const [, setCount] = useAtom(CountDemo)
    const [, setBadLikeDemo] = useAtom(BadLike)
    const [, setIsPlaying] = useAtom(IsPlayingDemo)
    const [isPlayingTwo, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [linkDemo, setLinkDemo] = useAtom(Link)
    const [countL, setCountL] = useState(0)
    const [, setCurrentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [randomAlbum, setRandomAlbum] = useState<any>()
    const [randomAlbumSong, setRandomAlbumSong] = useState<any>()
    const randomGradient = useMemo(() =>
        `linear-gradient(to left top,
   rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}),
   rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}))`, [])
    function nextSong() {
        setFirstPlay(false)
        setLinkDemo(true)
        setIsPlayingTwo(true)
        setBadLikeDemo(true)
        setCurrentSong({
            ...randomAlbumSong,
            imgPic: randomAlbum?.albums?.items[0].images[0].url,
        })
        if (countL < randomAlbumSong?.items.length - 1) {
            // @ts-ignore
            eventBus.emit('play-track', randomAlbumSong?.items[countL + 1].uri)
            setCountL(countL + 1)
            setCount(countL + 1)
        }
        else {
            // @ts-ignore
            eventBus.emit('play-track', randomAlbumSong?.items[countL].uri)
            setCount(countL)
        }
    }
    const getRandomAlbumFirstTrack = async (play?: boolean) => {
        if (randomAlbumSong) {
            if (play === true) {
                if (!linkDemo) {
                    setFirstPlay(false)
                    setCurrentSong({
                        ...randomAlbumSong,
                        imgPic: randomAlbum?.albums?.items[0].images[0].url,
                    })
                    setCount(0)
                    // @ts-ignore
                    eventBus.emit('play-track', randomAlbumSong?.items[0].uri)
                    setLinkDemo(true)
                }
                else {
                    // @ts-ignore
                    eventBus.emit('play-track')
                }
                setIsPlaying(true)
            }
            else {
                // @ts-ignore
                eventBus.emit('play-stop')
                setIsPlaying(false)
            }
        }
        else {
            const token = localStorage.getItem('spotify_access_token')
            const searchLetters = 'abcdefghijklmnopqrstuvwxyz'
            const randomLetter = searchLetters[Math.floor(Math.random() * searchLetters.length)]
            const searchResponse = await fetch(
                `https://api.spotify.com/v1/search?q=${randomLetter}&type=album&limit=1`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            )
            const searchData = await searchResponse.json()
            setRandomAlbum(searchData)
            if (searchData?.albums?.items?.length > 0) {
                // 随机选择一个专辑
                const albumId = searchData.albums.items[0].id

                // 获取专辑的曲目
                const tracksResponse = await fetch(
                    `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=10`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    },
                )
                const tracksData = await tracksResponse.json()
                setRandomAlbumSong(tracksData)
            }
        }
    }
    useEffect(() => {
        getRandomAlbumFirstTrack()
    }, [])
    return (
        <div className="for-you-row">
            <Left></Left>
            <div
                className="fm"
                style={{
                    background: randomGradient,
                    position: 'relative',
                }}
            >
                <img src="undefined?param=512y512" loading="lazy" style={{ display: 'none' }} alt="" />
                <img
                    src={randomAlbum?.albums?.items[0].images[0].url}
                    loading="lazy"
                    className="cover"
                    alt=""
                />
                <div className="right-part">
                    <Info randomAlbum={randomAlbum}></Info>
                    <div className="controls" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                        <div className="buttons">
                            <ButtonIcon
                                classname="button-icon"
                                title="不喜欢"
                                sty={{ width: '40px', height: '40px' }}
                                onClick={nextSong}
                            >
                                <SvgIcon>
                                    {svgList.badLike}
                                </SvgIcon>
                            </ButtonIcon>
                            <ButtonIcon
                                classname="button-icon play"
                                title="播放"
                                sty={{ width: '40px', height: '40px' }}
                                onClick={() => {
                                    setIsPlayingTwo(!isPlayingTwo)
                                    if (!isPlayingTwo) {
                                        setBadLikeDemo(true)
                                        getRandomAlbumFirstTrack(true)
                                    }
                                    else {
                                        getRandomAlbumFirstTrack(false)
                                    }
                                }}
                            >
                                <SvgIcon sty={{ display: isPlayingTwo ? 'none' : '' }}>
                                    {svgList.bigButton}
                                </SvgIcon>
                                <SvgIcon sty={{ display: isPlayingTwo ? '' : 'none' }}>
                                    {svgList.bigButtonStop}
                                </SvgIcon>
                            </ButtonIcon>

                            <ButtonIcon
                                classname="button-icon "
                                title="下一首"
                                sty={{ width: '40px', height: '40px' }}
                                onClick={nextSong}
                            >
                                <SvgIcon>
                                    {svgList.next}
                                </SvgIcon>
                            </ButtonIcon>
                        </div>
                        <div className="card-name">
                            <SvgIcon>
                                {svgList.logo}
                            </SvgIcon>
                            私人FM
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
