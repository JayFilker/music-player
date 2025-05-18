import { useAtom } from 'jotai'
import { useState } from 'react'
import { BadLike, CountDemo, IsPlayingDemo, IsPlayingDemoTwo, Link, SongList } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import { ButtonIcon } from '../ButtonIcon'
import { SvgIcon } from '../SvgIcon'
import { svgList } from './svg.tsx'
import './index.less'

export function Foryou() {
    const [, setSong] = useAtom(SongList)
    const [, setCount] = useAtom(CountDemo)
    const [, setBadLikeDemo] = useAtom(BadLike)
    const [isPlaying, setIsPlaying] = useAtom(IsPlayingDemo)
    const [isPlayingTwo, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [, setLinkDemo] = useAtom(Link)
    const [countL, setCountL] = useState(0)

    function nextSong() {
        setLinkDemo(true)
        setIsPlayingTwo(true)
        setBadLikeDemo(true)
        setSong(svgList.musicOne)
        if (countL < svgList.musicOne.length - 1) {
            setCountL(countL + 1)
            setCount(countL + 1)
        }
        else {
            setCount(countL)
        }

        setTimeout(() => {
            if (!isPlaying) {
                eventBus.emit('play-song', { id: 0 })
            }
        }, 0)
    }

    return (
        <div className="for-you-row">
            <div className="daily-recommend-card">
                <img
                    id="left-img"
                    src="https://p1.music.126.net/AhYP9TET8l-VSGOpWAKZXw==/109951165134386387.jpg?param=1024y1024"
                    loading="lazy"
                    alt=""
                />
                <div className="container">
                    <div className="title-box">
                        <div className="title">
                            <span>每</span>
                            <span>日</span>
                            <span>推</span>
                            <span>荐</span>
                        </div>
                    </div>
                </div>
                <button
                    className="play-button"
                    onClick={() => {
                        setLinkDemo(false)
                        setBadLikeDemo(false)
                        setIsPlayingTwo(false)
                        setSong(svgList.musicOne)
                        setCount(0)
                        setTimeout(() => {
                            if (!isPlaying) {
                                eventBus.emit('play-song', { id: 0 })
                            }
                        }, 0)
                    }}
                >
                    <SvgIcon>
                        {svgList.button}
                    </SvgIcon>
                </button>
            </div>
            <div
                className="fm"
                style={{
                    background: 'linear-gradient(to left top, rgb(115, 115, 115), rgb(163, 163, 163))',
                    position: 'relative',
                }}
            >
                <img src="undefined?param=512y512" loading="lazy" style={{ display: 'none' }} alt="" />
                <img
                    src="https://p1.music.126.net/F4I1dPH33hM8M6w1G3MWEw==/109951170887525466.jpg?param=512y512"
                    loading="lazy"
                    className="cover"
                    alt=""
                />
                <div className="right-part">
                    <div className="info">
                        <div className="title">你的温柔</div>
                        <div className="artist">
                            <span
                                className="artist-in-line"
                            >
                                <span>
                                    <a
                                        href="#/artist/12448205"
                                        id="info-span"
                                    >
                                        永彬Ryan.B
                                    </a>
                                </span>
                            </span>
                        </div>
                    </div>
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
                                    setLinkDemo(true)
                                    setIsPlayingTwo(!isPlayingTwo)
                                    if (!isPlayingTwo) {
                                        setBadLikeDemo(true)
                                        setSong(svgList.musicOne)
                                        setCount(countL)
                                        setTimeout(() => {
                                            if (!isPlaying) {
                                                eventBus.emit('play-song', { id: 0 })
                                            }
                                        }, 0)
                                    }
                                    else {
                                        eventBus.emit('play-song', { id: 0 })
                                        setTimeout(() => {
                                            setIsPlaying(false)
                                        }, 0)
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
