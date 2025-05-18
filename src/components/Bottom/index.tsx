import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { countDemo, isPlayingDemo, isPlayingDemoTwo, link, songList } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import { CustomSlider } from '../Bar'
import { ButtonIcon } from '../ButtonIcon'

import { SvgIcon } from '../SvgIcon'
import { VolumeSlider } from '../Volume'
import '../../assets/css/slider.css'
import './index.less'

interface Song {
    title: string
    artist: string[]
    imgPic: string
    song: string
    from: string
}

export function Player() {
    const [song] = useAtom<Array<Song>>(songList)
    const [musicList, setMusicList] = useState([true, true, true, true])
    const [count, setCount] = useAtom(countDemo)
    const [linkDemo] = useAtom(link)
    const [, setIsPlayingTwo] = useAtom(isPlayingDemoTwo)
    const [player, setPlayer] = useState({
        progress: 0,
        currentTrackDuration: 100,
    })
    // const [progress, setProgress] = useState(0);
    // const [duration, setDuration] = useState(0);

    const [volume, setVolume] = useState(0.7) // 默认音量0.5
    const [temporaryVolume, setTemporaryVolume] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useAtom(isPlayingDemo)
    const loadSong = (index: number, songList: Song[]) => {
        if (audioRef.current && songList[index]) {
            audioRef.current.src = songList[index].song
            audioRef.current.load()
        }
    }

    // 初始设置音量以及更新音量
    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current
            audio.volume = volume

            const updateProgress = () => {
                if (audio.duration) {
                    setPlayer({
                        progress: audio.currentTime,
                        currentTrackDuration: audio.duration,
                    })
                }
            }
            // 添加事件监听
            audio.addEventListener('timeupdate', updateProgress)
            // audio.addEventListener('ended', handleEnded);

            // 清理函数
            return () => {
                audio.removeEventListener('timeupdate', updateProgress)
                // audio.removeEventListener('ended', handleEnded);
            }
        }
    }, [audioRef.current, count])
    // 播放列表和歌曲索引变化
    useEffect(() => {
        if (count >= song.length) {
            setCount(Math.max(0, song.length - 1))
            return
        }

        if (song.length === 0) {
            setIsPlaying(false)
            return
        }

        loadSong(count, song)

        // 如果当前状态是播放中，则自动播放新加载的歌曲
        if (isPlaying && audioRef.current) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true)
                })
                .catch((error) => {
                    console.error('自动播放新歌曲出错:', error)
                    setIsPlaying(false)
                })
        }
    }, [count, song])
    // 播放功能
    const playSong = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            }
            else {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true)
                    })
                    .catch((error) => {
                        console.error('播放出错:', error)
                        setIsPlaying(false)
                    })
            }
        }
    }
    eventBus.on('play-song', playSong)
    const formatTrackTime = (value: number) => {
        // 实现你的格式化时间函数
        return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`
    }

    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current

            // 音频播放结束事件处理函数
            const handleEnded = () => {
                setIsPlaying(false)

                // 根据当前的播放模式决定下一步操作
                if (!musicList[1]) {
                    // 单曲循环模式
                    audio.currentTime = 0
                    audio.play()
                        .then(() => setIsPlaying(true))
                        .catch(err => console.error('重新播放失败:', err))
                }
                else if (!musicList[2]) {
                    // 随机播放模式
                    const randomIndex = Math.floor(Math.random() * song.length)

                    if (randomIndex !== count) {
                        setIsPlaying(true)
                        setCount(randomIndex)
                    }
                    else {
                        audio.currentTime = 0
                        audio.play()
                            .then(() => setIsPlaying(true))
                            .catch(err => console.error('重新播放失败:', err))
                    }
                }
                else {
                    // 顺序播放模式
                    if (count < song.length - 1) {
                        // 注意：
                        setIsPlaying(true)
                        setCount(count + 1)
                    }
                    else {
                        // 播放列表结束，可以选择停止或循环到第一首
                        setIsPlaying(true)
                        setCount(0) // 循环到第一首
                    }
                }
            }

            // 添加ended事件监听器
            audio.addEventListener('ended', handleEnded)

            // 清理函数
            return () => {
                audio.removeEventListener('ended', handleEnded)
            }
        }
    }, [audioRef.current, count, musicList, song])

    return (
        <div className="player">
            <audio ref={audioRef} />
            <div
                className="progress-bar"
            >

                <CustomSlider
                    player={player}
                    setPlayer={setPlayer}
                    formatTrackTime={formatTrackTime}
                    audioRef={audioRef.current}
                />
            </div>
            <div className="controls">
                <div className="playing">
                    <div className="container">
                        <img loading="lazy" alt="" src={song[count].imgPic} />
                        <div className="track-info">
                            <div
                                className="name"
                            >
                                {song[count].title}
                            </div>
                            <div className="artist">

                                {
                                    song[count].artist.map((item: string, index: number) => {
                                        return (
                                            <span key={index}>
                                                <span className="ar">
                                                    {' '}
                                                    {item}
                                                    {' '}
                                                </span>
                                                {index !== song[count].artist.length - 1 && <span>, </span>}
                                            </span>
                                        )
                                    })

                                }
                            </div>
                        </div>
                        <div className="like-button">
                            <ButtonIcon title="喜欢">
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" id="icon-heart">
                                        <path
                                            d="M 9.5449219 3 C 5.3895807 3 2 6.3895806 2 10.544922 C 2 14.283156 4.9005496 18.084723 7.6601562 21.119141 C 10.419763 24.153558 13.171875 26.369141 13.171875 26.369141 A 1.0001 1.0001 0 0 0 13.197266 26.388672 C 13.517448 26.630481 13.956962 26.684854 14.369141 26.785156 A 1.0001 1.0001 0 0 0 15 27 A 1.0001 1.0001 0 0 0 15.630859 26.785156 C 16.043038 26.684854 16.482552 26.630481 16.802734 26.388672 A 1.0001 1.0001 0 0 0 16.828125 26.369141 C 16.828125 26.369141 19.580237 24.153558 22.339844 21.119141 C 25.099451 18.084722 28 14.283156 28 10.544922 C 28 6.3895806 24.610419 3 20.455078 3 C 17.450232 3 15.833405 4.5910542 15 5.5664062 C 14.166595 4.5910543 12.549768 3 9.5449219 3 z M 9.5449219 5 C 12.372924 5 14.069642 7.4290597 14.126953 7.5117188 A 1.0001 1.0001 0 0 0 14.910156 8.0078125 A 1.0001 1.0001 0 0 0 15.003906 8.0117188 A 1.0001 1.0001 0 0 0 15.019531 8.0117188 A 1.0001 1.0001 0 0 0 15.042969 8.0097656 A 1.0001 1.0001 0 0 0 15.119141 8.0039062 A 1.0001 1.0001 0 0 0 15.871094 7.5136719 C 15.925786 7.4347249 17.624838 5 20.455078 5 C 23.529737 5 26 7.4702629 26 10.544922 C 26 13.147688 23.499768 16.870104 20.859375 19.773438 C 18.227966 22.666891 15.607768 24.780451 15.589844 24.794922 C 15.414236 24.925626 15.219097 25 15 25 C 14.780903 25 14.585764 24.925626 14.410156 24.794922 C 14.392232 24.780451 11.772034 22.66689 9.140625 19.773438 C 6.5002316 16.870105 4 13.147688 4 10.544922 C 4 7.4702629 6.470263 5 9.5449219 5 z"
                                            fill="currentColor"
                                        >
                                        </path>
                                    </svg>
                                </SvgIcon>
                            </ButtonIcon>
                        </div>
                    </div>

                    <div className="blank"></div>
                </div>
                <div className="middle-control-buttons">
                    <div className="blank"></div>
                    <div className="container">
                        <ButtonIcon
                            title="不喜欢"
                            sty={{ display: 'none' }}
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
                            title="上一首"
                            onClick={() => {
                                if (count !== 0) {
                                    setCount(count - 1)
                                    setTimeout(() => {
                                        if (!isPlaying) {
                                            playSong()
                                        }
                                    }, 0)
                                }
                            }}
                        >
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="svg-inline--fa fa-step-backward fa-w-14"
                                    role="img"
                                    viewBox="0 0 448 512"
                                    id="icon-previous"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z"
                                    >
                                    </path>
                                </svg>
                            </SvgIcon>
                        </ButtonIcon>
                        <ButtonIcon
                            classname="play"
                            sty={{ display: isPlaying ? 'none' : '' }}
                            title="播放"
                            onClick={() => {
                                if (linkDemo) {
                                    setIsPlayingTwo(true)
                                }
                                playSong()
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
                        </ButtonIcon>
                        <ButtonIcon
                            classname="play"
                            sty={{ display: isPlaying ? '' : 'none' }}
                            title="暂停"
                            onClick={() => {
                                playSong()
                                if (linkDemo) {
                                    setIsPlayingTwo(false)
                                }
                            }}
                        >
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="svg-inline--fa fa-pause fa-w-14"
                                    role="img"
                                    viewBox="0 0 448 512"
                                    id="icon-pause"
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
                            title="下一首"
                            onClick={() => {
                                if (count !== song.length - 1) {
                                    setCount(count + 1)
                                    setTimeout(() => {
                                        if (!isPlaying) {
                                            playSong()
                                        }
                                    }, 0)
                                }
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
                    <div className="blank"></div>
                </div>
                <div className="right-control-buttons">
                    <div className="blank"></div>
                    <div className="container">
                        <ButtonIcon
                            title="播放列表"
                        >
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="img"
                                    viewBox="0 0 512 512"
                                    className="svg-inline--fa fa-list-music fa-w-16 fa-9x"
                                    id="icon-list"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M16 256h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0-128h256a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16H16A16 16 0 0 0 0 80v32a16 16 0 0 0 16 16zm128 192H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM470.94 1.33l-96.53 28.51A32 32 0 0 0 352 60.34V360a148.76 148.76 0 0 0-48-8c-61.86 0-112 35.82-112 80s50.14 80 112 80 112-35.82 112-80V148.15l73-21.39a32 32 0 0 0 23-30.71V32a32 32 0 0 0-41.06-30.67z"
                                        className=""
                                    >
                                    </path>
                                </svg>
                            </SvgIcon>
                        </ButtonIcon>
                        <ButtonIcon
                            title="循环播放"
                            sty={{ color: musicList[1] ? 'white' : '#335eea' }}
                            onClick={() => {
                                setMusicList(musicList.map((item, index) => index === 1 ? !item : item))
                            }}
                        >
                            <SvgIcon>
                                <svg className="dn color-inherit link hover-pink" id="icon-repeat">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="repeat"
                                        role="img"
                                        viewBox="0 0 512 512"
                                        className="svg-inline--fa fa-repeat fa-w-16 fa-1x"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M512 256c0 88.224-71.775 160-160 160H170.067l34.512 32.419c9.875 9.276 10.119 24.883.539 34.464l-10.775 10.775c-9.373 9.372-24.568 9.372-33.941 0l-92.686-92.686c-9.373-9.373-9.373-24.568 0-33.941l92.686-92.686c9.373-9.373 24.568-9.373 33.941 0l10.775 10.775c9.581 9.581 9.337 25.187-.539 34.464L170.067 352H352c52.935 0 96-43.065 96-96 0-13.958-2.996-27.228-8.376-39.204-4.061-9.039-2.284-19.626 4.723-26.633l12.183-12.183c11.499-11.499 30.965-8.526 38.312 5.982C505.814 205.624 512 230.103 512 256zM72.376 295.204C66.996 283.228 64 269.958 64 256c0-52.935 43.065-96 96-96h181.933l-34.512 32.419c-9.875 9.276-10.119 24.883-.539 34.464l10.775 10.775c9.373 9.372 24.568 9.372 33.941 0l92.686-92.686c9.373-9.373 9.373-24.568 0-33.941l-92.686-92.686c-9.373-9.373-24.568-9.373-33.941 0L306.882 29.12c-9.581 9.581-9.337 25.187.539 34.464L341.933 96H160C71.775 96 0 167.776 0 256c0 25.897 6.186 50.376 17.157 72.039 7.347 14.508 26.813 17.481 38.312 5.982l12.183-12.183c7.008-7.008 8.786-17.595 4.724-26.634z"
                                            className=""
                                        >
                                        </path>
                                    </svg>
                                </svg>
                            </SvgIcon>
                        </ButtonIcon>
                        <ButtonIcon
                            title="随机播放"
                            sty={{ color: musicList[2] ? 'white' : '#335eea' }}
                            onClick={() => {
                                setMusicList(musicList.map((item, index) => index === 2 ? !item : item))
                            }}
                        >
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="svg-inline--fa fa-random fa-w-16"
                                    role="img"
                                    viewBox="0 0 512 512"
                                    id="icon-shuffle"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596 53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 176h84l52.781 56.551 53.333-57.143-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z"
                                    >
                                    </path>
                                </svg>
                            </SvgIcon>
                        </ButtonIcon>
                        <div className="volume-control">
                            <ButtonIcon
                                title="静音"
                                sty={{ display: volume === 0 ? '' : 'none' }}
                                onClick={() => {
                                    if (audioRef.current) {
                                        setVolume(temporaryVolume)
                                        audioRef.current.volume = temporaryVolume
                                    }
                                }}

                            >
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg-inline--fa fa-volume-mute fa-w-16"
                                        role="img"
                                        viewBox="0 0 512 512"
                                        id="icon-volume-mute"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"
                                        >
                                        </path>
                                    </svg>
                                </SvgIcon>
                            </ButtonIcon>
                            {' '}
                            <ButtonIcon
                                title="静音"
                                sty={{ display: (volume <= 0.5 && volume !== 0) ? '' : 'none' }}
                                onClick={() => {
                                    if (audioRef.current) {
                                        setTemporaryVolume(volume)
                                        audioRef.current.volume = 0
                                    }

                                    setVolume(0)
                                }}
                            >
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg-inline--fa fa-volume-down fa-w-12"
                                        role="img"
                                        viewBox="0 0 384 512"
                                        id="icon-volume-half"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M215.03 72.04L126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z"
                                        >
                                        </path>
                                    </svg>
                                </SvgIcon>
                            </ButtonIcon>
                            {' '}
                            <ButtonIcon
                                title="静音"
                                sty={{ display: volume > 0.5 ? '' : 'none' }}
                                onClick={() => {
                                    if (audioRef.current) {
                                        setTemporaryVolume(volume)
                                        audioRef.current.volume = 0
                                    }

                                    setVolume(0)
                                }}
                            >
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        role="img"
                                        viewBox="0 0 480 512"
                                        className="svg-inline--fa fa-volume fa-w-15 fa-2x"
                                        id="icon-volume"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.53 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                            className=""
                                        >
                                        </path>
                                    </svg>
                                </SvgIcon>
                            </ButtonIcon>
                            <div
                                className="volume-bar"
                                // onMouseDown={handleVolumeChange}
                            >
                                <VolumeSlider
                                    volume={volume}
                                    setVolume={setVolume}
                                    min={0}
                                    max={1}
                                    interval={0.01}
                                    audioRef={audioRef.current}
                                />
                            </div>
                        </div>

                        <ButtonIcon
                            sty={{ marginLeft: '12px' }}
                            title="歌词"
                        >
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 32 32"
                                    id="icon-arrow-up"
                                >
                                    <path
                                        d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
                                        fill="currentColor"
                                    >
                                    </path>
                                </svg>
                            </SvgIcon>
                        </ButtonIcon>
                    </div>
                </div>
            </div>

        </div>
    )
}
