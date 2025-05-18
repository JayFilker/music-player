import { useAtom } from 'jotai'
import { useState } from 'react'
import { badLike, countDemo, isPlayingDemo, isPlayingDemoTwo, link, songList } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import { ButtonIcon } from '../ButtonIcon'
import { SvgIcon } from '../SvgIcon/index.tsx'
import './index.less'

export function Foryou() {
    const [, setSong] = useAtom(songList)
    const [, setCount] = useAtom(countDemo)
    const [, setBadLikeDemo] = useAtom(badLike)
    const [isPlaying, setIsPlaying] = useAtom(isPlayingDemo)
    const [isPlayingTwo, setIsPlayingTwo] = useAtom(isPlayingDemoTwo)
    const [, setLinkDemo] = useAtom(link)
    const [countL, setCountL] = useState(0)
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
                            <span>
                                日
                            </span>
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
                        setSong([{
                            title: 'Song 3',
                            artist: ['Artist 1', 'ddd'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song4.mp3',
                            from: 'The Band CAMINO',
                        }, {
                            title: 'Song 4',
                            artist: ['Artist 1', 'fff'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song5.mp3',
                            from: 'The Band CAMINO',
                        }])
                        setCount(0)
                        setTimeout(() => {
                            if (!isPlaying) {
                                eventBus.emit('play-song', { id: 0 })
                            }
                        }, 0)
                    }}
                >
                    <SvgIcon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="svg-inline--fa fa-play fa-w-14"
                            role="img"
                            viewBox="0 0 448 512"
                            id="icon-play"
                        >
                            <path
                                fill="currentColor"
                                d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                            >
                            </path>
                        </svg>
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
                                {' '}
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
                                onClick={() => {
                                    setLinkDemo(true)
                                    setIsPlayingTwo(true)
                                    setBadLikeDemo(true)
                                    setSong([{
                                        title: 'Song 3',
                                        artist: ['Artist 1', 'ddd'],
                                        imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                                        song: '/music/song4.mp3',
                                        from: 'The Band CAMINO',
                                    }, {
                                        title: 'Song 4',
                                        artist: ['Artist 1', 'fff'],
                                        imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                                        song: '/music/song5.mp3',
                                        from: 'The Band CAMINO',
                                    }])
                                    setCountL(countL + 1)
                                    setCount(countL + 1)
                                    setTimeout(() => {
                                        if (!isPlaying) {
                                            eventBus.emit('play-song', { id: 0 })
                                        }
                                    }, 0)
                                }}
                            >
                                <SvgIcon>
                                    {' '}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg-inline--fa fa-thumbs-down fa-w-16"
                                        role="img"
                                        viewBox="0 0 512 512"
                                        id="icon-thumbs-down"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"
                                        >
                                        </path>
                                    </svg>
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
                                        setSong([{
                                            title: 'Song 3',
                                            artist: ['Artist 1', 'ddd'],
                                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                                            song: '/music/song4.mp3',
                                            from: 'The Band CAMINO',
                                        }, {
                                            title: 'Song 4',
                                            artist: ['Artist 1', 'fff'],
                                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                                            song: '/music/song5.mp3',
                                            from: 'The Band CAMINO',
                                        }])
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
                                <SvgIcon>
                                    {' '}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg-inline--fa fa-play fa-w-14"
                                        role="img"
                                        viewBox="0 0 448 512"
                                        id="icon-play"
                                        style={{ display: isPlayingTwo ? 'none' : '' }}
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                                        >
                                        </path>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg-inline--fa fa-pause fa-w-14"
                                        role="img"
                                        viewBox="0 0 448 512"
                                        id="icon-pause"
                                        style={{ display: isPlayingTwo ? '' : 'none' }}
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
                                        >
                                        </path>
                                    </svg>
                                </SvgIcon>
                            </ButtonIcon>

                            <ButtonIcon
                                classname="button-icon "
                                title="下一首"
                                sty={{ width: '40px', height: '40px' }}
                                onClick={() => {
                                    setLinkDemo(true)
                                    setIsPlayingTwo(true)
                                    setBadLikeDemo(true)
                                    setSong([{
                                        title: 'Song 3',
                                        artist: ['Artist 1', 'ddd'],
                                        imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                                        song: '/music/song4.mp3',
                                        from: 'The Band CAMINO',
                                    }, {
                                        title: 'Song 4',
                                        artist: ['Artist 1', 'fff'],
                                        imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                                        song: '/music/song5.mp3',
                                        from: 'The Band CAMINO',
                                    }])
                                    setCountL(countL + 1)
                                    setCount(countL + 1)
                                    setTimeout(() => {
                                        if (!isPlaying) {
                                            eventBus.emit('play-song', { id: 0 })
                                        }
                                    }, 0)
                                }}
                            >
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg-inline--fa fa-step-forward fa-w-14"
                                        role="img"
                                        viewBox="0 0 448 512"
                                        id="icon-next"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"
                                        >
                                        </path>
                                    </svg>
                                </SvgIcon>
                            </ButtonIcon>
                        </div>
                        <div className="card-name">
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="img"
                                    viewBox="0 0 512 512"
                                    className="svg-inline--fa fa-radio-alt fa-w-16 fa-7x"
                                    id="icon-fm"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M209 368h-64a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm144 56a72 72 0 1 0-72-72 72.09 72.09 0 0 0 72 72zm96-296H212.5l288.83-81.21a16 16 0 0 0 11.07-19.74l-4.33-15.38A16 16 0 0 0 488.33.6L47.68 124.5A64 64 0 0 0 1 186.11V448a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64zm16 320a16 16 0 0 1-16 16H65a16 16 0 0 1-16-16V256h416zM113 336h128a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16H113a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16z"
                                        className=""
                                    >
                                    </path>
                                </svg>
                            </SvgIcon>
                            私人FM
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
